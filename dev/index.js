const COVIEW = 0b100000;
const CoC = 0b010000;
const PLT = 0b001000;
const SQD = 0b000100;
const CDO = 0b000010;
const WEEKEND = 0b000001;

// import { WeekendForm } from './weekend-form';

// make sure this custom function is always defined
// this will remove all child nodes from any html element
if (typeof Element.prototype.clearChildren === 'undefined') {
	Object.defineProperty(Element.prototype, 'clearChildren', {
		configurable: true,
		enumerable: false,
		value: function() {
			while (this.firstChild) this.removeChild(this.lastChild);
		},
	});
}

// creates a link pointing to the href and innerText
function createLink(object, text) {
	// create the link object
	let li = document.createElement('li');
	li.classList.add('nav-item');
	li.classList.add('me-3');

	let link = document.createElement('button');

	// add classes for styling
	let bootstrapClasses = ['btn', 'btn-outline-secondary'];
	bootstrapClasses.forEach((className) => {
		link.classList.add(className);
	});

	// set click fall back
	link.addEventListener('click', (event) => {
		const app = document.getElementById('content');
		app.clearChildren();
		app.appendChild(object);
	});

	// set the innerText
	link.innerText = text;

	// add the link to the li
	li.appendChild(link);

	return li;
}

// adds the links to the navbar
function generateLinks(navbar, user) {
	/**
	 * Pages:
	 * - Weekend form: WEEKEND
	 * - CDO: CDO
	 * - CoC: COVIEW, CoC, PLT, SQD
	 */
	permissions = user.permissions;
	if (permissions & WEEKEND) {
		const form = new WeekendForm(user);
		let link = createLink(form, 'Fill out the Weekend');
		navbar.appendChild(link);
	}

	if (permissions & (COVIEW | CoC | PLT | SQD)) {
		let link = createLink(null, 'Approve / View');
		navbar.appendChild(link);
	}

	if (permissions & CDO) {
		let link = createLink(null, 'CDO');
		navbar.appendChild(link);
	}
}

function getUser() {
	// load the user
	const user = {
		alpha: 265112,
		fname: 'George',
		lname: 'Prielipp',
		permissions: WEEKEND | SQD | CDO,
		company: 22,
		platoon: 4,
		squad: 3,
		phone: 9894924119,
		weekendCount: 12,
		spiritPasses: 0,
	};
	return user;
}

function loadPage(window, event) {
	// get the user
	const user = getUser(); // this will come from somewhere else later
	console.log(user);

	// generate the links based on permissions
	const navbar = document.getElementById('navbar');
	generateLinks(navbar, user);

	// update the content on the page
	const container = document.getElementById('content');

	// make sure the home button is able to clear the container
	const homebutton = document.getElementById('home');
	homebutton.addEventListener('click', (event) => {
		container.clearChildren();
		const goodLoad = document.createElement('h1');
		goodLoad.innerText = 'Home button clicked';
		container.appendChild(goodLoad);
	});
}

window.addEventListener('load', loadPage);