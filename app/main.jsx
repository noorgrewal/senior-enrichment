'use strict'
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import store from './store';
import Root from './components/Root';
import Student from './components/Student';
import Instructor from './components/Instructor';
import Campus from './components/Campus';

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
                                <li><Link to="/campus">Campuses</Link></li>
                                <li><Link to="/student">Students</Link></li>
                                <li><Link to="/instructor">Instructors</Link></li>
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
                    {/*<Route exact path="/albums" component={StatefulAlbums} />*/}
                    {/*<Route exact path="/artists" component={AllArtists} />*/}
                    {/*<Route path="/artists/:artistId" component={SingleArtist} />*/}
                    {/*<Route path="/new-playlist" render={() => <NewPlaylist addPlaylist={this.addPlaylist}/>} />*/}
                    {/*<Route path="/playlists/:playlistId" component={Playlist} />*/}
                    <Route exact path="/student" component={Student} />
                    <Route exact path="/campus" component={Campus} />
                    <Route exact path="/instructor" component={Instructor} />
                    <Route path="/student/:studentId" component={Student} />
                    <Route path="/campuse/:campusId" component={Campus} />
                    <Route path="/instructor/:instructorId" component={Instructor} />
                    <Route component={Root} />
                </Switch>
                </div>


            </div>


        </Router>
    </Provider>,
    document.getElementById('app')
);