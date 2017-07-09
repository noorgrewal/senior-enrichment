import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleStudent extends Component{
    constructor(){
        super();
        this.state={student:{}};
    }

    

    componentDidMount () {
        const studentId = this.props.match.params.studentId;
        console.log('id'.studentId);
        axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(student => {
            this.setState({ student });
        });
    }



    render() {
        const student=this.state.student;

        return (
            <div key={ student.id }>
                <div className="page-header">
                    <h1>Student: { `${student.firstName} ${student.lastName}`}</h1>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <img src={ student.image } />
                    </div>

                    <div className="col-sm-2">
                        <ul>
                            <li>{ `${student.firstName} ${student.lastName}`}</li>
                            <li>{ student.email }</li>
                            <li>{ student.campusId }</li>
                        </ul>
                    </div>

                </div>
            </div>

        )
    }

}