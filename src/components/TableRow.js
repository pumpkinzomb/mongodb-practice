import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class TableRow extends Component {
    render() {
        const { obj={}, onDelete=f=>f } = this.props;
        return (
            <tr>
                <td>{obj.person_name}</td>
                <td>{obj.business_name}</td>
                <td>{obj.business_gst_number}</td>
                <td><Link to={"/edit/"+obj._id} className="btn btn-primary">Edit</Link></td>
                <td><button onClick={()=>{
                    onDelete(obj._id);
                }} className="btn btn-danger">Delete</button></td>
            </tr>
        )
  }
}


export default withRouter(TableRow);