// view with default export
const locationText = document.querySelector(".location-text");
const dateAndTime = document.querySelector(".time");
const curLocation = document.querySelector(".location");
const curWeather = document.querySelector(".currentWeather");
const curTemp = document.querySelector(".currentTemperature");
const curFeelsLike = document.querySelector(".feelsLike");
const curWindSpeed = document.querySelector(".windSpeed");

class View {
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

		locationText.textContent = userAddress;
	}

	// render the current time
	paintTimeandDate(func) {
		dateAndTime.innerText = func();
	}

	paintWeatherDetails(obj, location) {
		curLocation.innerText = location;
		curWeather.innerText = obj.currentWeather;
		curTemp.innerText = obj.currentTemp;
		curFeelsLike.innerText = obj.feelsLike;
		curWindSpeed.innerText = obj.windSpeed;
	}
	renderMainContent(clicked) {
		if (clicked === "edu")
			return `<div class="education">
					<p class="education-description">
						I am a self-taught developer. I learn on my own using different
						resources available in web mainly from the courses available in
						UDEMY as well as from other open resources such as youTube,
						stack-overflow, gitHub......
						<br>
						<br>
						<hr>
						<br>

						<p class="education-description">Some of the courses that I have already completed are as follow are listed below:</p>
						<br>
					</p>
					<h2>Udemy courses</h2>
						<li>The Complete JavaScript Course 2021: From Zero to Expert</li>
						<li>The Complete Web Developer in 2021: Zero to Mastery</li>
						<li>Responsive Web Design - Build RWD Websites</li>
						<li>CSS - Basicss To Advanced for Front End Development (2021)</li>
						<li>How the Internet Works & the Web Development Process</li> 
					</div> `;

		if (clicked === "prj")
			return `<div class="projects">
						<p class="projects-description">
							I have worked in the projects from the udemy courses while following the course content. It has impart me a lots of knowledge and skills in using the languages to produce the projects of various ranges such as static webpages, dynamic weppages as well as user intractive web-apps.
							<br />
							<br />
							I have started to work on some of my own projects. At present I am writing the user-stories for my own concept of projects involving food-industry.
							<br />
							<br />
							<hr>
							<br>
							Once the projects progress-this section will be updated...
						</p>
					</div>`;

		if (clicked === "exp")
			return `<div class="experience">
						<p class="experience-description">
							I am in early phase of programming. I have now limited experience which came from the courses I have taken and the current personal projects that I am involved in.
							<br />
							<br />
							With the time, I am determined to enhance my experience of programming through continouse learning and practice through various personal as well as open-source projects.
							<br />
							<br />
							<hr>
							<br>
							This section will be updated soon...
						</p>
					</div>`;

		if (clicked === "int")
			return `<div class="interest">
						<p class="interest-description">
							I am interested in web-application as well as in mobile development. 
							<br />
							<br />
							<hr>
							<br>
							This section will be updated soon...
						</p>
					</div>`;

		if (clicked === "rdm")
			return `<div class="roadmap">
						<p class="roadmap-description">
							My next step is learning React and Redux and rebuild my own projects in React.
							<br />
							<br />
							<hr>
							<br>
							This section will be updated soon...
						</p>
					</div>`;
	}
}

const view = new View();
export default view;
