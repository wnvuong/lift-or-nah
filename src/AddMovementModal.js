import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddMovementModalListItem from './AddMovementModalListItem.js';
import apihelper from './utils/apihelper.js';
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
      this.props.onMovementAdded(movement);
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
        <FloatingActionButton className='daily-log__add' onTouchTap={this.handleShowModal}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default AddMovementModal;
