import React, { Component } from 'react';
import ContentContainer from './ContentContainer.js';

class AppHeader extends Component {
  render() {
    return (
      <div className='app-header'>
        <ContentContainer>
          {this.props.title}
        </ContentContainer>
      </div>
    )
  }
}

export default AppHeader;
