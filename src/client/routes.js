var React = require('anujs/dist/ReactIE');
var ReachRouter = require('anujs/dist/Router');
var Link = ReachRouter.Link;
var Router = ReachRouter.Router;

var HInput = require('./hinput.js');
var Home = require('./home.js');
var Dashboard = require('./dashboard.js');

module.exports = class Routes extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="input">HInput</Link>
          </li>
        </ul>
        <Router>
          <Home path="/" />
          <Dashboard path="dashboard" />
          <HInput path="input" />
        </Router>
      </div>
    );
  }
};
