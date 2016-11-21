import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class AddMovementModalListItem extends Component {
  handleMovementSelected = (e) => {
    this.props.onItemClick(this.props.movement)
  }
  render() {
    return (
      <FlatButton 
        className='btn--list'
        onTouchTap={this.handleMovementSelected}
        label={this.props.movement.name} 
      />
    )
  }
}

export default AddMovementModalListItem;
