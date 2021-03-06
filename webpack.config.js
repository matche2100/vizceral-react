'use strict';
const path = require('path');
const yargs = require('yargs');

const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .argv;

const config = {
  entry: './src/vizceral.jsx',
  mode: process.env.NODE_ENV || 'development',
  performance: {
        maxEntrypointSize: 512000,
        maxAssetSize:      512000,
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: options.optimizeMinimize ? 'vizceral.min.js' : 'vizceral.js',
    library: 'Vizceral',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: ['node_modules', 'bower_components']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      vizceral: 'vizceral'
    }
  ]

};

if (!options.optimizeMinimize) {
  config.devtool = 'source-map';
}

module.exports = config;
