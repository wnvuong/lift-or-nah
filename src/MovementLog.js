import React, { Component } from 'react';
import apihelper from './utils/apihelper.js';

class MovementLog extends Component {
  constructor(props) {
    super(props);
    let setsView = props.sets.map((set, index) => {
      return (
        <div key={index}>
          <div className='pull-right'>
            {set.reps} reps
          </div>
          <div className='pull-left'>
            {set.weight} lbs
          </div>
        </div>
      )
    });

    this.state = { sets: setsView };
  }
  render() {
    return (
      <div className="movement-log">
        <h6 className='movement-log__title'>
          {this.props.name}
        </h6>
        <div className='clearfix'>
          {this.state.sets}
        </div>
      </div>
    )
  }
}

export default MovementLog;
