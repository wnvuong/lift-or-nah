import React, { Component } from 'react';
import apihelper from './apihelper.js';
import './MovementLog.css';

class MovementLog extends Component {
  constructor(props) {
    super(props);

    this.state = { movements: [] };

    apihelper.getMovements().then(movements => {
      const movementViews = movements.map(movement => {
        return (
          <option value={movement.name} id={movement._id} key={movement._id}>
            {movement.name}
          </option>
        )
      });

      this.setState({
        movements: movementViews
      });
    })
  }
  render() {
    return (
      <div className="movement-log">
        <select name="movement">
          {this.state.movements}
        </select>
      </div>
    )
  }
}

export default MovementLog;
