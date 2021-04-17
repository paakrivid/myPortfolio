// controller importing from the model and view ------ following MVC pattern
//import "/core-js/stable";
//import "/regenerator-runtime/runtime"; // to polyfill async await

import * as model from "./model.js";
import view from "./view.js";

// if (module.hot) {
// 	module.hot.accept();
// }

console.log("Check from Controller");

async function renderMap() {
	try {
		var position = await model.getPosition(); // wait for getPosition to complete
		const { latitude, longitude } = position.coords;
		//get user address from the lat and long
		const userAddress = await model.findAddress(latitude, longitude); // returns array of locality and full address

		view.renderMap(latitude, longitude, userAddress[0]);
		view.renderAdressMarkup(userAddress[0]);

		getWeather(latitude, longitude);
		model.getTimeAndDay();
	} catch (err) {
		console.log(err);
	}
}

function renderMapWithoutAddress() {
	view.renderMap(-37.81791509848954, 144.95581543288722);
	view.renderAdressMarkup("");
}

function init() {
	if (!navigator.geolocation) renderMapWithoutAddress();
	else renderMap();
	keepPaintingTime();
}

function keepPaintingTime() {
	view.paintTimeandDate(model.getTimeAndDay);
	setTimeout(keepPaintingTime, 1000);
}

const getWeather = async function (lat, long) {
	const weatherData = {};
	const rawData = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=963a52e09ec19ed6b5f8d2f2226bab2f`
	);
	const weatherRaw = await rawData.json();
	// console.log(weatherRaw);
	const location = weatherRaw;
	// console.log(weatherData);
};

init();
