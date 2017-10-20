import React from "react";

class StudentMainComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="main">
        <button className="btn btn-primary joinbtn">Join Session</button>
      </div>
    );
  }
}

export default StudentMainComponent;
