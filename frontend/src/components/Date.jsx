import React from 'react';

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date() // Create a new Date object and assign it to the state
    };
  }

  render() {
    return (
      <div>
        <p>Current Date: {this.state.currentDate.toString()}</p>
      </div>
    );
  }
}

export default Date;