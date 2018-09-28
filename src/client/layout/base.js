import React, { Component } from 'react';

export default class BaseLayout extends Component {
  render() {
    return (
      <div>
        <div>header</div>
        {this.props.children}
        <div>footer</div>
      </div>
    );
  }
}
