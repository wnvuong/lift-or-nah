import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import TextField from 'material-ui/TextField';

class MovementLogLineItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.set_id !== nextProps.set_id ||
        this.props.weight !== nextProps.weight ||
        this.props.reps !== nextProps.reps) {
      return true;
    }
    return false;
  }
  handleRepAdded = (event) => {
    this.props.onRepAdded(this.props.movement._id, this.props.date, this.props.set_index, this.props.set_id);
  }
  handleRepRemoved = (event) => {
    this.props.onRepRemoved(this.props.movement._id, this.props.date, this.props.set_index, this.props.set_id);    
  }
  handleSetRemoved = (event) => {
    this.props.onSetRemoved(this.props.movement._id, this.props.date, this.props.set_index, this.props.set_id);
  }
  handleWeightChanged = (event) => {
    let parsedWeight = parseInt(event.target.value, 10);
    if (isNaN(parsedWeight)) {
      parsedWeight = 0;
    }
    this.props.onWeightChanged(this.props.movement._id, this.props.date, this.props.set_index, this.props.set_id, parsedWeight);
  }
  handleWeightAdded = (event) => {
    this.props.onWeightChanged(this.props.movement._id, this.props.date, this.props.set_index, this.props.set_id, this.props.weight + 5)
  }
  handleWeightRemoved = (event) => {
    this.props.onWeightChanged(this.props.movement._id, this.props.date, this.props.set_index, this.props.set_id, this.props.weight - 5)
  }
  render() {
    return (
      <div className='movement-log__line-item'>
          <div className='movement-log__weight-container'>
            <IconButton onTouchTap={this.handleWeightRemoved}>
                <ContentRemoveCircleOutline />
            </IconButton>
            <TextField className='movement-log__weight'
                id={this.props.set_id + 'weight'}
                value={this.props.weight}
                style={{ width: '40px' }}
                type='tel'
                onChange={this.handleWeightChanged}
            />
            <div>&nbsp;lbs</div>
            <IconButton onTouchTap={this.handleWeightAdded}>
                <ContentAddCircleOutline />
            </IconButton>
          </div>
          <div className='movement-log__reps-container'>
            <IconButton onTouchTap={this.handleRepRemoved}>
                <ContentRemoveCircleOutline />
            </IconButton>
            <div className='movement-log__reps'>{this.props.reps}</div>
            <div className='movement-log__reps-label'>&nbsp;reps</div>
            <IconButton onTouchTap={this.handleRepAdded}>
                <ContentAddCircleOutline />
            </IconButton>
          </div>
          <IconButton onTouchTap={this.handleSetRemoved}>
            <ActionDelete />
          </IconButton>
      </div>
    )
  }
}

export default MovementLogLineItem;