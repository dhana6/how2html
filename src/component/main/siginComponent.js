import React from "react";

class SiginComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="sigin">
          <div class="form frm-group">
           <label for="username">Name:</label>
           <input id="username" type="text" name="input" class="form-control" placeholder="Name" />
           <label for="email">Email:</label>
           <input id="email" type="text" name="input" class="form-control" placeholder="Email" />
           <label for="password">PassWord:</label>
           <input id="password" type="password" name="input" class="form-control" placeholder="password" />
           
          </div>
      </div>
    );
  }
}

export default SiginComponent;
