import React from "react";
import { render } from "react-dom";
import App from "./App";

import "./styles/style.css";

const Main = () => (
	<div className="rootComp">
		<App />
	</div>
);

render(<Main />, document.getElementById("root"));
