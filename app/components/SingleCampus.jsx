import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleCampus extends Component{
    constructor(){
        super();
        this.state={
            campus:{},
            students:[]
        };
    }


    componentDidMount () {
        const campusId = this.props.match.params.campusId;
        console.log('id'.campusId);

        // axios.get(`/api/campuses/${campusId}`)
        // .then(res => res.data)
        // .then(campus => {
        //     this.setState({ campus });
        // });


        axios.all([
            axios.get(`/api/campuses/${campusId}`),
            axios.get(`/api/campuses/${campusId}/students`)
        ])
        .then(axios.spread((campus, students) => {
            console.log('campus', campus.data);
            console.log('student', students.data);
            campus=campus.data;
            students=students.data;
            this.setState({ campus, students  });
        }));
    }


    render() {
        const campus=this.state.campus;
        const students=this.state.students;
        var styles = {
            cssFloat:'right'
        };

        return (
            <div key={ campus.id }>
                <div className="page-header">
                    <h1>Campus: { campus.name } <Link to="/campuses/new"><button type="button" className="btn btn-lg btn-primary" style={styles}>Edit</button></Link></h1>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <img src={ campus.image } />
                    </div>

                    <div className="col-sm-2">
                        <ul>
                            <li>{ campus.name }</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">

                        <h3>All Students in { campus.name } Campus <Link to="/students/new"><button type="button" className="btn btn-primary" style={styles}>+ Add Student</button></Link></h3>


                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Student Name</th>
                                <th>Campus</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
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
                                                <td className="text-right"><Link to="something"><button type="button" className="btn btn-sm btn-danger">delete</button></Link></td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>




                    </div>
                </div>
            </div>

        )
    }

}