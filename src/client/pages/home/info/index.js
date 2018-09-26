var React = require('react');
var ReactDOM = require('react-dom');

class Home extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Info</h2>
      </div>
    );
  }
}

module.exports = Home;
console.log('------');
if (typeof window !== 'undefined') {
  var container = document.getElementById('mainContainer');
  ReactDOM.render(<Home />, container);
}
