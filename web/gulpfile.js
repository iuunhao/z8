var USER_CONFIG = {
    MOD: "MOBILE_CSS",
    DESIGN_SIZE: 1400
};

var gulp = require("gulp");
var path = require("path");

// postcss
var gulpPostcss = require("gulp-postcss");
var postcss = require("postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var precss = require("precss");
var sprites = require("postcss-sprites");
var updateRule = require("postcss-sprites").updateRule;
var spritesmith = require("gulp.spritesmith");
var postcssSorting = require("postcss-sorting");
var sugarss = require('sugarss');


// 服务
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var clean = require("postcss-clean");
var cleanf = require("gulp-clean");
var zip = require("gulp-zip");

//  图片压缩
var imageminJpegRecompress = require("imagemin-jpeg-recompress");
var imageminOptipng = require("imagemin-optipng");
var imagemin = require("gulp-imagemin");

//pug
var pug = require("gulp-pug");

// js打包编译
var webpack = require("webpack");
var devWebpackConfig = require("./webpack.config.dev.js");
var prodWebpackConfig = require("./webpack.config.prod.js");
var gutil = require("gutil");

// 基本路径
var PATHS = {
    CSS: "./src/css",
    IMAGES: "./src/images",
    POSTCSS: "./src/postcss",
    HTML: "./src/views",
    PUG: "./src/pug",
    DIST: "./dist",
    SRC: "./src",
    SRCJS: "./src/srcjs",
    JS: "./src/js",
    DIST_ZIP: "./zip/dist_zip",
    SRC_ZIP: "./zip/src_zip",
    LIBS: "./src/libs"
};

var postcssFunc = {
    calculatesn: function(css) {
        css.walkDecls(function(decl, i) {
            decl.value = decl.value.replace(/(\d*\.?\d+)pm/ig, function(str) {
                return parseFloat(str) / 2 + "px";
            });
            decl.value = decl.value.replace(/(\d*\.?\d+)rm/ig, function(str) {
                return parseFloat(str) / (USER_CONFIG.DESIGN_SIZE / 10) + "rem";
            });
        });
    },
    opacity: function(css, opts) {
        css.walkDecls(function(decl) {
            if (decl.prop === "opacity") {
                decl.parent.insertAfter(decl, {
                    prop: "-ms-filter",
                    value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' +
                        parseFloat(decl.value) * 100 +
                        ')"'
                });
            }
        });
    },
    postcssMedia: function(css) {
        css.walkDecls(function(decl, i) {
            if (decl.parent.params != "undefined") {
                var mv = decl.parent.params;
                var mtv = {
                    iphone4: "screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)",
                    iphone45: "screen and (device-width: 320px) and (-webkit-device-pixel-ratio: 2)",
                    iphone5: "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
                    iphone6: "only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait)",
                    iphone6p: "only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: portrait)",
                    landscape: "screen and (orientation: landscape)",
                    shuping: "all and (orientation : portrait)"
                };
                switch (mv) {
                    case "(iphone4)":
                        return (decl.parent.params = mtv.iphone4);
                        break;
                    case "(iphone5)":
                        return (decl.parent.params = mtv.iphone5);
                        break;
                    case "(iphone45)":
                        return (decl.parent.params = mtv.iphone45);
                        break;
                    case "(iphone6)":
                        return (decl.parent.params = mtv.iphone6);
                        break;
                    case "(iphone6p)":
                        return (decl.parent.params = mtv.iphone6p);
                        break;
                    case "(landscape)":
                        return (decl.parent.params = mtv.landscape);
                        break;
                    case "(shuping)":
                        return (decl.parent.params = mtv.shuping);
                        break;
                    case "default":
                        break;
                }
            }
        });
    }
};

// 移动端
gulp.task("MOBILE_CSS", function() {
    var plugins = [
        precss,
        sprites({
            stylesheetPath: PATHS.CSS,
            spritePath: PATHS.IMAGES,
            spritesmith: {
                padding: 5
            },
            hooks: {
                onUpdateRule: function(rule, token, image) {
                    var backgroundSizeX =
                        image.spriteWidth / image.coords.width * 100;
                    var backgroundSizeY =
                        image.spriteHeight / image.coords.height * 100;
                    var backgroundPositionX =
                        image.coords.x /
                        (image.spriteWidth - image.coords.width) *
                        100;
                    var backgroundPositionY =
                        image.coords.y /
                        (image.spriteHeight - image.coords.height) *
                        100;

                    backgroundSizeX = isNaN(backgroundSizeX)
                        ? 0
                        : backgroundSizeX;
                    backgroundSizeY = isNaN(backgroundSizeY)
                        ? 0
                        : backgroundSizeY;
                    backgroundPositionX = isNaN(backgroundPositionX)
                        ? 0
                        : backgroundPositionX;
                    backgroundPositionY = isNaN(backgroundPositionY)
                        ? 0
                        : backgroundPositionY;

                    var backgroundImage = postcss.decl({
                        prop: "background-image",
                        value: "url(" + image.spriteUrl + ")"
                    });

                    var backgroundSize = postcss.decl({
                        prop: "background-size",
                        value: backgroundSizeX + "% " + backgroundSizeY + "%"
                    });

                    var backgroundPosition = postcss.decl({
                        prop: "background-position",
                        value: backgroundPositionX +
                            "% " +
                            backgroundPositionY +
                            "%"
                    });
                    rule.insertAfter(token, backgroundImage);
                    rule.insertAfter(backgroundImage, backgroundPosition);
                    rule.insertAfter(backgroundPosition, backgroundSize);
                }
            },
            groupBy: function(image) {
                var reg = /((icon)-?([\w]*))/;
                if (reg.test(image.url) === -1) {
                    return Promise.reject();
                }
                var a = reg.exec(image.url);
                var c = image.url.split("/" || "\\");
                patm = c[c.length - 3];
                return Promise.resolve(c[c.length - 2]);
            },
            filterBy: function(image) {
                if (!/((icon)-?([\w]*))/.test(image.url))
                    return Promise.reject();
                return Promise.resolve();
            }
        }),
        autoprefixer({
            browsers: ["last 10 versions"]
        }),
        cssnano({
            zindex: false,
            autoprefixer: false,
            core: true,
            reduceIdents: false,
            svgo: false
        }),
        postcssSorting({
            "sort-order": "yandex"
        }),
        postcssFunc.calculatesn,
        postcssFunc.postcssMedia,
        clean
    ];
    return gulp
        .src([path.join(PATHS.POSTCSS, "/**/*.css")])
        .pipe(
            plumber({
                errorHandler: notify.onError("错误信息: <%= error.message %>")
            })
        )
        .pipe(gulpPostcss(plugins, { parser: sugarss }))
        .pipe(gulp.dest(PATHS.CSS))
        .pipe(reload({ stream: true }));
});

// 监听
gulp.task("TASK_WATCH", function() {
    gulp
        .watch([path.join(PATHS.PUG + "/**/*.pug")], ["TASK_PUG"])
    gulp
        .watch([path.join(PATHS.HTML + "/**/*.html")])
        .on("change", reload);
    gulp
        .watch([path.join(PATHS.SRCJS + "/**/*.js")], ["DEV_WEBPACK"])
        .on("change", reload);
    gulp
        .watch([path.join(PATHS.POSTCSS + "/**/*.css")], [USER_CONFIG.MOD])
        .on("change", reload);
    gulp
        .watch([path.join(PATHS.CSS + "/**/*.css")])
        .on("change", function(){
            gulp.start(["TASK_CLEAN_CSS"]);
        });
});

//pug编译
gulp.task("TASK_PUG", function buildHTML() {
    return gulp
        .src(path.join(PATHS.PUG, "/**/*.pug"))
        .pipe(
            plumber({
                errorHandler: notify.onError("错误信息: <%= error.message %>")
            })
        )
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(PATHS.HTML))
});

