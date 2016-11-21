import React, { Component } from 'react';
import ContentContainer from './ContentContainer.js';

class AppContent extends Component {
  render() {
    return (
      <div className='app-content'>
        {this.props.children}
      </div>
    )
  }
}

export default AppContent;
