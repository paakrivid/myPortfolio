// view with default export

class View {
	locationText = document.querySelector(".location-text");
	dateAndTime = document.querySelector(".time");

	// render the map
	renderMap(latitude, longitude, city) {
		let map = L.map("mapid").setView([latitude, longitude], 13);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		L.marker([latitude, longitude]).addTo(map).bindPopup(city).openPopup();
	}

	// render the text below map
	renderAdressMarkup(city) {
		const userAddress =
			city === ""
				? "Error getting your location. Please refresh page and allow location..."
				: `You live somewhere in ${city}...`;

		this.locationText.textContent = userAddress;
	}

	// render the current time
	paintTimeandDate(func) {
		this.dateAndTime.innerText = func();
	}
}

const view = new View();
export default view;
