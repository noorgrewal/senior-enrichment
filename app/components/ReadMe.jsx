import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ReadMe extends Component{
    render() {

        return (
            <div>
                <h1>Welcome! This web app is built on the <span style={{color: 'olive'}}>'NERP'</span> Stack!</h1>
                <p>Which means it's made up primarily of <span style={{color: 'olive'}}>Node, Express, React, and Postgres</span>.
                    <br /><span style={{color: 'olive'}}>Derp!</span> If only there was a Node equivalent that started with a 'D'.
                    <br />Or we were using DocumentDB as our NoSQL persistent DB! <span style={{color: 'olive'}}>Nerd!</span>
                </p>

                <h4>Primary Technologies</h4>
                <ul>
                    <li><a href="https://nodejs.org/" target="_blank">Node.js</a> Javascript-Based Server</li>
                    <li><a href="http://expressjs.com/" target="_blank">Express.js</a> Web App Framework for Node</li>
                    <li><a href="https://facebook.github.io/react/" target="_blank">React</a> Javascript Frontend Web App Library</li>
                    <li><a href="https://www.postgresql.org/" target="_blank">Postgres</a> with <a href="http://docs.sequelizejs.com/" target="_blank">Sequelize</a> NoSQL Persistent DB and ORM</li>
                </ul>

                <h4>Other Technologies</h4>
                <ul>
                    <li>React-Redux/React-Dom/React-Router</li>
                    <li><a href="http://getbootstrap.com/">Bootstrap</a> Frontend Responsive UI Library</li>
                    <li>Various Supporting Packages
                        <ul>
                            <li>PSQL/PG/Axios Postgres/Ajax Support</li>
                            <li>NPM/BodyParser/PATH Node/Express Support</li>
                            <li>Webpack/Babel JS Module Support</li>
                        </ul>
                    </li>
                </ul>

                <h4>Page Structure</h4>
                <ul>
                    <li>Home</li>
                    <li>Campuses
                        <ul>
                            <li>Single Campus</li>
                            <li>Add Campus</li>
                        </ul>
                    </li>
                    <li>Students
                        <ul>
                            <li>Single Student</li>
                            <li>Add Student</li>
                        </ul>
                    </li>
                    <li>ReadMe</li>
                    <li>Video</li>
                </ul>
                <Link to="/students">Students</Link> / <Link to="/campuses">Campuses</Link>
            </div>
        )
    }
}