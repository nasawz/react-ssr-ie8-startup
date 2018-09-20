var React = require('react');
var ReactDOM = require('react-dom');

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  }
}

module.exports = Dashboard;

if (typeof window !== 'undefined') {
  var container = document.getElementById('mainContainer');
  ReactDOM.render(<Dashboard />, container);
}
