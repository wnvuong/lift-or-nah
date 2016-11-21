import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import apihelper from './utils/apihelper.js';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class MovementLog extends Component {
  handleSetAdded = () => {
    apihelper.addSet(this.props.movement.movement._id, this.props.date, 315, 5).then(res => {
      console.log(res);
    });
    this.props.onSetAdded({
      index: this.props.index,
      set: { 
        weight: 315, 
        reps: 5 
      }
    });
  }
  render() {
    let sets = this.props.movement.sets.map((set, index) => {
      return (
        <TableRow key={index}>
          <TableRowColumn>{set.weight}</TableRowColumn>
          <TableRowColumn>{set.reps}</TableRowColumn>
        </TableRow>
      )
    });
    let reps = this.props.movement.sets.map((set, index) => {
      return (
        <div className='movement-log__reps' key={index}>
            {set.reps} reps
        </div>
      )
    });
    let weight = this.props.movement.sets.map((set, index) => {
      return (
        <div className='movement-log__weight' key={index}>
            {set.weight} lbs
        </div>
      )
    });
    return (
      <Card className='movement-log'> 
        <CardHeader title={this.props.movement.movement.name} />
        <Divider />
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Weight</TableHeaderColumn>
                <TableHeaderColumn>Reps</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {sets}
            </TableBody>
          </Table>
        <Divider />
          {/*<div className="movement-log">
            <h6 className='movement-log__title'>
              {this.props.movement.movement.name}
              <IconButton onTouchTap={this.handleSetAdded}>
                <ContentAdd />
              </IconButton>          
            </h6>
            <div className='clearfix'>
              <div className='pull-right'>
                {reps}
              </div>
              <div className='pull-left'>
                {weight}
              </div>
            </div>
          </div>*/}
        <CardActions>
          <FlatButton label='Add Set' labelStyle={{ paddingLeft: '8px', paddingRight: '8px'}} style={{minWidth: 0}} />
        </CardActions>
      </Card>
    )
  }
}

export default MovementLog;
