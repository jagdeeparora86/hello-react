import React, {Component} from 'react';
import {navigate} from '@reach/router'
import firebase from './Firebase'


class Checkin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({[itemName]: itemValue});
  }

  handleSubmit(e) {
    e.preventDefault();
    const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendes`);
    ref.push({
      attendeeName: this.state.displayName,
      attendeeEmail: this.state.email,
      star: false
    });
    navigate(`/attendee/${this.props.userID}/${this.props.meetingID}`)

  }

  render() {
    return (
        <form className="mt-3" onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card bg-light">
                  <div className="card-body">
                    <h3 className="font-weight-light mb-3">Check in</h3>
                    <section className="form-group">
                      <label
                          className="form-control-label sr-only"
                          htmlFor="displayName"
                      >
                        Name
                      </label>
                      <input
                          value={this.state.displayName}
                          onChange={this.handleChange}
                          required
                          className="form-control"
                          type="text"
                          id="displayName"
                          name="displayName"
                          placeholder="Name"
                      />
                    </section>
                    <section className="form-group">
                      <label
                          className="form-control-label sr-only"
                          htmlFor="Email"
                      >
                        Email
                      </label>
                      <input value={this.state.email} onChange={this.handleChange}
                          required
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                      />
                    </section>
                    <div className="form-group text-right mb-0">
                      <button className="btn btn-primary" type="submit">
                        Check in
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
  );
  }


}


export default Checkin;