// 开发js
gulp.task("DEV_WEBPACK", function(callback) {
    var myConfig = Object.create(devWebpackConfig);
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({}));
        callback();
    });
});

// 生产js
gulp.task("PROD_WEBPACK", function(callback) {
    var myConfig = Object.create(prodWebpackConfig);
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({}));
        callback();
    });
});

// 监听文件
gulp.task("TASK_SERVER", function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: [PATHS.SRC],
            directory: true
        },
        open: "external"
    });
    gulp.start("TASK_WATCH");
});

//压缩图片
gulp.task("TASK_IMG_MIN", function() {
    var jpgmin = imageminJpegRecompress({
        accurate: true,
        quality: "high",
        method: "smallfry",
        min: 70,
        loops: 2,
        progressive: false,
        subsample: "default"
    }),
        pngmin = imageminOptipng({
            optimizationLevel: 4
        });
    gulp
        .src([
            path.join(PATHS.IMAGES, "/**/*.*")
        ])
        .pipe(
            imagemin({
                use: [jpgmin, pngmin]
            })
        )
        .pipe(gulp.dest(path.join(PATHS.DIST, "/images")));
});


// 打包清理目录
gulp.task("TASK_CLEAN", function() {
    return gulp
        .src([PATHS.DIST])
        .pipe(cleanf({ force: true }))
});

