import React from "react";
import { Redirect } from "react-router-dom";

import StudentMainComponent from "../components/main/StudentMainComponent";
import ChatComponent from "../components/chat/Chat";
import Firebase, { auth } from "../lib/Firebase";

class StudentPage extends React.Component {
  constructor() {
    super();
  }
  logOut = e => {
    Firebase.auth()
      .signOut()
      .then(function() {
        alert("SignOut successfully");
        window.location = "/";
      })
      .catch(function(error) {
      });
  };

  render() {
    return (
      <div className="teacherPage">
        <div className="containerPage">
          <div className="article">
            <button className="btn btn-primary" onClick={this.logOut}>
              Logout
            </button>

            <StudentMainComponent />
            <ChatComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentPage;
