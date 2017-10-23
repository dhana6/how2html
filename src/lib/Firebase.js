import firebase from "firebase";

var config = {
	apiKey: "AIzaSyAq3DD8EE2WQ0zXujmjWy8SAXx0QZJUFxw",
	authDomain: "howtohtml-c30d7.firebaseapp.com",
	databaseURL: "https://howtohtml-c30d7.firebaseio.com",
	projectId: "howtohtml-c30d7",
	storageBucket: "howtohtml-c30d7.appspot.com",
	messagingSenderId: "732715331193"
};
firebase.initializeApp(config);
export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