// 拷贝libs
gulp.task("TASK_COPY_LIBS", function() {
    return gulp
        .src([path.join(PATHS.LIBS, '/**/*.js')])
        .pipe(gulp.dest(PATHS.JS))
});


// 打包清理目录
gulp.task("TASK_CLEAN_CSS", function() {
    return gulp
        .src(path.join(PATHS.CSS, '/**/_*.css'))
        .pipe(cleanf({ force: true }))
});

//将相关项目文件复制到dist 文件夹下
gulp.task("TASK_COPY", function() {
    gulp
        .src(path.join(PATHS.HTML, "/**/*.html"))
        .pipe(gulp.dest(path.join(PATHS.DIST, "views")));
    gulp
        .src(path.join(PATHS.CSS, "/**/*.css"))
        .pipe(gulp.dest(path.join(PATHS.DIST, "css")));
    gulp
        .src(path.join(PATHS.IMAGES, "/**/*.*"))
        .pipe(gulp.dest(path.join(PATHS.DIST, "images")));
    gulp
        .src([path.join(PATHS.JS, "/**/*.js")])
        .pipe(gulp.dest(path.join(PATHS.DIST, "js")));
});

var util = {
    tiem: function(str) {
        function checkTime(i) {
            i = i < 10 ? "0" + i : i;
            return i;
        }
        var d = new Date(),
            year = d.getFullYear(),
            month = checkTime(d.getMonth() + 1),
            day = checkTime(d.getDate()),
            hour = checkTime(d.getHours()),
            minute = checkTime(d.getMinutes()),
            str = str || "";
        return (
            str +
            year +
            "_" +
            month +
            "_" +
            day +
            "_" +
            hour +
            "_" +
            minute +
            ".zip"
        );
    }
};

//打包文件
gulp.task("dist_zip", function() {
    return gulp
        .src([path.join(PATHS.DIST, "/**/*.*")])
        .pipe(zip(util.tiem("dist_")))
        .pipe(gulp.dest(PATHS.DIST_ZIP));
});

gulp.task("src_zip", function() {
    return gulp
        .src([path.join(PATHS.SRC, "/**/*.*")])
        .pipe(zip(util.tiem("src_")))
        .pipe(gulp.dest(PATHS.SRC_ZIP));
});

// 默认
gulp.task("default", [USER_CONFIG.MOD, "TASK_PUG", "DEV_WEBPACK", "TASK_COPY_LIBS"], function() {
     gulp.start(["TASK_SERVER", "TASK_CLEAN_CSS"]);
});

// 编译
gulp.task(
    "build",
    ["TASK_CLEAN", USER_CONFIG.MOD, "TASK_IMG_MIN", "TASK_PUG", "PROD_WEBPACK"],
    function() {
        gulp.start("PROD_WEBPACK", "TASK_COPY");
    }
);
