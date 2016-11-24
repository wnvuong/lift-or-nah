import React, { Component } from 'react';

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
