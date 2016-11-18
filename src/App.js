import React, { Component } from 'react';
import AppHeader from './AppHeader.js';
import AppContent from './AppContent.js';
import DailyLog from './DailyLog.js';
import AddMovementModal from './AddMovementModal.js';
import { Layout, Header, HeaderRow, Content } from 'react-mdl';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

class App extends Component {
  render() {
    const date = new Date(2016, 10, 11);
    return (
      <div>
        <Layout fixedHeader className='mdl-color--grey-50'>
          <Header>
            <HeaderRow className='content-container app-header' title={<span><strong>{date.toLocaleDateString()}</strong></span>} />
          </Header>
          <Content>
            <DailyLog className='content-container' date={date}/>
            <AddMovementModal date={date} />
          </Content>
        </Layout>
      </div>

    );
  }
}

export default App;
