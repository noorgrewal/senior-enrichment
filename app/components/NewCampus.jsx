import React, { Component } from 'react';
import axios from 'axios';

export default class NewCampus extends Component{
    constructor(){
        super();
        this.handleSubmit=this.handleSubmit.bind();
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("SYNTH",e.target);
        console.log("LEN",e.target[0].value,e.target[1].value);

        let formObj=e.target;
        let campusName=formObj[0].value;
        let campusImg=formObj[1].value;

        // axios.post('/api/students')
        // .then(res => res.data)
        // .then(campus => this.setState({ campus }));

        axios({
            method: 'post',
            url: '/api/campuses/new',
            data: {
                name: campusName,
                image: campusImg
            }
        });
    }

    render() {
        return (
            <div key="newcamp" className="col-sm-6">

                <h1>Campuses</h1>
                <h2>Add New Campus</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="campusName">Name</label>
                        <input onChange={this.handleSubmit} type="text" className="form-control" id="campusName" aria-describedby="emailHelp" defaultValue="Planet" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label for="campusImage">Image</label>
                        <input onChange={this.handleSubmit} type="text" className="form-control" id="campusImage" defaultValue="https://www.fillmurray.com/200/200" placeholder="Enter image url" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
}