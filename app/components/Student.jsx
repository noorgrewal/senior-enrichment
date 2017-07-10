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
        var styles = {
            cssFloat:'right'
        };
        var stylesImg={
            width:'65px'
        };

        return (
            <div>
                <h1>Students</h1>
                <h2>List of All Students <Link to="/students/new"><button type="button" className="btn btn-primary" style={styles}>+ Add Student</button></Link></h2>


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            {/*<th>Photo</th>*/}
                            <th>Student Name</th>
                            <th>Campus</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th></th>
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
                                        {/*<td><Link to={`/students/${students.id}`}><img src={students.image} style={stylesImg} /></Link></td>*/}
                                        <td><Link to={`/students/${students.id}`}>{ `${students.firstName} ${students.lastName}`}</Link></td>
                                        <td><Link to={`/campuses/${students.campus.id}`}>{ students.campus.name }</Link></td>
                                        <td>{ students.email }</td>
                                        <td>{`@${students.firstName}`}</td>
                                        <td className="text-right"><Link to="something"><button type="button" className="btn btn-sm btn-danger">delete</button></Link></td>
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
