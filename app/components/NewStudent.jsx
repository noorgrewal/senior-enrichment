import React, { Component } from 'react';

export default class NewStudent extends Component{
    render() {
        return (
            <div key="newcamp" className="col-sm-6">
                <h1>Students</h1>
                <h2>Add New Student</h2>

                <form>
                    <div className="form-group">
                        <label for="studentFirst">First Name</label>
                        <input type="text" className="form-control" id="studentFirst" value="FIRST" placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <label for="studentLast">Last Name</label>
                        <input type="text" className="form-control" id="studentLast" value="LAST" placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <label for="studentEmail">Email</label>
                        <input type="email" className="form-control" id="studentEmail" aria-describedby="emailHelp" value="NAME@email.com" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="studentImage">Image</label>
                        <input type="text" className="form-control" id="studentImage" value="https://www.fillmurray.com/100/100" placeholder="Enter image url" />
                    </div>
                    <div className="form-group">
                        <label for="studentUsername">Username</label>
                        <input type="text" className="form-control" id="studentUsername" value="@NAME" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label for="exampleSelect1">Campus</label>
                        <select className="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>
        )
    }
}