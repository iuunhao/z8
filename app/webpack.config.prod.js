var webpack = require("webpack");
const fs = require('fs');
const path = require('path');
const cwd = path.join(process.cwd());

const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js

const webpackOptions = {
    entry: {},
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'src/js'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, '/src/srcjs')
            ],
            exclude: [
                path.resolve(__dirname, '../node_modules')
            ],
            loader: 'babel-loader?presets[]=es2015'
        }]
    },
    resolve: {
        modules: [
            path.join(__dirname, "/src/srcjs"),
            "node_modules"
        ],
        extensions: ['.json', '.js'],
        alias: {
            // 'axios': path.join(__dirname, './lib/axios/0.16.1/axios.min.js'),
            // 'promise': path.join(__dirname, './lib/ES6-Promise/promise.js')
        }
    },
    // devtool: 'source-map',
    plugins: [
        new UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     filename: "common/common.js",
        //     // (给 chunk 一个不同的名字)
        //     minChunks: Infinity,
        //     // 随着 入口chunk 越来越多，这个配置保证没其它的模块会打包进 公共chunk
        // })
        // new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js' )
    ]
};

{
    // 工具函数
    const dev = path.join(cwd, '/src/srcjs');
    const findfiles = function(ipath, deep = false, json = {}) {
        fs.readdirSync(ipath).forEach(function(sPath) {
            if (/^(_|webpack|grunt|gulp|package)/.test(sPath)) return;
            var fileName = path.join(ipath, sPath);
            if (fs.lstatSync(fileName).isDirectory() && sPath != '') {
                if (deep && sPath !== 'node_modules') findfiles(fileName, deep, json);
            } else {
                var name = path.relative(dev, fileName).replace(/\.\w+$/, ''),
                    key = path.extname(fileName).replace(/^\./, '');

                json[key] = json[key] || {};
                json[key][name] = fileName;
            }
        })
        return json;
    };
    const files = findfiles(dev, true);
    files.type = function(str) {
        if (Object.prototype.toString.call(str) !== '[object String]') return false;
        return this[str] || {};
    }

    webpackOptions.entry = files.type('js'); // 配制js入口
    // webpackOptions.entry['vendor'] = ['jquery'];
}

module.exports = webpackOptions;
