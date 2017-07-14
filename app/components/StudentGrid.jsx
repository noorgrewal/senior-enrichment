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
    console.log('clickTarg', e.target.id);
    axios({
      method: 'delete',
      url: '/api/students/' + e.target.id,
    }).then(res => {
      console.log('change state', res);

      // could not do another query on the server side
      // please see api
      axios.get('/api/students').
          then(res => res.data).
          then(students => this.setState({students}));
    });
  }

  render() {
    var students = this.state.students;
    var styles = {cssFloat: 'right'};
    var stylesImg = {width: '64px'};

    return (

        <div className="col-md-9">
          <h1>Students</h1>
          <h2>List of All Students ({students.length})
            <Link to="/students/new">
              <button type="button" className="btn btn-primary" style={styles}>+
                Add Student
              </button>
            </Link>
          </h2>


          <hr />
          {
            students.map(students => {
              return (
                  <div>
                    <div className="media" key={students.id}>
                      <div className="media-left"><Link
                          to={`/students/view/${students.id}`}><img
                          src={students.image} style={stylesImg}/> </Link></div>
                      <div className="media-body">
                        <h4 className="media-heading"><Link
                            to={`/students/view/${students.id}`}>{ `${students.firstName} ${students.lastName}`}</Link>
                          <button type="button" onClick={this.handleClick}
                                  id={students.id}
                                  className="btn btn-xs btn-danger"
                                  style={styles}>delete
                          </button>
                        </h4>
                        Campus: <Link
                          to={`/campuses/view/${students.campus.id}`}>{ students.campus.name }</Link>
                        <br />
                        Email: { students.email }
                      </div>
                    </div>
                    <hr />
                  </div>





              );
            })
          }


        </div>

    );
  }
}
