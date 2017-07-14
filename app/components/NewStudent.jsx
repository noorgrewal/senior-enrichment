import React, { Component } from 'react';
import axios from 'axios';

export default class NewStudent extends Component{
    constructor (props){
        super(props);
        this.state={
            campuses:[],
            student:{}
        };

        let formPath=this.props.history.location.pathname;
        this.formNew=(formPath==="/students/new");

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(!this.formNew){
            var studentId = this.props.match.params.studentId;
            axios.all([
                axios.get('/api/campuses'),
                axios.get(`/api/students/${studentId}`)
            ])
            .then(axios.spread((campuses, student) => {
                campuses=campuses.data;
                student=student.data[0];
                this.setState({ campuses, student  });
            }));

        }
        else{
            axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => this.setState({ campuses: campuses }));
        }
    }

    handleSubmit(e){
        e.preventDefault();

        let formObj=e.target;
        let firstName=formObj[0].value;
        let lastName=formObj[1].value;
        let studentEmail=formObj[2].value;
        let studentImage=formObj[3].value;
        let studentCampus=formObj[4].value;

        // creating new student
        if(this.formNew) {
            axios({
                method: 'post',
                url: '/api/students/new',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: studentEmail,
                    image: studentImage,
                    campusId: studentCampus
                }
            })
            .then(res => {
                this.props.history.push('/students');
            });
        }
        // editing existing student
        else{
            let studentId=this.state.student.id;

            // handle for blanks
            firstName=(firstName==='')?this.state.student.firstName:firstName;
            lastName=(lastName==='')?this.state.student.lastName:lastName;
            studentEmail=(studentEmail==='')?this.state.student.email:studentEmail;
            studentImage=(studentImage==='')?this.state.student.image:studentImage;
            studentCampus=(studentCampus==='')?this.state.student.campusId:studentCampus;

            axios({
                method: 'put',
                url: '/api/students/edit/'+studentId,
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: studentEmail,
                    image: studentImage,
                    campusId: studentCampus
                }
            })
            .then(res =>{
                this.props.history.push('/students/view/'+studentId);
            });
        }
    }

    render() {
        var student=this.state.student;
        var firstName=(this.formNew) ? 'First Name' : student.firstName;
        var lastName=(this.formNew) ? 'Last Name' : student.lastName;
        var studentEmail=(this.formNew) ? 'name@email.com' : student.email;
        var studentImage=(this.formNew) ? 'https://www.fillmurray.com/200/200' : student.image;
        var studentCampus=(this.formNew) ? 'Last Name' : student.campusId;
        var campuses=this.state.campuses;
        return (

            <div key="newcamp" className="col-md-6">
                <h1>Students</h1>
                {
                    this.formNew ?  (<h2>Add New Student</h2>) : (<h2>Edit Student</h2>)
                }

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" className="form-control" id="firstName"
                               defaultValue={this.formNew ?  ('First Name') : (firstName)}
                               placeholder={this.formNew ?  ('First Name') : (firstName)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName"
                               defaultValue={this.formNew ?  ('Last Name') : (lastName)}
                               placeholder={this.formNew ?  ('Last Name') : (lastName)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="studentEmail">Email</label>
                        <input type="email" className="form-control" id="studentEmail" aria-describedby="emailHelp"
                               defaultValue={this.formNew ?  ('name@email.com') : (studentEmail)}
                               placeholder={this.formNew ?  ('name@email.com') : (studentEmail)}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="studentImage">Image</label>
                        <input type="text" className="form-control" id="studentImage"
                               defaultValue={this.formNew ?  ('https://s-media-cache-ak0.pinimg.com/736x/4a/e6/61/4ae66108c1dbae2597e5d52a438d5749.jpg') : (studentImage)}
                               placeholder={this.formNew ?  ('http://lorempixel.com/200/200/nature/') : (studentImage)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleSelect1">Campus</label>
                        <select className="form-control" id="exampleSelect1">
                            {
                                campuses.map(campuses => {
                                    return (
                                        campuses.id===studentCampus ?
                                        (<option key={campuses.id} value={campuses.id} selected>{campuses.name}</option>)
                                        :
                                        (<option key={campuses.id} value={campuses.id}>{campuses.name}</option>)
                                    );
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }
}