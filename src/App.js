import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import TeacherPage from "./container/TeacherPage";
import StudentPage from "./container/StudentPage";
import HomePage from "./container/HomePage";

const App = () => (
	<Router>
		<div>
			<HeaderComponent />
			<Route exact path="/" component={HomePage} />
			<Route exact path="/teacher" component={TeacherPage} />
			<Route path="/student" component={StudentPage} />
			<FooterComponent />
		</div>
	</Router>
);

export default App;
