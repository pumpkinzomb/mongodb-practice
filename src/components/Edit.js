import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props){
    super(props);
    this._onChangePersonName = this._onChangePersonName.bind(this);
    this._onChangeBusinessName = this._onChangeBusinessName.bind(this);
    this._onChangeGstNumber = this._onChangeGstNumber.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.state={
        person_name:'',
        business_name:'',
        business_gst_number:''
    }
}
componentDidMount(){
  axios.get('http://localhost:4000/business/edit/'+this.props.match.params.id)
    .then(response =>{
      this.setState({
        person_name:response.data.person_name,
        business_name:response.data.business_name,
        business_gst_number:response.data.business_gst_number
      })
    }).catch(function(err){
      console.error(err);
    })
}
_onChangePersonName(e){
    this.setState({
        person_name:e.target.value
    })
}
_onChangeBusinessName(e){
    this.setState({
        business_name:e.target.value
    })
}
_onChangeGstNumber(e){
    this.setState({
        business_gst_number:e.target.value
    })
}
_onSubmit(e){
  e.preventDefault();
  if(this.state.person_name.length<1 || this.state.business_name<1 || this.state.business_gst_number<1){
      console.error('All field is required.');
      return;
  }
  const obj={
      person_name:this.state.person_name,
      business_name:this.state.business_name,
      business_gst_number:this.state.business_gst_number
  }
  // console.log(`The values are ${this.state.person_name}, ${this.state.business_name}, and ${this.state.business_gst_number}`);
  axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj).then(res=>{
      console.log(res.data);
      this.props.history.push('/index');
  });
  

}
  render() {
    return (
      <div style={{marginTop:10}}>
        <h3 align="center">Update Business</h3>
        <form onSubmit={this._onSubmit}>
            <div className="form-group">
                <label>Person Name: </label>
                <input type="text" 
                    className="form-control" 
                    value={this.state.person_name} 
                    onChange={this._onChangePersonName} />
            </div>
            <div className="form-group">
                <label>Business Name: </label>
                <input type="text" 
                    className="form-control" 
                    value={this.state.business_name} 
                    onChange={this._onChangeBusinessName} />
            </div>
            <div className="form-group">
                <label>GST Number: </label>
                <input type="text" 
                    className="form-control" 
                    value={this.state.business_gst_number} 
                    onChange={this._onChangeGstNumber} />
            </div>
            <div className="form-group">
                <input type="submit" value="Register Business" className="btn btn-primary" />
            </div>
        </form>
    </div>
    )
  }
}
