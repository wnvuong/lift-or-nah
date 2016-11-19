import React, { Component } from 'react';
import { Button } from 'react-mdl';

class AddMovementModalListItem extends Component {
  handleMovementSelected = (e) => {
    this.props.onItemClick(this.props.movement)
  }
  render() {
    return (
      <Button ripple
        className='btn--list'
        onClick={this.handleMovementSelected}>
        {this.props.movement.name}
      </Button>
    )
  }
}

export default AddMovementModalListItem;
