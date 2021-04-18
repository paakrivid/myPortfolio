// controller importing from the model and view ------ following MVC pattern
//import "/core-js/stable";
//import "/regenerator-runtime/runtime"; // to polyfill async await
//import { async } from "regenerator-runtime";

import * as model from "./model.js";
import view from "./view.js";

// if (module.hot) {
// 	module.hot.accept();
// }

// console.log("Check from Controller");

async function renderMap() {
	try {
		var position = await model.getPosition(); // wait for getPosition to complete
		const { latitude, longitude } = position.coords;
		//get user address from the lat and long
		const userAddress = await model.findAddress(latitude, longitude); // returns array of locality and full address

		view.renderMap(latitude, longitude, userAddress[0]);
		view.renderAdressMarkup(userAddress[0]);

		const weatherData = await model.getWeather(latitude, longitude);

		view.paintWeatherDetails(weatherData, userAddress[1]);
		// console.log(weatherData);
		model.getTimeAndDay();
	} catch (err) {
		console.log(err);
	}
}

function renderMapWithoutAddress() {
	view.renderMap(-37.81791509848954, 144.95581543288722);
	view.renderAdressMarkup("");
}

function keepPaintingTime() {
	view.paintTimeandDate(model.getTimeAndDay);
	setTimeout(keepPaintingTime, 1000);
}

function addEventHandler() {}
document.querySelector(".nav").addEventListener("click", function (e) {
	e.preventDefault();
	const clicked = e.target.className;
	const mainContent = document.querySelector(".maincontent");
	mainContent.innerHTML = view.renderMainContent(clicked);
	view.cssManipulater(clicked);
});

function init() {
	if (!navigator.geolocation) renderMapWithoutAddress();
	else renderMap();
	keepPaintingTime();
	addEventHandler();
}
init();
