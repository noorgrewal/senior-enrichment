import React, { Component } from 'react';

export default class NewCampus extends Component{

    handleSubmit(e){
        e.preventDefault();
    }

    render() {
        return (
            <div key="newcamp" className="col-sm-6">

                <h1>Campuses</h1>
                <h2>Add New Campus</h2>

                <form>
                    <div className="form-group">
                        <label for="campusName">Name</label>
                        <input type="text" className="form-control" id="campusName" aria-describedby="emailHelp" value="Planet" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label for="campusImage">Image</label>
                        <input type="text" className="form-control" id="campusImage" value="https://www.fillmurray.com/200/200" placeholder="Enter image url" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>
        )
    }
}