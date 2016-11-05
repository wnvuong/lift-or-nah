import React, { Component } from 'react';
import './AppContent.css';

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
