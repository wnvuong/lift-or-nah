import React, { Component } from 'react';
import AppHeader from './AppHeader.js';
import AppContent from './AppContent.js';
import DailyLog from './DailyLog.js';
import AddMovementModal from './AddMovementModal.js';
import { Layout, Header, HeaderRow, Content } from 'react-mdl';
import apihelper from './utils/apihelper.js';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(2016, 10, 11),
      movementLog: { movements: [] }
    };

    apihelper.getMovementLogs(this.state.date).then(movementLogs => {
      this.setState({
        movementLog: movementLogs[0]
      });
    });
  }
  render() {
    return (
      <div>
        <Layout fixedHeader className='mdl-color--grey-50'>
          <Header>
            <HeaderRow className='content-container app-header' 
            title={<span><strong>{this.state.date.toLocaleDateString()}</strong></span>} />
          </Header>
          <Content>
            <DailyLog className='content-container' 
            date={this.state.date}
            movementLog={this.state.movementLog} />
            <AddMovementModal date={this.state.date} />
          </Content>
        </Layout>
      </div>

    );
  }
}

export default App;
