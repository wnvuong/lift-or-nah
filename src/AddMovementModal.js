import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AddMovementModalListItem from './AddMovementModalListItem.js';
import apihelper from './utils/apihelper.js';

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

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
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  handleShowModal = () => {
    this.setState({ isVisible: true });
  }
  handleCloseModal = (e) => {
    this.setState({ isVisible: false });
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
        <div className={(this.state.isVisible ? 'add-movement-modal-container--visible' : '') + ' add-movement-modal-container'}>
          <div>
            <IconButton style={styles.small} iconStyle={styles.smallIcon} onTouchTap={this.handleCloseModal}>
              <NavigationArrowBack />
            </IconButton>
            <h2>Add Movement</h2>
          </div>
          

          {/*<div className='add-movement-modal-container__modal'>
            <h5 className='add-movement-modal-container__modal-title'>
              Add Movement
            </h5>
            <div className='add-movement-modal-container__modal-body'>
              {this.state.movements}
            </div>
          </div>*/}
        </div>
        <FloatingActionButton secondary={true} className='daily-log__add' onTouchTap={this.handleShowModal}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default AddMovementModal;
