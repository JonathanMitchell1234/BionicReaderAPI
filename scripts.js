const endpoint = "https://bionic-reading1.p.rapidapi.com";
let mode = "html"; // the data format I want to get back

let textContent =
	"lorem"; // the text I want to convert
const containerElement = "#bionicReadingAPI"; // the element I want to put the html in

getBionicData();

function getBionicData() {
	const encodedParams = new URLSearchParams();
	encodedParams.append("content", textContent);
	encodedParams.append("response_type", "html");
	encodedParams.append("request_type", "html");
	encodedParams.append("fixation", "1");
	encodedParams.append("saccade", "40");

	const options = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.: but we will use POST because we want to throw data to this API
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"X-RapidAPI-Host": "bionic-reading1.p.rapidapi.com", // API host
			"X-RapidAPI-Key": "1cc1c9478bmsh13249b9068e2890p174d3cjsndc9f22838b7a", // my personal API key
		},
		body: encodedParams,
	};
	let apiLink = `${endpoint}/convert`; // the assembled link to the API (usually more complex)

	fetch(apiLink, options) // fetching data from the API with the options above
		.then((res) => res.text()) // converting the data to text (html)
		.then((data) => cleanData(data)) // cleaning the data
		.then((data) => makeHTML(data)) // making the HTML
		.then((data) => renderHTML(containerElement, data)) // rendering the HTML in the DOM
		.catch((err) => console.error(err)); // logging any errors
}

function cleanData(data) {
	return data; // clean data once known what the res contajns
}

function makeHTML(data) {
	return `<p>${data}</p>`; // assemble HTML from the data
}

function renderHTML(element, data) {
	document.querySelector(element).innerHTML = data; // get the element I want to put the html in, and fill it with the data
}

// WHEN THE USER SUBMITS THE FORM WITH THEIR PREFERRED TEXT INPUT
const textForm = document.querySelector("#textForm"); // get the form
textForm.addEventListener("submit", (e) => {
	console.log("pressed");
	e.preventDefault(); // prevent the default behaviour of the form
	textContent = getValue("#textForm__content"); // get the value of the input
	getBionicData(); // get the api data
});

function getValue(element) {
	return document.querySelector(element).value; // get the value of the element
}
