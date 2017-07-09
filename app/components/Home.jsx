import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component{
    render() {

        return (
            <div>
                <h1>Welcome to the <span style={{color: 'olive'}}>Margaret Hamilton<br />
                    Interplanetary Academy <br />
                    for Javascript</span></h1>
                <h2><Link to="/campuses/:campusId">Some Link</Link></h2>
            </div>
        )
    }
}