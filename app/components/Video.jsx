import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Video extends Component{
    render() {
        return (
            <div>
                <h1>Video Walkthrough <span style={{color: 'olive'}}>Senior Enrichment Project</span></h1>
                <h2>By Alice Chuang <span style={{color: 'olive'}}>Grace Hopper June 2017 Cohort</span></h2>
                <p><iframe width="660" height="415" src="https://www.youtube.com/embed/FXTl2Ou-j1I" frameborder="0" allowfullscreen></iframe></p>
                <h4><Link to="/students">Students</Link> / <Link to="/campuses">Campuses</Link></h4>
            </div>
        )
    }
}