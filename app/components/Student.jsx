import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Student extends Component {
  constructor() {
    super();
    this.state = {students: []};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/students').
        then(res => res.data).
        then(students => this.setState({students}));
  }

  handleClick(e) {
    axios({
      method: 'delete',
      url: '/api/students/' + e.target.id,
    }).then(res => {
      console.log('change state', res);
      axios.get('/api/students').
          then(res => res.data).
          then(students => this.setState({students}));
    });
  }

  render() {
    var students = this.state.students;

    return (

        <div className="col-md-12">
          <div>
            <Link to="/students/new">
              <button type="button" className="btn btn-primary add">+</button>
            </Link>
          </div>
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
                      <td className="text-right">
                        <button type="button" onClick={this.handleClick}
                                id={students.id}
                                className="btn btn-xs btn-danger">X
                        </button>
                      </td>
                    </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>

    );
  }
}
