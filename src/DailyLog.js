import React, { Component } from 'react';
import MovementLog from './MovementLog.js';
import './DailyLog.css';

class DailyLog extends Component {
  render() {
    return (
      <div className='daily-log'>
        <MovementLog></MovementLog>
      </div>
    )
  }
}

export default DailyLog;
