import React, { Component } from 'react';

class AppContent extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default AppContent;
