import React, {Component} from 'react';


class Welcome extends Component {
  render() {
    const {userName, logoutUser} = this.props;
    return (
        <div className='text-center mt-4'>
          <span className='text-secondary font-weight-bold pl-1'>
            Welcome {userName}
          </span>
          <a href="/" onClick={(e)=>logoutUser(e)}  className='font-weight-bold text-primary pl-1'>
            logout
          </a>
        </div>
    );
  }
}

export default Welcome;
