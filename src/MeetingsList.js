import React, {Component} from 'react';
import {navigate} from '@reach/router'
import {GoTrashcan, GoListUnordered} from 'react-icons/go'
import {FaLink} from 'react-icons/fa'
import firebase from './Firebase'

class MeetingsList extends Component {

  constructor(props) {
    super(props);
  }

  deleteMeeting(e, meetingId) {
    e.preventDefault()
    const ref = firebase.database().ref(`meetings/${this.props.userID}/${meetingId}`);
    ref.remove();
  }

  render() {
    const {meetings} = this.props;
    const myMeetings = meetings.map(meeting => {
      return (
          <div className="list-group-item d-flex" key={meeting.meetingID}>
            <section className="button-grp align-self-center">
              <button title="Delete meeting" onClick={(e) => {
                this.deleteMeeting(e, meeting.meetingID)
              }} className="btn btn-sm btn-outline-secondary">
                <GoTrashcan className="mr-1"/>
              </button>
              <button title="Check in" onClick={() => {
                navigate(`/checkin/${this.props.userID}/${meeting.meetingID}`)
              }} className="btn btn-sm btn-outline-secondary">
                <FaLink className="mr-1"/>
              </button>
              <button title="Check in" onClick={() => {
                navigate(`/attendee/${this.props.userID}/${meeting.meetingID}`)
              }} className="btn btn-sm btn-outline-secondary">
                <GoListUnordered className="mr-1"/>
              </button>

            </section>
            <section className="pl-3 text-left align-self-center">
              {meeting.meetingName}
            </section>
          </div>

      );
    });
    return (
        <div>
          {myMeetings}
        </div>
    );
  }
}

export default MeetingsList;
