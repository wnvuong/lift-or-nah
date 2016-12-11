import React, { Component } from 'react';
import DailyLog from './DailyLog.js';
import AddMovementModal from './AddMovementModal.js';
import DatePicker from 'material-ui/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

import { teal500, teal700 } from 'material-ui/styles/colors';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AppContent from './AppContent.js';
import apihelper from './utils/apihelper.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import update from 'immutability-helper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    primary2Color: teal700
  }
});

const today = new Date();

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: today,
      _id: null,
      movements: [],
      sets: {},
      editing: true,
      loading: true
    };
    this.getMovementLog(today);
  }
  getMovementLog = (date) => {
    apihelper.getMovementLogs(date).then(movementLogs => {
      console.log(movementLogs)
      movementLogs[0].date = new Date(movementLogs[0].date);
      this.setState(movementLogs[0]); 
      this.setState({ loading: false })
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
  handleSetAdded = (movement_id, date, movement_index, weight, reps) => {
    let position = 0;
    if (this.state.sets[movement_id] !== undefined) {
      position = this.state.sets[movement_id].length;
    }

    apihelper.addSet(movement_id, date, weight, reps, position).then(res => {
      this.setState({ 
        movements: res[0].movements,
        sets: res[0].sets 
      });
    });
  }
  handleSetRemoved = (movement_id, date, set_index, set_id) => {
    apihelper.removeSet(movement_id, date, set_id).then(res => {
      this.setState({ 
        movements: res[0].movements,
        sets: res[0].sets 
      });
    });

    const clone = this.createSetClone();

    clone[movement_id].values.splice(set_index, 1);
    this.setState({ sets: clone });
  }
  handleRepRemoved = (movement_id, date, set_index, set_id) => {
    if (this.state.sets[movement_id].values[set_index].reps > 0) {
      const changesToMake = {};
      changesToMake[movement_id] = {};
      changesToMake[movement_id].values = {};
      changesToMake[movement_id].values[set_index] = {
        reps: {
          $apply: (reps) => { return reps - 1; }
        }
      };
      const sets = update(this.state.sets, changesToMake);
      
      this.setState({ sets: sets });

      const weight = sets[movement_id].values[set_index].weight;
      const reps = sets[movement_id].values[set_index].reps;

      apihelper.updateSet(movement_id, date, set_id, weight, reps).then(res => {
        console.log(res);
      });
    }
  }
  handleRepAdded = (movement_id, date, set_index, set_id) => {
    const changesToMake = {};
    changesToMake[movement_id] = {};
    changesToMake[movement_id].values = {};
    changesToMake[movement_id].values[set_index] = {
      reps: {
        $apply: (reps) => { return reps + 1; }
      }
    };
    const sets = update(this.state.sets, changesToMake);
    
    this.setState({ sets: sets });

    const weight = sets[movement_id].values[set_index].weight;
    const reps = sets[movement_id].values[set_index].reps;

    apihelper.updateSet(movement_id, date, set_id, weight, reps).then(res => {
      console.log(res);
    });
  }
  handleWeightChanged = (movement_id, date, set_index, set_id, weight) => {
    const clone = this.createSetClone();

    clone[movement_id].values[set_index].weight = weight;

    this.setState({ sets: clone });

    apihelper.updateSet(movement_id, date, set_id, weight, clone[movement_id].values[set_index].reps).then(res => {
      console.log(res);
    });
  }
  handleDateChanged = (event, date) => {
    if (today.getDay() !== date.getDay() ||
    today.getMonth() !== date.getMonth() ||
    today.getFullYear() !== date.getFullYear()) {
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true });
    }
    
    this.setState({ date: date });
    this.setState({ loading: true });
    this.getMovementLog(date);
  }
  createSetClone() {
    return Object.getOwnPropertyNames(this.state.sets).reduce((clone, currSet) => {
      clone[currSet] = {};
      clone[currSet].movement_id = this.state.sets[currSet].movement_id;
      clone[currSet].values = this.state.sets[currSet].values.map(value => {
        return Object.assign({}, value);
      });
      return clone;
    }, {});
  }
  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar 
              className='app-bar'
              style={{position: 'fixed'}}
              title={
                <div className='content-container'>
                  <h1 className='app-header' 
                    style={{ cursor: 'pointer' }}
                    onTouchTap={(e) => { this.dateInput.focus(); }}
                  >
                    <strong>{this.state.date.toLocaleDateString()}</strong>
                    <NavigationArrowDropDown color='white' />
                    <DatePicker 
                      autoOk={true}
                      id='movement-date'
                      style={{visibility: 'hidden'}} 
                      ref={(dateInput) => { this.dateInput = dateInput; }} 
                      onChange={this.handleDateChanged}
                      firstDayOfWeek={0}
                    />
                  </h1>
                </div>
              }
              zDepth={2}
              iconElementLeft={<div />}
            />
            <AppContent>
              {this.state.loading && 
                <LinearProgress mode="indeterminate" />                
              }
              <DailyLog 
                className='content-container' 
                date={this.state.date}
                movements={this.state.movements}
                sets={this.state.sets}
                onSetAdded={this.handleSetAdded}
                onSetRemoved={this.handleSetRemoved}
                onRepAdded={this.handleRepAdded}
                onRepRemoved={this.handleRepRemoved}
                onWeightChanged={this.handleWeightChanged}
                editing={this.state.editing}
              />
              <AddMovementModal 
                date={this.state.date} 
                movements={this.state.movements}
                onSetAdded={this.handleSetAdded}
                sets={this.state.sets}
                editing={this.state.editing}
              />        
            </AppContent>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
