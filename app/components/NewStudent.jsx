import React, { Component } from 'react';
import axios from 'axios';

export default class NewStudent extends Component{
    constructor (props){
        super(props);
        this.state={student:{}};

        let formPath=this.props.history.location.pathname;
        this.formNew=(formPath==="/students/new");

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // if edit state, get student data
        if(!this.formNew){
            const studentId = this.props.match.params.studentId;
            axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                this.setState({ student: student[0] });
            });
        }
    }

    handleSubmit(e){
        e.preventDefault();

        let formObj=e.target;
        let studentFirst=formObj[0].value;
        let studentLast=formObj[1].value;
        let studentEmail=formObj[2].value;
        let studentImage=formObj[3].value;
        let studentCampus=formObj[5].value;

        // creating new student
        if(this.formNew) {
            axios({
                method: 'post',
                url: '/api/students/new',
                data: {
                    firstName: studentFirst,
                    lastName: studentLast,
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
            studentFirst=(studentFirst==='')?this.state.student.firstName:studentFirst;
            studentLast=(studentLast==='')?this.state.student.lastName:studentLast;
            studentEmail=(studentEmail==='')?this.state.student.email:studentEmail;
            studentImage=(studentImage==='')?this.state.student.image:studentImage;
            studentCampus=(studentCampus==='')?this.state.student.campusId:studentCampus;

            axios({
                method: 'put',
                url: '/api/students/edit/'+studentId,
                data: {
                    firstName: studentFirst,
                    lastName: studentLast,
                    email: studentEmail,
                    image: studentImage,
                    campusId: studentCampus
                }
            })
            .then(res =>{
                this.props.history.push('/students/'+studentId);
            });
        }
    }


    render() {
        var student=this.state.student;
        var studentFirst=(this.formNew) ? 'First Name' : student.firstName;
        var studentLast=(this.formNew) ? 'Last Name' : student.lastName;
        var studentEmail=(this.formNew) ? 'name@email.com' : student.email;
        var studentImage=(this.formNew) ? 'https://www.fillmurray.com/200/200' : student.image;
        var studentCampus=(this.formNew) ? 'Last Name' : student.campusId;

        return (
            <div key="newcamp" className="col-sm-6">

                <h1>Students</h1>
                {
                    this.formNew ?  (<h2>Add New Student</h2>) : (<h2>Edit Student</h2>)
                }

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="studentFirst">First Name</label>
                        <input type="text" className="form-control" id="studentFirst"
                               defaultValue={this.formNew ?  ('First Name') : (studentFirst)}
                               placeholder={this.formNew ?  ('First Name') : (studentFirst)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="studentLast">Last Name</label>
                        <input type="text" className="form-control" id="studentLast"
                               defaultValue={this.formNew ?  ('Last Name') : (studentLast)}
                               placeholder={this.formNew ?  ('Last Name') : (studentLast)}
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
                               defaultValue={this.formNew ?  ('https://www.fillmurray.com/200/200') : (studentImage)}
                               placeholder={this.formNew ?  ('https://www.fillmurray.com/200/200') : (studentImage)}
                        />
                    </div>
                    <div className="form-group">        
                        <label for="studentUsername">Username</label>
                        <input type="text" className="form-control" id="studentUsername"
                               defaultValue="@NAME" placeholder="Enter username"
                        />
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