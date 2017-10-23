import React from "react";
import ReactDOM from "react-dom";

class TeacherMainComponent extends React.Component {
  constructor() {
    super();
  }

  handleClick = () => {
    ReactDOM.findDOMNode(this.refs.startbtn).style.display = "none";
    ReactDOM.findDOMNode(this.refs.buttons).style.display = "block";
  };

  render() {
    return (
      <div className="main">
        <button
          ref="startbtn"
          className="btn btn-primary startbtn"
          onClick={this.handleClick}
        >
          Start Session
        </button>
        <div className="buttons" ref="buttons" style={{ display: "none" }}>
          <button className="btn btn-primary pausebtn">Pause Session</button>
          <button className="btn btn-primary stopbtn">Stop Session</button>
        </div>
      </div>
    );
  }
}

export default TeacherMainComponent;
