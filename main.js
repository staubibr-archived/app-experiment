import Core from "../app-framework/tools/core.js";

import Application from "./application.js";

Core.WaitForDocument().then(Start);

function Start() {	
	var app = new Application(document.body);
}