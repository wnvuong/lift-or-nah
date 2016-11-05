import React, { Component } from 'react';
import './AppHeader.css';

class AppHeader extends Component {
  render() {
    return (
      <div className='app-header'>
        {this.props.children}
      </div>
    )
  }
}

export default AppHeader;
