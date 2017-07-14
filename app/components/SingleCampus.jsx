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
        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount () {
        var campusId = this.props.match.params.campusId;

        axios.all([
            axios.get(`/api/campuses/${campusId}`),
            axios.get(`/api/campuses/${campusId}/students`)
        ])
        .then(axios.spread((campus, students) => {
            campus=campus.data;
            students=students.data;
            this.setState({ campus, students  });
        }));
    }

    handleClick(e){
        axios({
            method: 'delete',
            url: '/api/students/'+e.target.id
        })
        .then(res =>{
            axios.get('/api/students')
            .then(res => res.data)
            .then(students => this.setState({ students }));
        });

    }

    render() {
        var campus=this.state.campus;
        var students=this.state.students;

        return (

            <div key={ campus.id }  className="col-md-12">
                <div className="page-header">
                    <h1>Campus: { campus.name } <Link to={`/campuses/edit/${campus.id}`}>
                        <button type="button" className="btn btn-lg btn-primary edit">Edit</button>
                    </Link></h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <img src={ campus.image } className="single-page-image"/>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Campus</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students.map(students => {
                                    return (
                                        <tr key={students.id}>
                                            <td><Link
                                                to={`/students/view/${students.id}`}>{ `${students.firstName} ${students.lastName}`}</Link>
                                            </td>
                                            <td><Link
                                                to={`/campuses/view/${students.campus.id}`}>{ students.campus.name }</Link>
                                            </td>
                                            <td>{ students.email }</td>
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