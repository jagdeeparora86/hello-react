import React, {Component} from 'react';
import firebase from './Firebase'
import AttendeeList from "./AttendeeList";

import {FaRedo} from 'react-icons/fa'

class Attendee extends Component {

  constructor(props) {
    super(props);
    this.state = {attendees: [], searchQuery: ""};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const attRef = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendes`);
    attRef.on('value', (data) => {
      console.log(data.val());
      const attendees = data.val();
      let attendeesList = [];

      for (let attendee in attendees) {
        attendeesList.push({
          attendeeID: attendee,
          attendeeName: attendees[attendee].attendeeName,
          attendeeEmail: attendees[attendee].attendeeEmail,
          star: attendees[attendee].star
        })
      }

      this.setState({attendees: attendeesList, noOfAttendees: attendeesList.length});
      console.log(this.state);

    })
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({[itemName]: itemValue});
  }

  render() {

    const dataFilter = (item) => item.attendeeName.toLowerCase().match(this.state.searchQuery.toLowerCase()) && true;

    const filteredAttendes = this.state.attendees.filter(dataFilter);

    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="font-weight-light text-center">
                Attendees
              </h1>
              <div className="card bg-light mb-4">
                <div className="card-body text-center">
                  <div className="input-group input-group-lg"><input type="text" name="searchQuery"
                                                                     value={this.state.searchQuery}
                                                                     className={"form-control"}
                                                                     placeholder="Search Attendees"
                                                                     onChange={this.handleChange}/>
                    <div className="input-group-append">
                      <button className="btn btn-sm btn-outline-info" onClick={() => this.setState({searchQuery: ""})}>
                        <FaRedo className="pr-1"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AttendeeList userID={this.props.userID} adminUser={this.props.adminUser} meetingID={this.props.meetingID}
                        attendees={filteredAttendes}/>
        </div>
    );
  }
}

export default Attendee;
