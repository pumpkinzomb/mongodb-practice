import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
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
        //console.log(`The values are ${this.state.person_name}, ${this.state.business_name}, and ${this.state.business_gst_number}`);
        axios.post('http://localhost:4000/business/add',obj).then(res=>{
            console.log(res.data);
        })

        this.setState({
            person_name:'',
            business_name:'',
            business_gst_number:''
        })
        this._nameInput.focus()
    }

    render() {
        return (
        <div style={{marginTop:10}}>
            <h3>Add New Business</h3>
            <form onSubmit={this._onSubmit}>
                <div className="form-group">
                    <label>Add Person Name: </label>
                    <input type="text" 
                        className="form-control" 
                        value={this.state.person_name} 
                        onChange={this._onChangePersonName}
                        ref={ref => this._nameInput = ref }
                         />
                </div>
                <div className="form-group">
                    <label>Add Business Name: </label>
                    <input type="text" 
                        className="form-control" 
                        value={this.state.business_name} 
                        onChange={this._onChangeBusinessName} />
                </div>
                <div className="form-group">
                    <label>Add GST Number: </label>
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
