import React, { Component } from 'react';
import './ContentContainer.css';

class ContentContainer extends Component {
  render() {
    return (
      <div className='content-container'>
        {this.props.children}
      </div>
    )
  }
}

export default ContentContainer;
