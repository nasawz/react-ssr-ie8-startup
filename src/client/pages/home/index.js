var React = require('react');
var ReactDOM = require('react-dom');

import './style/index.less';

class Home extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      ssr: '',
      str: ''
    };
  }
  componentDidMount() {
    this.setState({
      ssr: window.__state__.ssr
    });
    // console.log('window.__state__', window.__state__);
  }

  onClick() {
    this.setState({
      str: 'you click me'
    });
  }

  render() {
    console.log('---------', this);
    let { ssr, str } = this.state;
    console.log(ssr);
    // if (!ssr) {
    //   return '';
    // }
    return (
      <div>
        <h2>
          Welcome {ssr}
          <img src="/assets/images/tongxin.png" onClick={this.onClick.bind(this)} />
          {str}
        </h2>
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
