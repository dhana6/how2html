import React from "react";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import TeacherMainComponent from "./main/TeacherMainComponent";
import ChatComponent from "./chat/ChatComponent";

class TeacherPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="teacherPage">
        <HeaderComponent />
        <div className="container">
          <div className="article">
            <TeacherMainComponent />
            <ChatComponent />
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default TeacherPage;
