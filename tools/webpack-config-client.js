const _ = require('lodash');
const path = require('path');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
const webpack = require('webpack');
const pkgJson = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const UUID = require('uuid');
const glob = require('glob');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

function buildEntriesAndHTML() {
  // 用来构建entery
  const result = glob.sync('src/client/pages/**/*.js');
  const config = {
    hash: true,
    inject: true
  };
  const entries = {};
  const htmls = [];
  entries['style'] = './src/client/styles/index.less';
  result.forEach((item) => {
    const one = path.parse(item);
    // console.log(one.dir);
    let filename = one.dir.replace('src/client/pages/', '');
    // let filename = one.dir.split('/').slice(-1)[0];
    entries[filename] = [
      // 'core-js/modules/es6.object.get-own-property-names',
      // 'core-js/modules/es6.object.get-prototype-of',
      // 'core-js/modules/es6.function.bind',
      // 'es5-shim',
      // 'es6-shim',
      // 'object-create-ie8',
      // 'object-defineproperty-ie8',
      // 'console-polyfill',
      // 'json3',
      // 'bluebird',
      // 'fetch-polyfill2',
      './' + item
    ];
    htmls.push(
      new HtmlWebpackPlugin({
        ...config,
        template: './src/client/templates/index.ejs',
        chunks: ['style', filename],
        filename: `${filename}.html`
      })
    );
  });
  return {
    entries,
    htmls
  };
}

// console.log(buildEntriesAndHTML());

// ie 8 不支持hot-loader 这里全部注释掉
module.exports = (type) => {
  const isDev = type === 'dev';
  const isDist = type === 'dist';

  const cssLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: { minimize: isDist }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    }
  ];

  const lessLoaders = [
    {
      loader: require.resolve('less-loader'),
      options: {
        javascriptEnabled: true
      }
    }
  ];
  const miniCssLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../../'
    }
  };

  return {
    entry: buildEntriesAndHTML().entries,
    output: {
      publicPath: '/',
      filename: `bundle/[name].js`,
      chunkFilename: `bundle/chunk.[name].js`,
      path: path.join(config.webpack.path.pub)
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      rematch: 'Rematch',
      redux: 'Redux'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.scss', '.less', '.css', '.json'],
      alias: {
        react: 'anujs/dist/ReactIE.js',
        'react-dom': 'anujs/dist/ReactIE.js',
        'prop-types': 'anujs/lib/ReactPropTypes.js',
        'create-react-class': 'anujs/lib/createClass.js',
        'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',
        rematch: 'anujs/dist/Rematch.js',
        // router: 'anujs/dist/Router.js',
        redux: 'anujs/lib/ReduxIE.js'
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015-loose', 'react'],
                plugins: [
                  'transform-class-properties',
                  [
                    'transform-es2015-classes',
                    {
                      loose: true
                    }
                  ]
                ]
              }
            }
          ]
        },
        // {
        //   test: /.js$/,
        //   enforce: 'post', // post-loader处理
        //   loader: 'es3ify-loader'
        // },
        {
          test: /\.css$/,
          use: [miniCssLoader, ...cssLoaders]
        },
        {
          test: /\.less$/,
          use: [miniCssLoader, ...cssLoaders, ...lessLoaders]
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100,
                name: 'asset/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    mode: 'development',
    // mode: type === 'dev' ? 'development' : 'production',
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //     minSize: 30000,
    //     minChunks: 1,
    //     maxAsyncRequests: 5,
    //     maxInitialRequests: 3,
    //     name(module) {
    //       let uuid = UUID.v1()
    //         .toString()
    //         .split('-');
    //       return 'vendors.' + uuid[0];
    //     },
    //     cacheGroups: {
    //       vendor: {
    //         test: /node_modules/,
    //         chunks: 'initial',
    //         name: 'vendor',
    //         priority: 10
    //       },
    //       common: {
    //         chunks: 'initial',
    //         name: 'common',
    //         minSize: 0,
    //         priority: 2
    //       },
    //       styles: {
    //         name: 'styles',
    //         test: /\.scss|less|css$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    plugins: _.concat(
      _.compact([
        new es3ifyPlugin(),
        // isDev && new webpack.HotModuleReplacementPlugin(),
        // new webpack.DefinePlugin({
        //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        // }),
        // new webpack.EnvironmentPlugin(['NODE_ENV']),
        // new HtmlWebpackPlugin({
        //   title: pkgJson.title,
        //   minify: true,
        //   chunks: ['home'],
        //   template: './src/client/templates/index.ejs',
        //   filename: 'index.html'
        // }),
        // buildEntriesAndHTML().htmls,
        new CopyWebpackPlugin([
          {
            from: config.__basename + '/lib/dist',
            to: 'lib/'
          },
          {
            from: config.webpack.path.src + '/assets',
            to: 'assets/'
          }
        ]),
        new MiniCssExtractPlugin({
          filename: `bundle/[name].css`,
          chunkFilename: `bundle/chunk.[name].css`
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: { discardComments: { removeAll: true } },
          canPrint: true
        })
      ]),
      buildEntriesAndHTML().htmls,
      [
        new HtmlWebpackIncludeAssetsPlugin({
          assets: ['lib/common.polyfill.min.js', 'lib/anu.full.min.js'],
          append: false
        })
      ]
    )
  };
};
