import React from "react";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import SiginComponent from "./main/siginComponent"
import LoginComponent from "./main/loginComponent";

class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="homePage">
        <HeaderComponent />
        <div className="container">
          <div className="article">
          <SiginComponent />
           <LoginComponent />
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default HomePage;
