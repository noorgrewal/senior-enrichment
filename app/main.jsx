'use strict'
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import store from './store';
import Root from './components/Root';
import Home from './components/Home';
import Student from './components/Student';
import Instructor from './components/Instructor';
import Campus from './components/Campus';
import SingleCampus from './components/SingleCampus';
import SingleStudent from './components/SingleStudent';
import SingleInstructor from './components/SingleInstructor';
import NewCampus from './components/NewCampus';
import NewStudent from './components/NewStudent';
import NewInstructor from './components/NewInstructor';

render (
    <Provider store={store}>
        <Router>
            <div>



                {/* NAV BAR */}
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle NAV</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Margaret Hamilton Academy</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="active"><Link to="/">Home</Link></li>
                                <li><Link to="/campuses">Campuses</Link></li>
                                <li><Link to="/students">Students</Link></li>
                                <li><Link to="/instructors">Instructors</Link></li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li className="dropdown-header">Nav header</li>
                                        <li><a href="#">Separated link</a></li>
                                        <li><a href="#">One more separated link</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* BODY */}
                <div className="container">
                <Switch>
                    {/*<Route path="/new-playlist" render={() => <NewPlaylist addPlaylist={this.addPlaylist}/>} />*/}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/students" component={Student} />
                    <Route exact path="/campuses" component={Campus} />
                    <Route exact path="/instructors" component={Instructor} />
                    <Route exact path="/students/new" component={NewStudent} />
                    <Route exact path="/campuses/new" component={NewCampus} />
                    <Route exact path="/instructors/new" component={NewInstructor} />
                    <Route exact path="/students/:studentId" component={SingleStudent} />
                    <Route exact path="/campuses/:campusId" component={SingleCampus} />
                    <Route exact path="/instructors/:instructorId" component={SingleInstructor} />
                    <Route component={Root} />
                </Switch>
                </div>





            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);