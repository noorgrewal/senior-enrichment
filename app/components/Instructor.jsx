import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Instructor extends Component{
    constructor(){
        super();
        this.state={instructors:[]};
    }

    componentDidMount () {
        axios.get('/api/instructors')
            .then(res => res.data)
            .then(instructors => this.setState({ instructors }));
    }

    render() {
        const instructors = this.state.instructors;

        return (
            <div>
                <h1>Instructors</h1>
                <h2>List of All Instructors</h2>


                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Instructor Name</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        instructors.map(instructors => {
                            return (
                                <tr key={instructors.id}>
                                    <td>{ instructors.id }</td>
                                    <td><Link to={`/instructors/${instructors.id}`}><img src={instructors.image} /></Link></td>
                                    <td><Link to={`/instructors/${instructors.id}`}>{ instructors.name }</Link></td>
                                    <td>x</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>



            </div>
        )
    }
}