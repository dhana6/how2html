import React from "react";
import { Redirect } from "react-router-dom";

import Firebase, { auth } from "../lib/Firebase";

import SignUpComponent from "../components/main/SignUpComponent";
import LoginComponent from "../components/main/LoginComponent";

class HomePage extends React.Component {
  constructor() {
    super();
    this.user = null;
    this.state = {
      isLoggedIn: false,
      role: "student",
      errorMsg: ""
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        var displayName = user.displayName;
        console.log(displayName);
        var email = user.email;
        var pass = user.pass;
        var image = user.photoURL;
        const ref = Firebase.database()
          .ref()
          .child("users")
          .push();
        ref.set({
          userName: displayName,
          email: email,
          profileImage: image
        });
        this.setState({ isLoggedIn: true, issignedUp: true });
      } else {
        this.setState({ isLoggedIn: false, issignedUp: false });
      }
    });
    console.dir(Firebase.auth());
  }

  onRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  signUp = (email, pass, name) => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(user => {
        console.log("Rethna");
        console.dir(user);
        this.user = user;
        user.updateProfile({
          displayName: name,
          photoURL:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
        });
      })
      .then(() => {
        alert("signup sucessfully");
        console.log(this.user.displayName + "?");
        this.setState({ isLoggedIn: true });
      })
      .catch(e => {
        console.log(this.user.displayName + "??");
        this.setState({ isLoggedIn: false, errorMsg: e.message });
      });
  };

  signIn = (email, pass) => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, pass)
      .then(userInfo => {
        console.log(userInfo);
        alert("Login Successfully");
        this.setState({ isLoggedIn: true });
      })
      .catch(e => {
        console.dir(e);
        this.setState({ isLoggedIn: false, errorMsg: e.message });
      });
  };

  render() {
    const { isLoggedIn, role } = this.state;
    if (isLoggedIn) {
      if (role == "teacher") {
        return <Redirect to="/teacher" />;
      } else {
        return <Redirect to="/student" />;
      }
    }

    return (
      <div className="homePage">
        <div className="container">
          <div className="article">
            <SignUpComponent
              signUp={this.signUp}
              errorMsg={this.state.errorMsg}
            />
            <LoginComponent
              role={this.state.role}
              errorMsg={this.state.errorMsg}
              onRoleChange={this.onRoleChange}
              signIn={this.signIn}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
