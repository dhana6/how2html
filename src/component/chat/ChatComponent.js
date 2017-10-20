import React from "react";
import Firebase, { auth } from "../../lib/Firebase";

class ChatComponent extends React.Component {
  constructor() {
    super();
  }
   componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        var displayName = user.displayName;
        console.log(displayName)
        var email = user.email;
        console.log(email)
      } else {
      }
    });
    console.dir(Firebase.auth());
  }

  render() {
    return (
      <div className="chatwindow">
        <textarea placeholder="Send a message" className="chat" />
      </div>
    );
  }
}

export default ChatComponent;
