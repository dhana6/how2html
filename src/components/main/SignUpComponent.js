import React from "react";

class SignUpComponent extends React.Component {
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

  signUp = e => {
    e.preventDefault();
    let name = this.userName.value.trim();
    let email = this.email.value.trim();
    let pass = this.password.value.trim();
    let exp = this.exp.value.trim();
    if (name == "" || email == "" || pass == "" || exp == "") {
      this.setState({ errorMsg: "Please fill all Fields." });
      return;
    }
    if (!this.validateEmail(email)) {
      this.setState({ errorMsg: "Please enter a valid Email id." });
      return;
    }
    this.props.signUp(email, pass, name);
  };

  render() {
    return (
      <div className="sigin">
        {console.log(this.state.name)}
        <form>
          <h1>SignUp</h1>
          <div className="form frm-group">
            <input
              id="username"
              type="text"
              name="username"
              ref={n => (this.userName = n)}
              className="form-control"
              placeholder="Name"
            />
            <input
              id="email"
              type="text"
              name="email"
              ref={n => (this.email = n)}
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
            <input
              id="exp"
              type="text"
              name="exp"
              ref={n => (this.exp = n)}
              className="form-control"
              placeholder="Experience"
            />
            <button
              type="submit"
              name=""
              id="register"
              onClick={this.signUp}
              className="btn btn-primary"
            >
              SigIn
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

export default SignUpComponent;
