import React from "react";

class LoginComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="login">
        <div class="panel-body">
          <div class="form frm-group">
           <label for="email">Email:</label>
           <input id="email" type="text" name="input" class="form-control" placeholder="Email" />
            <label for="password">PassWord:</label>
           <input id="password" type="password" name="input" class="form-control" placeholder="password" />
          
          </div>
   </div>
      </div>
    );
  }
}

export default LoginComponent;
