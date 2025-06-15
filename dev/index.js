const context = new Context();

// import { WeekendForm } from './weekend-form';

// make sure this custom function is always defined
// this will remove all child nodes from any html element
if (typeof Element.prototype.clearChildren === 'undefined') {
	Object.defineProperty(Element.prototype, 'clearChildren', {
		configurable: true,
		enumerable: false,
		value: function () {
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
		const page = new ApproveViewPage(user);
		let link = createLink(page, 'Approve / View');
		navbar.appendChild(link);
	}

	if (permissions & CDO) {
		let link = createLink(null, 'CDO');
		navbar.appendChild(link);
	}
}

async function loadPage(window, event) {
	// get the user
	await context.authenticate('Andrew', 'Comlish', '261260'); // get this info from a login screen
	const user = context.getUser();

	// generate the links based on permissions
	const navbar = document.getElementById('navbar');
	generateLinks(navbar, user);

	// update the content on the page
	const container = document.getElementById('content');
	const savedHomepage = Array.from(container.childNodes); // create a copy

	// make sure the home button is able to clear the container
	const homebutton = document.getElementById('home');
	homebutton.addEventListener('click', (event) => {
		container.clearChildren();
		console.log(container);
		savedHomepage.forEach((child) => {
			container.appendChild(child);
		});
	});
}

window.addEventListener('load', loadPage);
