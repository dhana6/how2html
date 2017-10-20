import React from "react";

import TeacherMainComponent from "../component/main/TeacherMainComponent";
import ChatComponent from "../component/chat/ChatComponent";

class TeacherPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="teacherPage">
        <div className="container">
          <div className="article">
            <TeacherMainComponent />
            <ChatComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherPage;
