import React from "react";
import { Redirect } from "react-router-dom";

import TeacherMainComponent from "../components/main/TeacherMainComponent";
import ChatComponent from "../components/chat/Chat";
import Firebase, { auth } from "../lib/Firebase";

class TeacherPage extends React.Component {
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
      .catch(function(error) {});
  };

  render() {
    return (
      <div className="teacherPage">
        <div className="containerPage">
          <div className="article">
            <button className="btn btn-primary" onClick={this.logOut}>
              Logout
            </button>

            <TeacherMainComponent />
            <ChatComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherPage;
