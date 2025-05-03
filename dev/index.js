const COVIEW = 0b100000;
const CoC = 0b010000;
const PLT = 0b001000;
const SQD = 0b000100;
const CDO = 0b000010;
const WEEKEND = 0b000001;

// creates a link pointing to the href and innerText
function createLink(href, text) {
	// create the link object
	let li = document.createElement('li');
	li.classList.add('nav-item');
	li.classList.add('me-3');

	let link = document.createElement('a');

	// add classes for styling
	let bootstrapClasses = ['btn', 'btn-outline-secondary'];
	bootstrapClasses.forEach((className) => {
		link.classList.add(className);
	});

	// set the href
	link.href = href;

	// set the innerText
	link.innerText = text;

	// add the link to the li
	li.appendChild(link);

	return li;
}

// adds the links to the navbar
function generateLinks(navbar, permissions) {
	/**
	 * Pages:
	 * - Weekend form: WEEKEND
	 * - CDO: CDO
	 * - CoC: COVIEW, CoC, PLT, SQD
	 */
	if (permissions & WEEKEND) {
		let link = createLink('weekend-form.php', 'Fill out the Weekend');
		navbar.appendChild(link);
	}

	if (permissions & (COVIEW | CoC | PLT | SQD)) {
		let link = createLink('coc.php', 'Approve / View');
		navbar.appendChild(link);
	}

	if (permissions & CDO) {
		let link = createLink('cdo.php', 'CDO');
		navbar.appendChild(link);
	}
}

function loadPage(window, event) {
	// load the user
	const user = {
		alpha: 265112,
		fname: 'George',
		lname: 'Prielipp',
		permissions: WEEKEND | COVIEW | CoC,
		company: 22,
		platoon: 4,
		squad: 3,
		phone: 9894924119,
		weekendCount: 12,
		spiritPasses: 0,
	};
	// generate the links based on permissions
	const navbar = document.getElementById('navbar');
	generateLinks(navbar, user.permissions);

	// update the content on the page
	const container = document.getElementById('content');

	let p = document.createElement('p');
	p.innerText = 'Loaded the user';

	container.appendChild(p);

	console.log('Loaded the user');
}

document.addEventListener('load', loadPage);

loadPage(null, null);
