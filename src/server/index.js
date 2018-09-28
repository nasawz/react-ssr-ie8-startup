global.React = require('anujs/dist/ReactIE');
global.rematch = require('anujs/dist/Rematch');
var path = require('path');
var React = global.React;

var ReactDOMServer = require('react-dom/server');

var express = require('express');
var boom = require('express-boom');
var __basename = path.dirname(__dirname);
var app = express();
app.use(boom());

var ejs = require('ejs');
ejs.delimiter = '?';
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);

app.use('/bundle', express.static(path.resolve(__basename, '../dist/bundle')));
app.use('/assets', express.static(path.resolve(__basename, '../dist/assets')));
app.use('/lib', express.static(path.resolve(__basename, '../dist/lib')));
app.set('views', path.resolve(__basename, '../dist'));

app.get('/', function(req, res) {
  var Home = require('../client/pages/home');
  res.render('home.html', {
    title: '后端渲染',
    keywords: '关键字',
    description: '详细说明',
    state: JSON.stringify({ ssr: 'succ' }),
    component: ReactDOMServer.renderToString(<Home />)
  });
});

app.get('/home/info', function(req, res) {
  var Info = require('../client/pages/home/info');
  res.render('home/info.html', {
    title: '后端渲染',
    keywords: '',
    description: '',
    state: JSON.stringify({}),
    component: ReactDOMServer.renderToString(<Info />)
  });
});
app.get('/input', function(req, res) {
  var Input = require('../client/pages/input');
  res.render('input.html', {
    title: '后端渲染',
    keywords: '',
    description: '',
    state: JSON.stringify({}),
    component: ReactDOMServer.renderToString(<Input />)
  });
});
app.get('/dashboard', function(req, res) {
  var Dashboard = require('../client/pages/dashboard');
  res.render('dashboard.html', {
    title: '后端渲染',
    keywords: '',
    description: '',
    state: JSON.stringify({}),
    component: ReactDOMServer.renderToString(<Dashboard />)
  });
});
var port = 8082;
app.listen(port, function() {
  console.log(`Dev server listening at http://localhost:${port}/`);
});
