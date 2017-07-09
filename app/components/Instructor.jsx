import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Instructor extends Component{
    render() {

        return (
            <div>
                <h1>Instructor</h1>
                <h2><Link to="/instructor/:instructorId">Single Instructor</Link></h2>
            </div>
        )
    }
}