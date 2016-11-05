import React, { Component } from 'react';
import AppHeader from './AppHeader.js';
import AppContent from './AppContent.js';
import DailyLog from './DailyLog.js';
import ContentContainer from './ContentContainer.js';
import './App.css';

class App extends Component {
  render() {
    const today = new Date().toLocaleDateString();
    return (
      <div className='app'>
        <AppHeader>
          <ContentContainer>
            {today}
          </ContentContainer>
        </AppHeader>
        <AppContent>
          <ContentContainer>
            <DailyLog/>            
          </ContentContainer>
        </AppContent>
      </div>
    );
  }
}

export default App;
