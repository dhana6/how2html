import React from "react";
import Firebase, { auth } from "../../lib/Firebase";

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], error: "" };
  }
  componentDidMount() {
    this.loadMessages();
  }

  saveMessages = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      let value = this.textarea.value.trim();
      e.target.value = "";
      var today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dataValue = Firebase.database()
        .ref()
        .child("users")
        .orderByKey()
        .limitToLast(1);
      dataValue.on("child_added", function(snapshot) {
        var dataVal = snapshot.val();
        var names = dataVal.userName;
        var images = dataVal.profileImage;
        const dt = Firebase.database()
          .ref()
          .child("messages")
          .push()
          .set({
            name: names,
            userImage: images,
            text: value,
            timeNow: time
          });
      });
    }
  };

  loadMessages = () => {
    const readValue = Firebase.database()
      .ref()
      .child("messages");
    const setMessage = data => {
      if (data.val()) {
        let allData = data.val();
        const messages = Object.keys(allData).map(function(key) {
          return allData[key];
        });
        this.setState({ messages });
      } else {
        this.setState({ error: "Data Not Found" });
      }
    };
    readValue.limitToLast(12).on("value", setMessage);
    readValue.limitToLast(12).on("child_added", setMessage);
    readValue.limitToLast(12).on("child_changed", setMessage);
  };

  render() {
    return (
      <div className="chatwindow">
        <div className="result">
          {this.state.messages.map((message, i) => (
            <div>
              <p>{message.name}</p>
              <img src={message.userImage} />
              <p>{message.text}</p>
              <p>{message.timeNow}</p>
            </div>
          ))}
        </div>
        <textarea
          ref={n => (this.textarea = n)}
          className="chat"
          name="data"
          palceholder="send a message"
          onKeyPress={this.saveMessages}
        />
      </div>
    );
  }
}

export default ChatComponent;
