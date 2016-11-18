import React, { Component } from 'react';
import ContentContainer from './ContentContainer.js';

class AppContent extends Component {
  render() {
    return (
      <div className='app-content'>
        <ContentContainer>
          {this.props.children}
        </ContentContainer>
      </div>
    )
  }
}

export default AppContent;
