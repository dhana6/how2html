import React from "react";
import Firebase, { auth } from "../../lib/Firebase";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: ""
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  signIn = e => {
    e.preventDefault();
    let email = this.emailid.value.trim();
    let pass = this.password.value.trim();
    if (email == "" || pass == "") {
      this.setState({ errorMsg: "Please fill all Fields." });
      return;
    }
    if (!this.validateEmail(email)) {
      this.setState({ errorMsg: "Please enter a valid Email id." });
      return;
    }
    this.props.signIn(email, pass);
  };

  render() {
    return (
      <div className="login">
        <form>
          <h1>LogIn</h1>
          <div className="form frm-group">
            <input
              id="email"
              type="text"
              name="email"
              ref={n => (this.emailid = n)}
              className="form-control"
              placeholder="Email"
            />
            <input
              id="password"
              type="password"
              ref={n => (this.password = n)}
              name="password"
              className="form-control"
              placeholder="password"
            />
            <select
              onChange={this.props.onRoleChange}
              value={this.props.role}
              className="form-control"
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
            <button
              type="submit"
              onClick={this.signIn}
              name=""
              id="login"
              className="btn btn-primary"
            >
              LogIn
            </button>
            <button type="reset" name="" id="reset" className="btn btn-primary">
              Reset
            </button>
          </div>
          {(this.state.errorMsg && <p>{this.state.errorMsg}</p>) || (
            <p>{this.props.errorMsg}</p>
          )}
        </form>
      </div>
    );
  }
}

export default LoginComponent;
