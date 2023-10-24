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

Delete `dist` folder.

# how to setup this webpack configuration

### 1 Installing webpack

```
npm init -y
npm i -D webpack webpack-cli
```
### 2 In the root of the project we create:

```js
./src // folder
./webpack.config.js //config webpack file
```
### 3 Beginning to setup webpack

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





















