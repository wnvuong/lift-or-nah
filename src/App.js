import React, { Component } from 'react';
// import AppHeader from './AppHeader.js';
// import AppContent from './AppContent.js';
import DailyLog from './DailyLog.js';
import AddMovementModal from './AddMovementModal.js';
import { Layout, Header, HeaderRow, Content } from 'react-mdl';
import apihelper from './utils/apihelper.js';

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
      return elem.movement._id == movement._id; 
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
      <div>
        <Layout fixedHeader className='mdl-color--grey-50'>
          <Header>
            <HeaderRow 
            className='content-container app-header' 
            title={<span><strong>{this.state.date.toLocaleDateString()}</strong></span>} />
          </Header>
          <Content>
            <DailyLog 
            className='content-container' 
            date={this.state.date}
            movements={this.state.movements}
            onSetAdded={this.handleSetAdded} />
            <AddMovementModal 
            date={this.state.date} 
            movements={this.state.movements}
            onMovementAdded={this.handleMovementAdded} />
          </Content>
        </Layout>
      </div>

    );
  }
}

export default App;
