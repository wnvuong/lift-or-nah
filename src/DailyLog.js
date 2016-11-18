import React, { Component } from 'react';
import MovementLog from './MovementLog.js';
import apihelper from './utils/apihelper.js';
import datehelper from './utils/datehelper.js';

class DailyLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movementLogsView: []
    };

    apihelper.getMovementLogs(this.props.date).then(movementLogs => {
      console.log(movementLogs)
      const movementLogsView = movementLogs[0].movements.map((movement, index) => {
        return (
          <MovementLog
            key={index}
            sets={movement.sets}
            name={movement.movement.name}
            />
        )
      });

      this.setState({
        movementLogsView: movementLogsView
      });
    });
  }
  render() {
    return (
      <div className={this.props.className + ' daily-log'}>
        {this.state.movementLogsView}
      </div>
    )
  }
}

export default DailyLog;
