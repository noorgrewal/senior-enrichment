import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Student extends Component{
    constructor(){
        super();
        this.state={students:[]};
    }

    componentDidMount () {
        axios.get('/api/students')
        .then(res => res.data)
        .then(students => this.setState({ students }));
    }

    render() {
        const students = this.state.students;

        return (
            <div>
                <h1>Students</h1>
                <h2>List of All Students</h2>


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Student Name</th>
                            <th>Campus</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*<tr>*/}
                            {/*<td>1</td>*/}
                            {/*<td>Mark</td>*/}
                            {/*<td>Otto</td>*/}
                            {/*<td>@mdo</td>*/}
                            {/*<td>@mdo</td>*/}
                            {/*<td>something</td>*/}
                            {/*<td>x</td>*/}
                        {/*</tr>*/}

                        {
                            students.map(students => {
                                return (
                                    <tr key={students.id}>
                                        <td>{ students.id }</td>
                                        <td><Link to={`/students/${students.id}`}><img src={students.image} /></Link></td>
                                        <td><Link to={`/students/${students.id}`}>{ `${students.firstName} ${students.lastName}`}</Link></td>
                                        <td>{ students.campusId }</td>
                                        <td>{ students.email }</td>
                                        <td>{`@${students.firstName}`}</td>
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