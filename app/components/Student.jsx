import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Student extends Component{
    render() {

        return (
            <div>
                <h1>Student</h1>
                <h2>List of students <Link to="/student/:studentId">Single Student</Link></h2>
            </div>
        )
    }
}