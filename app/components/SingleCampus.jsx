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
        var styles = {
            cssFloat:'right'
        };

        return (
            <div key={ campus.id }>
                <div className="page-header">
                    <h1>Campus: { campus.name } <Link to="/campuses/new"><button type="button" className="btn btn-lg btn-primary" style={styles}>Edit</button></Link></h1>
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
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>something</td>
                                    <td className="text-right"><Link to="something"><button type="button" className="btn btn-sm btn-danger">delete</button></Link></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>something</td>
                                    <td className="text-right"><Link to="something"><button type="button" className="btn btn-sm btn-danger">delete</button></Link></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>something</td>
                                    <td className="text-right"><Link to="something"><button type="button" className="btn btn-sm btn-danger">delete</button></Link></td>
                                </tr>
                            </tbody>
                        </table>




                    </div>
                </div>
            </div>

        )
    }

}