import React, {Component} from 'react';
import axios from 'axios';

export default class NewCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {campus: {}};

    let formPath = this.props.history.location.pathname;
    this.formNew = (formPath === '/campuses/new');

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // if edit state, get campus data
    if (!this.formNew) {
      var campusId = this.props.match.params.campusId;
      axios.get(`/api/campuses/${campusId}`).
          then(res => res.data).
          then(campus => {
            this.setState({campus});
          });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let formObj = event.target;
    let campusName = formObj[0].value;
    let campusImage = formObj[1].value;

    if (this.formNew) {
      axios.post('/api/campuses/new', {name: campusName, image: campusImage}).
          then(() => {this.props.history.push('/campuses');});
    } else {
      let campusId = this.state.campus.id;

      campusName = (campusName === '') ? this.state.campus.name : campusName;
      campusImage = (campusImage === '')
          ? this.state.campus.image
          : campusImage;

      axios.put('/api/campuses/edit/' + campusId,
          {name: campusName, image: campusImage}).then(() => {
        this.props.history.push('/campuses/view/' + campusId);
      });
    }
  }

  render() {
    var campus = this.state.campus;
    var campusName = (this.formNew) ? 'Enter Name' : campus.name;
    var campusImage = (this.formNew) ? 'Enter Image Url' : campus.image;

    return (

        <div className="col-md-6">
          <h1>Campuses</h1>
          {
            this.formNew ? (<h2>Add New Campus</h2>) : (<h2>Edit Campus</h2>)
          }

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="campusName">Name</label>

              <input type="text" className="form-control" id="campusName"
                     aria-describedby="emailHelp"
                     defaultValue={this.formNew
                         ? ('Enter Campus Name')
                         : (campusName)}
                     placeholder={this.formNew
                         ? ('Enter Campus Name')
                         : (campusName)}
              />

            </div>
            <div className="form-group">
              <label for="campusImage">Image</label>

              <input type="text" className="form-control" id="campusImage"
                     defaultValue={this.formNew
                         ? ('https://media.wired.com/photos/5909633776f462691f012e5c/master/pass/tatooine-ft.jpg')
                         : campusImage}
                     placeholder={this.formNew
                         ? ('https://media.wired.com/photos/5909633776f462691f012e5c/master/pass/tatooine-ft.jpg')
                         : campusImage}
              />

            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

    );
  }
}