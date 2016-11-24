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
  handleRepAdded = (set_id, index) => {
    this.props.onRepAdded(this.props.movement._id, this.props.date, index, set_id);
  }
  handleRepRemoved = (set_id, index) => {
    this.props.onRepRemoved(this.props.movement._id, this.props.date, index, set_id);    
  }
  handleSetRemoved = (set_id, index) => {
    this.props.onSetRemoved(this.props.movement._id, this.props.date, index, set_id);
  }
  render() {
    return (
      <div className='movement-log__line-item'>
          <div className='movement-log__weight-container'>
            <IconButton>
                <ContentRemoveCircleOutline />
            </IconButton>
            <TextField className='movement-log__weight'
                id={this.props.set_id + 'weight'}
                value={this.props.weight}
                style={{ width: '40px' }}
            />
            <div>&nbsp;lbs</div>
            <IconButton>
                <ContentAddCircleOutline />
            </IconButton>
          </div>
          <div className='movement-log__reps-container'>
            <IconButton onTouchTap={this.handleRepRemoved.bind(this, this.props.set_id, this.props.set_index)}>
                <ContentRemoveCircleOutline />
            </IconButton>
            <div className='movement-log__reps'>{this.props.reps}</div>
            <div className='movement-log__reps-label'>&nbsp;reps</div>
            <IconButton onTouchTap={this.handleRepAdded.bind(this, this.props.set_id, this.props.set_index)}>
                <ContentAddCircleOutline />
            </IconButton>
          </div>
          <IconButton onTouchTap={this.handleSetRemoved.bind(this, this.props.set_id, this.props.set_index)} >
            <ActionDelete />
          </IconButton>
      </div>
    )
  }
}

export default MovementLogLineItem;