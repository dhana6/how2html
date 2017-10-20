import React from "react";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";

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
           
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default HomePage;
