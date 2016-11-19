import React, { Component } from 'react';
import MovementLog from './MovementLog.js';
import apihelper from './utils/apihelper.js';
import datehelper from './utils/datehelper.js';

class DailyLog extends Component {
  render() {
    const movementLog = this.props.movementLog.movements.map((movement, index) => {
      return (
        <MovementLog
          key={index}
          sets={movement.sets}
          name={movement.movement.name}
          />
      )
    });
    return (
      <div className={this.props.className + ' daily-log'}>
        {movementLog}
      </div>
    )
  }
}

export default DailyLog;
