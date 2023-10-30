#### Navigation
##### [1 installing webpack](#title1)
##### [2 Prepare to setup](#title2)
##### [3 Setup](#title3)
##### [4 Preparing webpack to React](#title4)
##### [5 Deploy on gh pages](#title5)

# Webpack 5 config for React

A detailed guide for setting up this config you can find article about this config on Habr: https://habr.com/ru/post/597389/

# Getting Started

First of all, you must copy it to your project:

### `git clone https://github.com/DENISmer/webpack5-react-config ./<your_directory>`

Then install the dependencies:

### `npm install`

# Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.\
Enable React Hot Reloading.

### `npm run build`

Builds the app in the development mode to the `build` folder.

### `npm run build-prod`

Builds the app for production to the `build` folder.

### `npm run clean`

Delete `build` folder.

# how to setup this webpack configuration

### <a id="title1">1 Installing webpack</a>

```
npm init -y
npm i -D webpack webpack-cli
```
### <a id="title2">2 In the root of the project we create:</a>

```js
./src // folder
./webpack.config.js //config webpack file
```
### <a id="title3">3 Beginning to setup webpack</a>

  ####   3.1 create file: ./src/index.js with simple code:

```js
const sayHello = () => console.log('hello');
sayHello();
```
  ####   3.2 webpack.config.js:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js', // entry point of project
  
  output: {
    path: path.resolve(__dirname, 'build'), // directory for bundle
    clean: true, // clean ./build directory
  },
}
```

  ####   3.3 webpack dev-server settings:

```javascript
npm i -D webpack-dev-server
```

  ####   3.4 add to webpack.config.js dev-server settings in "module.exports":

```javascript
devtool: 'source-map',

devServer: {
  hot: true, //automatic page reload when changes are made
}
```
  ####  3.5 Now let`s add scripts to the package.json file:

  ```javascript
  "scripts": {
      "start": "webpack serve", // starts webpack-dev-server
      "build": "webpack", // project build-dev
      "build-prod": "webpack --mode=production", // production build
      "clean": "rd /s /q build" // build directory clean
  }
  ```
  ####  3.6 build mode
  Let's make the following changes in the webpack.config.js:
  ```javascript
  const path = require('path');
  
+ let mode = 'development'; // development default
+ if (process.env.NODE_ENV === 'production') { // production, if --mode=production then npm run build-prod
+   mode = 'production';
+ }
  
  module.exports = {
+  `mode,`
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    
    devServer: {
      hot: true,
    },
  }
  ```
  ####  3.7 assets:
  Update _output_ in webpack.config.js:


  ```javascript
  output: {
    path: path.resolve(__dirname, 'build'),
+   assetModuleFilename: 'assets/[hash][ext][query]', // assets will be in build/assets
    clean: true,
  }
  ```

  #### 3.8 HTML supporting:
  
  ```javascript
  npm i -D html-loader html-webpack-plugin
  ```

  #### 3.9 Updating webpack.config.js:

  ```javascript
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin'); // import plugin

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

+  const plugins = [
+    new HtmlWebpackPlugin({
+     template: './src/index.html',
+    }),
+  ];

module.exports = {
  mode,
+ plugins, 
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  
  devServer: {
    hot: true,
  },
  
+ module: {
+  	rules: [
+    { test: /\.(html)$/, use: ['html-loader'] }, 
+   ],
+ }
}
```

  #### 3.10 Add styles supporting:

  ```javascript
  npm i -D mini-css-extract-plugin css-loader sass-loader sass postcss postcss-preset-env postcss-loader
  ```

  Create ./postcss.config.js and add next exports:

  ```javascript
    module.exports = {
    plugins: ['postcss-preset-env'],
  };
  ```
  #### 3.11 Update webpack.config.js:

  ```javascript
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
  + const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    
  let mode = 'development';
  if (process.env.NODE_ENV === 'production') {
    mode = 'production';
  }
  
  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
   +new MiniCssExtractPlugin({
   +  filename: '[name].[contenthash].css',
   +  }),
  ];
  
  module.exports = {
    
    module: {
    	rules: [
        { test: /\.(html)$/, use: ['html-loader'] },
       +{
       +  test: /\.(s[ac]|c)ss$/i,
       +  use: [
       +    MiniCssExtractPlugin.loader,
       +    'css-loader',
       +    'postcss-loader',
       +    'sass-loader',
       +  ],
       +},
      ],
    }
  }
  ```

  after this manipulations - styles can be import only in .js/.jsx files: 
  ```javascript
  import './styles/main.scss'; 
  ```
  
  #### 3.12 Update webpack.config.js for Browserlist:
  
  ```javascript
  // ...
  let mode = 'development';
 +let target = 'web'; // browserslist only using in build version
  if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserslist';
  }

  // ...
  
  module.exports = {
    mode,
   +target,

    // ...

  }
  ```

  #### 3.13 Adding support for images and fonts:
   Update _module.rules_ in webpack.config.js
   
  ```javascript
    {
      test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
      type: mode === 'production' ? 'asset' : 'asset/resource',
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: 'asset/resource',
    }, 
  ```

  U can read [this article](https://habr.com/ru/articles/488464/) about webpack assets:


  #### 3.14 Babel:

  ```javascript
    npm i -D @babel/core @babel/preset-env babel-loader
  ```
  Create in './' _babel.config.js_ : 
  ```javascript
      module.exports = {
        presets: ['@babel/preset-env'],
      };
  ```
  add into _module.rules_ :
  
  jsx - for react supporting see further [to fourth title](#title4)
  ```javascript
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            cacheDirectory: true,
          },
        },
      },
  ```

### <a id="title4">4 Setup webpack for React</a>

  #### 4.1 install dependencies:
  
  ```javascript
      npm i -D @babel/preset-react cross-env react-refresh pmmmwh/react-refresh-webpack-plugin
  ```

  Update package.json:
  
  ```javascript
      {
        // ...
      	"scripts": {
   +        "start": "cross-env SERVE=true webpack serve",
            "build": "webpack",
            "build-prod": "webpack --mode=production",
            "clean": "rd /s /q build"
        }
        // ...
    }
  ```
  #### 4.2 Add React supporting and plugin  at _babel.config.js_:
      
  ```javascript
    const plugins = [];
    if (process.env.NODE_ENV === 'development') {
      plugins.push('react-refresh/babel');
    }
    
    module.exports = {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins,
    };
  ```

### <a id="title5">5 Deploy on gh pages</a>

  ```javascript
    npm install gh-pages --save-dev
  ```

 #### 4.2 Update scripts at _package.json_:

  ```javascript
    "deploy" : "gh-pages -d build",
  ```



  




