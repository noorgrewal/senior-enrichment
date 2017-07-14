import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Campus extends Component {
  constructor() {
    super();
    this.state = {
      campuses: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/campuses').
        then(res => res.data).
        then(campuses => this.setState({campuses}));
  }

  handleClick(event) {
    var campusId = event.target.id;
    axios.get(`/api/campuses/${campusId}/students`).then(() => {
      axios.delete('/api/campuses/' + campusId).then(() => {
        axios.get('/api/campuses').
            then(res => res.data).
            then(campuses => this.setState({campuses}));
      });
    });
  }

  render() {
    return (
        <div>
          <div>
            <Link to="/campuses/new">
              <button type="button" className="btn btn-primary add">
                +
              </button>
            </Link>
          </div>
          <table className="table">
            <thead>
            <tr>
              <th>Campus</th>
              <th>Students</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.campuses.map(campuses => {
                return (
                    <tr key={campuses.id}>
                      <td>
                        <Link
                            to={`/campuses/view/${campuses.id}`}>{ campuses.name }</Link>
                      </td>
                      <td>{campuses.students.length}</td>
                      <td className="text-right">
                        <button type="button" className="btn btn-danger"
                                onClick={this.handleClick} id={campuses.id}>X
                        </button>
                      </td>
                    </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    );
  }
}


