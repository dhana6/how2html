import React from "react";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import StudentMainComponent from "./main/StudentMainComponent";
import ChatComponent from "./chat/ChatComponent";

class StudentPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="teacherPage">
        <HeaderComponent />
        <div className="container">
          <div className="article">
            <StudentMainComponent />
            <ChatComponent />
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default StudentPage;
