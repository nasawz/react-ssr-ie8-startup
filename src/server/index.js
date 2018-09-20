// var moduleAlias = require('module-alias');
// moduleAlias.addAliases({
//   react: 'anujs/dist/ReactIE.js',
//   'react-dom': 'anujs/dist/ReactIE.js',
//   'prop-types': 'anujs/lib/ReactPropTypes.js',
//   'create-react-class': 'anujs/lib/createClass.js'
//   // 'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',
//   // rematch: 'anujs/dist/Rematch.js',
//   // redux: 'anujs/lib/ReduxIE.js'
// });

global.React = require('anujs/dist/ReactIE');
global.rematch = require('anujs/dist/Rematch');
// global.router = require('anujs/dist/Router');
var path = require('path');
var React = global.React;
// var ReactDOMServer = require('anujs/dist/ReactDOMServer');

var ReactDOMServer = require('react-dom/server');

var ServerLocation = require('@reach/router').ServerLocation;
var express = require('express');
var boom = require('express-boom');
var __basename = path.dirname(__dirname);
var app = express();
app.use(boom());

var ejs = require('ejs');
ejs.delimiter = '?';

app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);

require('node-jsx').install({ extension: '.jsx' });

app.use('/bundle', express.static(path.resolve(__basename, '../dist/bundle')));
app.use('/lib', express.static(path.resolve(__basename, '../dist/lib')));
app.set('views', path.resolve(__basename, '../dist'));

app.get('/', function(req, res) {
  var Home = require('../client/pages/home');
  res.render('home.html', {
    title: '后端渲染',
    component: ReactDOMServer.renderToString(<Home />)
  });
});
app.get('/input', function(req, res) {
  var Input = require('../client/pages/input');
  res.render('input.html', {
    title: '后端渲染',
    component: ReactDOMServer.renderToString(<Input />)
  });
});
app.get('/dashboard', function(req, res) {
  var Dashboard = require('../client/pages/dashboard');
  res.render('dashboard.html', {
    title: '后端渲染',
    component: ReactDOMServer.renderToString(<Dashboard />)
  });
});
var port = 8082;
app.listen(port, function() {
  console.log(`Dev server listening at http://localhost:${port}/`);
});
