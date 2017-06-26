```bash
cd z8/web
cnpm install
gulp
```

```baseh
//默认
gulp	

//打包
gulp build		

//打包dist
gulp dist_zip	

//打包src
gulp src_zip		
```

* pug	->	HTML
* postcss	->	CSS
* js	->	jquery1.8.3
* js为webpack编译
* pug|postcss|img为gulp编译
* postcss内置语法规则为`stylus`语法规则

src目录下源文件存放分别为 `pug` `postcss` `srcjs` `images`
