import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props){
    super(props);
    this._onDelete = this._onDelete.bind(this);
    this.state={business:[]};
  }
  componentDidMount(){
    axios.get('http://localhost:4000/business').then(response=>{
      this.setState({business:response.data});
    }).catch(function(err){
      console.log(err);
    })
  }
  _onDelete(id) {
    axios.get('http://localhost:4000/business/delete/'+id).then(response=>{
        console.log('Deleted');
        this.setState({business:response.data});
    }).catch(err=>{
        console.error(err);
    })
  }

  render() {
    const {business} = this.state;
    const {_onDelete} = this;
    return (
      <div>
        <h3 align="center">Business List</h3>
        <table className="table table-striped" style={{marginTop:20}}>
          <thead>
            <tr>
              <th>Person</th>
              <th>Business</th>
              <th>GST Number</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            { 
              business.map(function(object,i){
                  return <TableRow obj={object} key={i} onDelete={_onDelete}  />
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
