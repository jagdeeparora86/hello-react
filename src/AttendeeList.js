import React, {Component} from 'react';
import {GoTrashcan, GoStar} from 'react-icons/go';
import firebase from "./Firebase";

class AttendeesList extends Component {
  constructor(props) {
    super(props);
    this.deleteAttendee = this.deleteAttendee.bind(this);
  }

  deleteAttendee(e, meetingID, attendeeID) {
    e.preventDefault();
    console.log("deleting now")

    const ref = firebase.database().ref(`/meetings/${this.props.adminUser}/${meetingID}/attendes/${attendeeID}`);
    ref.remove();
  }

  addStar(e, star, meetingID, attendeeID) {
    e.preventDefault();
    const ref = firebase.database().ref(`/meetings/${this.props.adminUser}/${meetingID}/attendes/${attendeeID}/star`);

    if (star === undefined) {
      ref.set(true)
    } else {
      ref.set(!star)
    }

  }

  render() {
    const admin =
        this.props.adminUser === this.props.userID ? true : false;
    const attendees = this.props.attendees;
    const myAttendees = attendees.map(item => {
      return (
          <div className="row justify-content-center" key={item.attendeeID}>
            <div
                className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"

            >
              <div className="card ">
                <div
                    className={
                      'card-body px-3 py-2 d-flex align-items-center ' +
                      (admin ? '' : 'justify-content-center')
                    }
                >
                  {admin && (
                      <div className="btn-group pr-2">
                        <button
                            className={"btn btn-sm " + (item.star ? 'btn-info' : 'btn-outline-secondary' )}
                            tite="Delete Attendee"
                            onClick={e =>
                                this.addStar(
                                    e,
                                    item.star,
                                    this.props.meetingID,
                                    item.attendeeID
                                )
                            }
                        >
                          <GoStar className="pr-1"/>
                        </button>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            tite="Delete Attendee"
                            onClick={e =>
                                this.deleteAttendee(
                                    e,
                                    this.props.meetingID,
                                    item.attendeeID
                                )
                            }
                        >
                          <GoTrashcan/>
                        </button>
                      </div>
                  )}

                  <div>{item.attendeeName}</div>
                </div>
              </div>
            </div>
          </div>
      );
    });

    return (
        <div>{myAttendees}</div>
    );
  }
}

export default AttendeesList;
