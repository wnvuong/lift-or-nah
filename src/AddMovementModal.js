import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import apihelper from './utils/apihelper.js';

class AddMovementModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      movements: []
    };

    apihelper.getMovements().then(movements => {
      this.setState({ movements: movements });
    })
  }
  handleShowModal = () => {
    this.setState({ isVisible: true });
  }
  handleCloseModal = (e) => {
    this.setState({ isVisible: false });
  }
  handleMovementSelected = (movement) => {
    this.props.onSetAdded(movement._id, this.props.date, this.props.index, 135, 5);
    this.setState({ isVisible: false });
  }
  render() {
    const movementViews = this.state.movements.map(movement => {
      return (
        <ListItem 
          className={this.props.sets[movement._id] !== undefined ? 'add-movement-modal-container__line-item--disabled' : 'add-movement-modal-container__line-item'}
          key={movement._id}
          primaryText={movement.name}
          disabled={this.props.sets[movement._id] !== undefined}
          onTouchTap={this.handleMovementSelected.bind(this, movement)} 
        />            
      )
    });
    return (
      <div>
        <div className={(this.state.isVisible ? 'add-movement-modal-container--visible' : '') + ' add-movement-modal-container '}>
          <AppBar
            className='app-bar'
            showMenuIconButton={false}
            style={{paddingLeft: 0, paddingRight: 0}}
            title={
              <div className='content-container flexbox align-center'>
                <IconButton 
                  style={{ marginRight: '5px' }}
                  onTouchTap={this.handleCloseModal}>
                  <NavigationClose color='white' />
                </IconButton>
                <h1 className='app-header'>
                  <strong>Add Movement</strong>
                </h1>
              </div>
            }
          />
          <List className='content-container'>
            {movementViews}
          </List>
        </div>
        <FloatingActionButton secondary={true} className='daily-log__add' onTouchTap={this.handleShowModal}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default AddMovementModal;
