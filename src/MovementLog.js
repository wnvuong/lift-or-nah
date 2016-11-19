import React, { Component } from 'react';
import { IconButton } from 'react-mdl';

class MovementLog extends Component {
  handleSetAdded = () => {
    this.props.onSetAdded({
      index: this.props.index,
      set: { 
        weight: 225, 
        reps: 5 
      }
    });
  }
  render() {
    let sets = this.props.movement.sets.map((set, index) => {
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
    let reps = this.props.movement.sets.map((set, index) => {
      return (
        <div key={index}>
            {set.reps} reps        
        </div>
      )
    });
    let weight = this.props.movement.sets.map((set, index) => {
      return (
        <div key={index}>
            {set.weight} lbs
        </div>
      )
    });
    return (
      <div className="movement-log">
        <h6 className='movement-log__title'>
          {this.props.movement.movement.name}
          <IconButton name="add" colored onClick={this.handleSetAdded} />          
        </h6>
        <div className='clearfix'>
          <div className='pull-right'>
            {reps}
          </div>
          <div className='pull-left'>
            {weight}
          </div>
        </div>
      </div>
    )
  }
}

export default MovementLog;
