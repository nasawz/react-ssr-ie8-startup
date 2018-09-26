'use strict';

const config = require('./config');

const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const webpackConfig = require('./webpack-config-server');
const shell = require('shelljs');

// // Clean folder
// const buildFolder = config.webpack.path.pub;
// shell.rm('-rf', buildFolder);

// Webpack build
const compiler = webpack(webpackConfig);

let lastPercentage = 0;
compiler.apply(
  new ProgressPlugin((percentage, msg) => {
    percentage = Math.round(percentage * 10000) / 100;
    if (/building modules/.test(msg) && percentage - lastPercentage < 8) {
      return;
    }
    lastPercentage = percentage;
    console.log(percentage + '%', msg);
  })
);

if (process.env.WATCH_MODE === 'true') {
  compiler.watch(
    {
      /* watchOptions */
    },
    (err, stats) => {
      // Print watch/build result here...
      console.log('watch ✨ succ');
    }
  );
} else {
  console.log('Building, it may take a few seconds...');
  console.time('build ✨ Done');
  compiler.run((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.timeEnd('build ✨ Done');
    }
  });
}
