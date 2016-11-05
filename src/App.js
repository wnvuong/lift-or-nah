import React, { Component } from 'react';
import AppHeader from './AppHeader.js';
import AppContent from './AppContent.js';
import MovementLog from './MovementLog.js';
import './App.css';

class App extends Component {
  render() {
    const today = new Date().toLocaleDateString();
    return (
      <div>
        <AppHeader>
          {today}
        </AppHeader>
        <AppContent>
          <MovementLog></MovementLog>
        </AppContent>
      </div>
    );
  }
}

export default App;
