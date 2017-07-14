import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Student from './Student';
import Campus from './Campus';
import NewStudent from './NewStudent';
import NewCampus from './NewCampus';
import Home from './Home';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';

export default class Root extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/students" component={Student}/>
              <Route exact path="/campuses" component={Campus}/>
              <Route exact path="/students/new" component={NewStudent}/>
              <Route exact path="/campuses/new" component={NewCampus}/>
              <Route exact path="/students/edit/:studentId"
                     component={NewStudent}/>
              <Route exact path="/campuses/edit/:campusId"
                     component={NewCampus}/>
              <Route exact path="/students/view/:studentId"
                     component={SingleStudent}/>
              <Route exact path="/campuses/view/:campusId"
                     component={SingleCampus}/>
            </Switch>
          </div>
        </Router>
    );
  }
}