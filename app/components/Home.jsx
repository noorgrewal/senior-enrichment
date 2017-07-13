import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component{
    render() {

        return (
            <div>
                <h1>Welcome to the <span style={{color: 'olive'}}>Margaret Hamilton<br />
                    Interplanetary Academy <br />
                    for Javascript</span>
                </h1>
                <h2><i>Meet our illustrious <Link to="/students">Students</Link></i><br />
                    <i>Browse our beautiful <Link to="/campuses">Campuses</Link></i>
                </h2>
            </div>
        )
    }
}