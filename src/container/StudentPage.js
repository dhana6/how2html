import React from "react";

import StudentMainComponent from "../component/main/StudentMainComponent";
import ChatComponent from "../component/chat/ChatComponent";

class StudentPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="teacherPage">
        <div className="container">
          <div className="article">
            <StudentMainComponent />
            <ChatComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentPage;
