### 简介

快速构建React Typescript 项目

### 安装

```
tnpm install @ali/zbuild -D
```

### 项目开发

- 默认entry，src/index.tsx，可以通过配置覆盖
- 需要在项目根目录下添加tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "strict": true,
    "jsx": "react",
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "noEmit": true
  },
  "include": [
    "src/**/*.tsx",
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ],
  "files": [
    "src/index.d.ts"
  ]
}
```

安装依赖并启动服务
```
tnpm i
zbuild dev
```

访问http://localhost:8080


### 说明

#### 构建目标

可以在根目录下添加.browserslistrc，默认defaults，详细见https://github.com/browserslist/browserslist#full-list

#### eslint

默认采用了airbnb-typescript，airbnb的规则相对严格，可以在根目录下添加.eslintrc，进行rule覆盖

`.eslintrc.js`
```
module.exports = {
  rules: {
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
```

#### type-check

eslint规则使用了@typescript-eslint/recommended-requiring-type-checking，所以lint包含了一部分check

type-check实际上就是跑了tsc命令

### 自定义配置

默认提供了一套构建配置，为了满足灵活性可以进行覆盖，在根目录下添加配置文件，例如

`webpack.config.js`
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  // env 'development' 'mock' 'production'

  return {
    output: {
      libraryTarget: 'umd',
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html', inject: false }),
    ],
  };
}
```
配置项和webpack标准配置没有区别，需要注意的是exports一个函数，env信息会被注入

### npm scripts实践

```json
"scripts": {
    "dev": "zbuild dev -c webpack.config.js",
    "mock": "zbuild mock webpack.config.js",
    "prod": "zbuild prod webpack.config.js",
    "lint": "zbuild lint && zbuild type-check"
}
```
