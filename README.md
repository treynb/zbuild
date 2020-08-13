## 简介

快速构建React Typescript 项目

## 安装

```
npm install @treynb/zbuild -D
```

## 开发

- 默认 entry 为 src/index.tsx，可以通过自定义配置覆盖
- 需要在项目根目录下添加 tsconfig.json，可以通过 tsc --init 生成，注意把 noEmit 设置为 true
- 配置 package.json scripts

```
"scripts": {
  "dev": "zbuild dev",
  "prod": "zbuild prod"
}
```

安装依赖并启动服务

```
npm install
npm run dev
```

访问 http://localhost:8080


## 构建目标

可以在根目录下添加.browserslistrc，默认defaults，详细见 https://github.com/browserslist/browserslist#full-list


## 自定义配置

默认提供了一套构建配置，为了满足灵活性可以进行覆盖，在根目录下添加配置文件，例如

`webpack.config.js`

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  // env 'development' 'production'

  return {
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html', inject: false }),
    ],
  };
}
```

配置项和 webpack 标准配置没有区别，唯一需要注意的是 exports 一个函数，env 信息会被注入。然后配置 scripts

```json
"scripts": {
  "dev": "zbuild dev -c webpack.config.js",
  "prod": "zbuild prod -c webpack.config.js",
}
```
