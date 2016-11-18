import React, { Component } from 'react';
import { FABButton, Icon, Button } from 'react-mdl';
import AddMovementModalListItem from './AddMovementModalListItem.js';
import apihelper from './utils/apihelper.js';
import datehelper from './utils/datehelper.js';
class AddMovementModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      movements: []
    };

    apihelper.getMovements().then(movements => {
      const movementViews = movements.map(movement => {
        return (
          <AddMovementModalListItem
            key={movement._id}
            movement={movement}
            onItemClick={this.handleMovementSelected} />
        )
      });

      this.setState({
        movements: movementViews
      });
    })
  }
  handleShowModal = () => {
    this.setState({ isVisible: true });
  }
  handleCloseModal = (e) => {
    if (e.target === this.modalContainer) {
      this.setState({ isVisible: false });
    }
  }
  handleMovementSelected = (movement) => {
    apihelper.addMovement(movement._id, this.props.date).then(res => {
      this.setState({ isVisible: false });      
    });
  }
  render() {
    return (
      <div>
        <div className={(this.state.isVisible ? '' : 'hidden') + ' add-movement-modal-container'}
          onClick={this.handleCloseModal} ref={(container) => this.modalContainer = container}>
          <div className='add-movement-modal-container__modal'>
            <h5 className='add-movement-modal-container__modal-title'>
              Add Movement
            </h5>
            <div className='add-movement-modal-container__modal-body'>
              {this.state.movements}
            </div>
          </div>
        </div>
        <FABButton colored ripple className='daily-log__add' onClick={this.handleShowModal}>
          <Icon name="add" />
        </FABButton>
      </div>
    )
  }
}

export default AddMovementModal;