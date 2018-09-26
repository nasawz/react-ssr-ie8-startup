const express = require('express');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const getConfig = require('./webpack-config-client');
const webpack = require('webpack');
const config = require('./config');

function startDevServer() {
  const app = express();
  /*=============webpack start==============*/
  const devConfig = getConfig('dev');
  const compiler = webpack(devConfig);
  app.use(
    devMiddleware(compiler, {
      publicPath: devConfig.output.publicPath,
      historyApiFallback: true
    })
  );
  // app.use(hotMiddleware(compiler));
  /*=============webpack end==============*/

  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Dev server listening at http://localhost:${config.port}/`);
  });
}
startDevServer();
