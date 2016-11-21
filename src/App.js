import React, { Component } from 'react';
import DailyLog from './DailyLog.js';
import AddMovementModal from './AddMovementModal.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AppContent from './AppContent.js';
import apihelper from './utils/apihelper.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(2016, 10, 11),
      movements: []
    };

    apihelper.getMovementLogs(this.state.date).then(movementLogs => {
      this.setState({
        movements: movementLogs[0].movements,
        id: movementLogs[0]._id
      });
    });
  }
  handleMovementAdded = (movement) => {
    let foundMovement = this.state.movements.find((elem) => {
      return elem.movement._id === movement._id; 
    });
    if (foundMovement === undefined) {
      this.setState({
        movements: this.state.movements.concat([{movement: movement, sets: []}])
      }); 
    }
  }
  handleSetAdded = (movement) => {
    let movements = this.state.movements.slice(0, this.state.movements.length);
    movements[movement.index].sets.push(movement.set)

    this.setState({
      movements: movements
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar 
            className='app-bar'
            style={{position: 'fixed'}}
            title={
              <div className='content-container'>
                <h1 className='app-header'>
                  <strong>{this.state.date.toLocaleDateString()}</strong>
                </h1>
              </div>
            }
            iconElementLeft={<div />}
          />
          <AppContent>
            <DailyLog 
              className='content-container' 
              date={this.state.date}
              movements={this.state.movements}
              onSetAdded={this.handleSetAdded} 
            />
            <AddMovementModal 
              date={this.state.date} 
              movements={this.state.movements}
              onMovementAdded={this.handleMovementAdded} 
            />        
          </AppContent>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
