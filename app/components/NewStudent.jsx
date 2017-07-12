import React, { Component } from 'react';
import axios from 'axios';

export default class NewStudent extends Component{
    constructor (){
        super();
        this.state={formData:{}};

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("SYNTH",e.target);
        console.log("CLO",e.target[5].value);

        let formObj=e.target;
        let studentFirst=formObj[0].value;
        let studentLast=formObj[1].value;
        let studentEmail=formObj[2].value;
        let studentImage=formObj[3].value;
        let studentCampus=formObj[5].value;

        axios({
            method: 'post',
            url: '/api/students/new',
            data: {
                firstName: studentFirst,
                lastName: studentLast,
                email: studentEmail,
                image: studentImage,
                campusId: studentCampus
            }
        })
        .then(res =>{
            this.props.history.push('/students');
        });
    }


    render() {
        return (
            <div key="newcamp" className="col-sm-6">
                <h1>Students</h1>
                <h2>Add New Student</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="studentFirst">First Name</label>
                        <input type="text" className="form-control" id="studentFirst" defaultValue="FIRST" placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <label for="studentLast">Last Name</label>
                        <input type="text" className="form-control" id="studentLast" defaultValue="LAST" placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <label for="studentEmail">Email</label>
                        <input type="email" className="form-control" id="studentEmail" aria-describedby="emailHelp" defaultValue="NAME@email.com" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="studentImage">Image</label>
                        <input type="text" className="form-control" id="studentImage" defaultValue="https://www.fillmurray.com/100/100" placeholder="Enter image url" />
                    </div>
                    <div className="form-group">
                        <label for="studentUsername">Username</label>
                        <input type="text" className="form-control" id="studentUsername" defaultValue="@NAME" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label for="exampleSelect1">Campus</label>
                        <select className="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>
        )
    }
}