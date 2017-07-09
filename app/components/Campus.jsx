import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Campus extends Component{
    render() {

        return (
            <div>
                <h1>Campus</h1>
                <h2><Link to="/campus/:campusId">Single Campus</Link></h2>
            </div>
        )
    }
}