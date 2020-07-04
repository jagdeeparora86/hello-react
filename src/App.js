// Import React
import React, {Component} from 'react';
import {Router, navigate} from '@reach/router'
import firebase from './Firebase'

import Home from './Home';
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Mettings";
import Register from "./Register";
import Checkin from "./Checkin";
import Attendee from "./Attendee";

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
    this.registerUser = this.registerUser.bind(this);
    this.addMeeting = this.addMeeting.bind(this);
  }

  componentDidMount() {
    //fetching user data from firebase.
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        const meetingsRef = firebase.database().ref(`meetings/` + FBUser.uid);
        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let meeting in meetings) {
            meetingsList.push({
              meetingID: meeting,
              meetingName: meetings[meeting].meetingName
            });
          }
          this.setState({meetings: meetingsList, noOfMeetings: meetingsList.length});

        })
      } else {
        this.setState({user: null});
      }
    })
  }

  registerUser(userName) {
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: userName,
          userID: FBUser.uid
        })
      })
    });
    navigate('/meetings');
  }

  logoutUser = (e) => {
    e.preventDefault()
    this.setState({
      displayName: null,
      user: null,
      userID: null
    });

    firebase.auth().signOut().then(() => {
      navigate('/login');
    })
  };

  addMeeting(meetingName) {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({meetingName: meetingName});
  }

  render() {
    return (
        <div>
          <Navigation logoutUser={this.logoutUser} user={this.state.displayName}/>
          {this.state.user && (
              <Welcome logoutUser={this.logoutUser} userName={this.state.displayName}/>
          )}
          <Router>
            <Home path='/' user={this.state.user}/>
            <Login path='/login'/>
            <Meetings meetings={this.state.meetings} userID={this.state.userID} addMeeting={this.addMeeting} path='/meetings'/>
            <Register path='/register' registerUser={this.registerUser}/>
            <Checkin path='/checkin/:userID/:meetingID'/>
            <Attendee path='/attendee/:userID/:meetingID' adminUser={this.state.userID}/>
          </Router>
        </div>
    );
  }
}

export default App;
