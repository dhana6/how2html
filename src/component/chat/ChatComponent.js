import React from "react";

class ChatComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatwindow">
        <textarea placeholder="Send a message" />
      </div>
    );
  }
}

export default ChatComponent;
