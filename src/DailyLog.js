import React, { Component } from 'react';
import MovementLog from './MovementLog.js';

class DailyLog extends Component {
  render() {
    const movements = this.props.movements.map((movement, index) => {
      return (
        <MovementLog
          key={index}
          index={index}
          date={this.props.date}
          movement={movement}
          sets={this.props.sets[movement._id].values}

          onSetAdded={this.props.onSetAdded}
          onSetRemoved={this.props.onSetRemoved}
          onRepAdded={this.props.onRepAdded}
          onRepRemoved={this.props.onRepRemoved}
          onWeightChanged={this.props.onWeightChanged}
          editing={this.props.editing}
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
