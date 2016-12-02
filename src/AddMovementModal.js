import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { List, ListItem } from 'material-ui/List';
import ContentAdd from 'material-ui/svg-icons/content/add';
import apihelper from './utils/apihelper.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
          innerDivStyle={{paddingLeft: '24px', paddingRight: '24px' }}
        />            
      )
    });
    return (
      <div>
        <Dialog
          title="Add Movement"
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.handleCloseModal}
            />
          ]}
          modal={false}
          open={this.state.isVisible}
          onRequestClose={this.handleCloseModal}
          contentStyle={{maxWidth: '380px'}}
          bodyStyle={{padding: 0}}>
          <List>
            {movementViews}
          </List>
        </Dialog>
        <FloatingActionButton 
          secondary={true} 
          className='daily-log__add' 
          onTouchTap={this.handleShowModal}
          disabled={!this.props.editing}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default AddMovementModal;
