import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DatePicker from 'material-ui/DatePicker';

class AppHeader extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.date !== this.props.date;
  }
  render() {
    return (
      <AppBar 
        className='app-bar'
        style={{position: 'fixed'}}
        title={
          <div className='content-container'>
            <h1 className='app-header' 
              style={{ cursor: 'pointer' }}
              onTouchTap={(e) => { this.dateInput.focus(); }}
            >
              <strong>{this.props.date.toLocaleDateString()}</strong>
              <NavigationArrowDropDown color='white' />
              <DatePicker 
                autoOk={true}
                id='movement-date'
                style={{display: 'none'}} 
                ref={(dateInput) => { this.dateInput = dateInput; }} 
                onChange={this.props.handleDateChanged}
                firstDayOfWeek={0}
              />
            </h1>
          </div>
        }
        zDepth={2}
        iconElementLeft={<div />}
      />
    )
  }
}

export default AppHeader;
