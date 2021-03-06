import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import MovementLogLineItem from './MovementLogLineItem.js';

class MovementLog extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    
    if (this.props.movement._id !== nextProps.movement._id || 
    nextProps.movement.name !== nextProps.movement.name) {
      return true;
    }

    if (this.props.sets.length !== nextProps.sets.length) {
      return true;
    }

    for (let i = 0; i < this.props.sets.length; i++) {
      let currSet = this.props.sets[i];
      let nextSet = nextProps.sets[i]; 

      if (currSet.id !== nextSet.id ||
      currSet.weight !== nextSet.weight ||
      currSet.reps !== nextSet.reps) {
        return true;
      }
    }
    
    return false;
  }
  handleSetAdded = () => {
    if (this.props.sets != null && this.props.sets.length > 0) {
      let weight = this.props.sets[this.props.sets.length - 1].weight;
      this.props.onSetAdded(this.props.movement._id, this.props.date, 0, weight, 0);      
    } else {
      this.props.onSetAdded(this.props.movement._id, this.props.date, 0, 135, 0);    
    }
  }
  render() {
    let sets = this.props.sets.map((set, set_index) => {
      return (
        <MovementLogLineItem
          key={set.id}
          set_id={set.id} 
          set_index={set_index}
          weight={set.weight}
          reps={set.reps}
          movement={this.props.movement}
          date={this.props.date}
          onRepAdded={this.props.onRepAdded}
          onRepRemoved={this.props.onRepRemoved}
          onSetRemoved={this.props.onSetRemoved}
          onWeightChanged={this.props.onWeightChanged}
          editing={this.props.editing}
        />    
      )
    });
    return (
      <Card className='movement-log'> 
        <CardHeader 
          title={this.props.movement.name}
        />
        <Divider />
        <div className='movement-log__body'>
          {sets}
        </div>
        <Divider />
        <CardActions>
          <FlatButton 
            label='Add Set' 
            labelStyle={{ paddingLeft: '8px', paddingRight: '8px'}} 
            style={{minWidth: 0}}
            onTouchTap={this.handleSetAdded} 
            disabled={!this.props.editing}
          />
        </CardActions>
      </Card>
    )
  }
}

export default MovementLog;
