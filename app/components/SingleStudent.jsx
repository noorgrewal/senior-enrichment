import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleStudent extends Component{
    constructor(){
        super();
        this.state={student:[]};
    }




    componentDidMount () {
        const studentId = this.props.match.params.studentId;
        axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(student => {
            this.setState({ student });
        });
    }



    render() {
        const student=this.state.student;

        var styles = {
            cssFloat:'right'
        };

        return (
            <div>

                {
                    student.map(student => {
                        return (
                            <div key={ student.id }>
                                <div className="page-header">
                                    <h1>Student: { `${student.firstName} ${student.lastName}`} <Link to={`/students/edit/${student.id}`}><button type="button" className="btn btn-lg btn-primary" style={styles}>Edit</button></Link></h1>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <img src={ student.image } />
                                    </div>

                                    <div className="col-sm-3">
                                        <ul>
                                            <li>{ `${student.firstName} ${student.lastName}`}</li>
                                            <li>{ student.email }</li>
                                            <li><Link to={`/campuses/${student.campus.id}`}>{ student.campus.name } Campus</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        )

    }

}