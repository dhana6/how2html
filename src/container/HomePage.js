import React from "react";
import {Redirect} from "react-router-dom";

import Firebase, { auth } from "../lib/Firebase";

import SignUpComponent from "../component/main/SignUpComponent"
import LoginComponent from "../component/main/LoginComponent";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      issignedUp: false,
      isLoggedIn: false,
      role: "student"
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var uid = user.uid;
        // this.setState({ isLoggedIn: true });
      } else {
        // this.setState({ isLoggedIn: false });
      }
    });
    console.dir(Firebase.auth());
  }

  onRoleChange = (e) => {
    this.setState({ role: e.target.value });
  }

  signUp = (email, pass) => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(user => {
        user.updateProfile({
          displayName: name
        });
      })
      .then(userInfo => {
        console.dir(userInfo);
        alert("signup sucessfully");
      })
      .catch(e => {
        alert(e.message, "signup");
      });
    this.setState({ issignedUp: true });
  };

  signIn = (email, pass) => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, pass)
      .then(userInfo => {
        console.log(userInfo);
        alert("Login Successfully");
        this.redirectUrl(userInfo);
      })
      .catch(e => {
        console.dir(e);
        alert(e.message, "signin");
      });
    this.setState({ isLoggedIn: true });
  };


  render() {
    const {issignedUp} = this.state;
    if(issignedUp){
        return <Redirect to = "/student" />
    }

    const {isLoggedIn, role} = this.state;
    if(isLoggedIn){
      if(role == "teacher"){
        return <Redirect to = "/teacher" />
      }else{
        return <Redirect to = "/student" />
      }
    }

    return (
      <div className="homePage">
        <div className="container">
          <div className="article">
           <SignUpComponent signUp = {this.signUp} />
           <LoginComponent role = {this.state.role} onRoleChange = {this.onRoleChange} signIn = {this.signIn} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
