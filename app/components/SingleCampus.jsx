import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleCampus extends Component{
    constructor(){
        super();
        this.state={campus:{}};
    }



    componentDidMount () {
        const campusId = this.props.match.params.campusId;
        console.log('id'.campusId);
        axios.get(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                this.setState({ campus });
            });
    }



    render() {
        const campus=this.state.campus;

        return (
            <div key={ campus.id }>
                <div className="page-header">
                    <h1>Campus: { campus.name }</h1>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <img src={ campus.image } />
                    </div>

                    <div className="col-sm-2">
                        <ul>
                            <li>{ campus.name }</li>
                        </ul>
                    </div>

                </div>
            </div>

        )
    }

}