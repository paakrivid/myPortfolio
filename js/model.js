// model with name exports

export function getPosition() {
	return new Promise((res, rej) => {
		//returns a position as response of the promise
		navigator.geolocation.getCurrentPosition(res, rej, {
			enableHighAccuracy: true,
		});
	});
}

//reverse geocoding---------------
export const findAddress = async function (lat, long) {
	try {
		const myAdd = await fetch(
			//`http://api.positionstack.com/v1/reverse?access_key=e8e65c2f3cb2ca74bae61924ca7e641d&query=${lat},${long}&limit=1&output=json`
			`https://eu1.locationiq.com/v1/reverse.php?key=pk.3cd98f4f1c0ee53894a4830079ec8ecf&lat=${lat}&lon=${long}&format=json`
		);

		const data = await myAdd.json();
		console.log(data);
		// const location = `${data.data[0].administrative_area}, ${data.data[0].region} ${data.data[0].postal_code}, ${data.data[0].country}`;
		const location = `${data.display_name}`;
		console.log(location);

		const locality = data.address.city;
		// console.log(locality);

		return [locality, location];
	} catch (err) {
		console.log(err);
	}
};

// set date and time
export const getTimeAndDay = function () {
	const dateObject = new Date();

	// getting date
	let year = dateObject.getFullYear();
	let month = dateObject.getMonth();
	let date = dateObject.getDate();
	let day = dateObject.getDay();

	//getting time
	let hours = dateObject.getHours();
	let minutes = dateObject.getMinutes();
	let seconds = dateObject.getSeconds();

	if (hours === 24) hours = "00";
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	const days = new Array(
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	);
	const months = new Array(
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	);
	const fullDate = `
		${days[day]}, ${date} ${months[month]} ${year}:: ${hours}:${minutes}:${seconds}`;

	// setTimeout(getTimeAndDay, 1000);

	return fullDate;
};
