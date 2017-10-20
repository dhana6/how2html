import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import TeacherPage from "./component/teacherPage";
import StudentPage from "./component/studentPage";

const App = () => (
	<Router>
		<div>
			<Route exact path="/teacher" component={TeacherPage} />
			<Route path="/student" component={StudentPage} />
		</div>
	</Router>
);

export default App;