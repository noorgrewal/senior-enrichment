import React, { Component } from 'react';
import axios from 'axios';

export default class NewCampus extends Component{
    constructor(props){
        super(props);
        this.state={campus:{}};

        let formPath=this.props.history.location.pathname;
        let formNew=(formPath==="/campuses/new");
        this.formNew=formNew;

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // if in edit state get campus data
        if(!this.formNew){
            const campusId = this.props.match.params.campusId;
            axios.get(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                this.setState({ campus });
            });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("SYNTH",e.target);
        console.log("LEN",e.target[0].value,e.target[1].value);
        console.log("FORMNEW",this.formNew);

        let formObj=e.target;
        let campusName=formObj[0].value;
        let campusImage=formObj[1].value;

        // if adding new
        if(this.formNew){
            axios({
                method: 'post',
                url: '/api/campuses/new',
                data: {
                    name: campusName,
                    image: campusImage
                }
            })
            .then(res =>{
                this.props.history.push('/campuses');
            });
        }
        // if editing existing
        else{
            let campusId=this.state.campus.id;

            // handle for blanks
            campusName=(campusName==='')?this.state.campus.name:campusName;
            campusImage=(campusImage==='')?this.state.campus.image:campusImage;

            axios({
                method: 'put',
                url: '/api/campuses/edit/'+campusId,
                data: {
                    name: campusName,
                    image: campusImage
                }
            })
            .then(res =>{
                this.props.history.push('/campuses/'+campusId);
            });
        }

    }

    render() {


        var campus=this.state.campus;
        var campusName=(this.formNew) ? 'Enter Name' : campus.name;
        var campusImage=(this.formNew) ? 'Enter Image Url' : campus.image;
        console.log("RENDER",campusName);

        return (
            <div className="col-sm-6">

                <h1>Campuses</h1>
                {
                    this.formNew ?  (<h2>Add New Campus</h2>) : (<h2>Edit Campus</h2>)
                }

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="campusName">Name</label>

                        <input type="text" className="form-control" id="campusName" aria-describedby="emailHelp"
                            defaultValue={this.formNew ?  ('Enter Campus Name') : (campusName)}
                            placeholder={this.formNew ?  ('Enter Campus Name') : (campusName)}
                        />

                    </div>
                    <div className="form-group">
                        <label for="campusImage">Image</label>

                        <input type="text" className="form-control" id="campusImage"
                           defaultValue={this.formNew ?  ('Enter Campus Image Url') : campusImage}
                           placeholder={this.formNew ?  ('Enter Campus Image Url') : campusImage}
                        />

                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
}