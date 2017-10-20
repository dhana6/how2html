import React from "react";

class LoginComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="login">
          <form >
          <div className="form frm-group">
           <label>Email:</label>
           <input id="email" type="text" name="input" className="form-control" placeholder="Email" />
            <label>PassWord:</label>
           <input id="password" type="password" name="input" className="form-control" placeholder="password" />
           <button type="submit" name="" id="login"  className="btn btn-primary">
           Submit
           </button>
            <button type="reset" name="" id="reset"  className="btn btn-primary">
           Reset
           </button>
           </div>
          </form>
      </div>
    );
  }
}

export default LoginComponent;
