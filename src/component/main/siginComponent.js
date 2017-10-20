import React from "react";
import Firebase, { auth } from '../../lib/Firebase';

class SiginComponent extends React.Component {
   constructor(props) {
    super(props);
    console.log("SignIn");
    console.dir(props);
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      console.log('AUTHED:');
      console.dir(currentUser);
    });

    console.log("SignUp");
    console.dir(Firebase.auth());
  }
  
 validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
 
  signUp = (e) => {
    e.preventDefault();
    let name = this.userName.value.trim();
    let email = this.email.value.trim();
    let pass = this.password.value.trim();
    let exp = this.exp.value.trim();
    if (name == "" || email == "" || pass == "" || exp == "") {
      alert("Please fill all Fields.", 'signup')
      return;
    }
    if (!this.validateEmail(email)) {
      alert("Please Enter a valid Email.", 'signup')
      return;
    }
    
    Firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(user => {
        user.updateProfile({
          displayName: name
        })
      }).then(userInfo => {
        console.dir(userInfo);
      }).catch(e => {
        alert(e.message, 'signup');
      });
  }

  render() {
    return (
      <div className="sigin">
      <form>
          <div className="form frm-group">
           <label>Name:</label>
           <input id="username" type="text" name="input" ref = {n => this.userName = n} className="form-control" placeholder="Name" />
           <label>Email:</label>
           <input id="email" type="text" name="input" ref = {n => this.email = n} className="form-control" placeholder="Email" />
           <label>PassWord:</label>
           <input id="password" type="password"  ref = {n => this.password = n} name="input" className="form-control" placeholder="password" />
           <label>No.of.days.Exp:</label>
           <input id="exp" type="text" name="input" ref = {n => this.exp = n} className="form-control" placeholder="Experience" />
           <button type="submit" name="" id="register" onClick = {this.signUp} className="btn btn-primary">
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

export default SiginComponent;
