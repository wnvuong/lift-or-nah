import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import apihelper from './utils/apihelper.js';
import ContentAdd from 'material-ui/svg-icons/content/add';

class MovementLog extends Component {
  handleSetAdded = () => {
    apihelper.addSet(this.props.movement.movement._id, this.props.date, 315, 5).then(res => {
      console.log(res);
    });
    this.props.onSetAdded({
      index: this.props.index,
      set: { 
        weight: 315, 
        reps: 5 
      }
    });
  }
  render() {
    let reps = this.props.movement.sets.map((set, index) => {
      return (
        <div className='movement-log__reps' key={index}>
            {set.reps} reps
        </div>
      )
    });
    let weight = this.props.movement.sets.map((set, index) => {
      return (
        <div className='movement-log__weight' key={index}>
            {set.weight} lbs
        </div>
      )
    });
    return (
      <div className="movement-log">
        <h6 className='movement-log__title'>
          {this.props.movement.movement.name}
          <IconButton onTouchTap={this.handleSetAdded}>
            <ContentAdd />
          </IconButton>          
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
