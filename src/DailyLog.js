import React, { Component } from 'react';
import MovementLog from './MovementLog.js';

class DailyLog extends Component {
  render() {
    const movements = this.props.movements.map((movement, index) => {
      return (
        <MovementLog
          key={index}
          index={index}
          movement={movement}
          onSetAdded={this.props.onSetAdded}
          />
      )
    });
    return (
      <div className={this.props.className + ' daily-log'}>
        {movements}
      </div>
    )
  }
}

export default DailyLog;
