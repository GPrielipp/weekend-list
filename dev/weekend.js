class WeekendEntry extends HTMLElement {
	constructor(person) {
		super();

		this.person = person;
		this.person.approved = Boolean(Math.round(Math.random()));

		// add classes for this <object data="" type=""></object>
		// get approval status in coming feature

		// TODO - get the weekend entry
		this.person.weekendPlans = "something, blah blah blah. I'm so cool";

		this.isClosed = true;

		this.appendChild(this.display());
	}

	getID() {
		return this.person.ALPHA;
	}

	// take it from just a simple card to a large card full of information
	toggle() {
		this.isClosed = !this.isClosed;

		this.clearChildren();
		this.appendChild(this.display());

		return this;
	}

	display() {
		if (this.isClosed) {
			return this.createClosed();
		} else {
			return this.createOpened();
		}
	}

	// common title
	createTitle() {
		// approved feature to come
		let title = document.createElement('div');
		title.classList.add(['event-row']);

		let name = document.createElement('div');
		name.classList.add(['event-col']);
		let lname = document.createElement('b');
		lname.innerText = this.person.LAST_NAME;
		name.appendChild(lname);
		let fname = document.createElement('p');
		fname.innerText = this.person.FIRST_NAME;
		name.appendChild(fname);
		title.appendChild(name);

		let wkndCnt = document.createElement('p');
		wkndCnt.classList.add(['event-col']);
		wkndCnt.innerText = `Weekend Count: ${this.person.WEEKEND_COUNT}`;
		title.appendChild(wkndCnt);

		let img = document.createElement('img');
		img.classList.add(['status-icon']);
		img.src = `static/${this.person.approved ? 'success.png' : 'warning.png'}`;
		title.appendChild(img);

		return title;
	}

	// UI/UX for closed card
	createClosed() {
		let main = document.createElement('div');
		main.classList.add([`approved-${this.person.approved}`]);

		let title = this.createTitle();

		main.appendChild(title);

		return main;
	}

	// UI/UX for open card
	createOpened() {
		let main = document.createElement('div');
		main.classList.add([`approved-${this.person.approved}`]);

		let title = this.createTitle();
		main.appendChild(title);

		// create the approve functionality
		let row = document.createElement('p');
		row.classList.add(['event-row']);
		row.innerText = `${this.person.weekendPlans}`;

		// add an approve button to the row
		let approveBtn = document.createElement('button');
		approveBtn.innerText = `${this.person.approved ? 'Deny' : 'Approve'}`;
		approveBtn.onclick = (event) => {
			this.person.approved = !this.person.approved; // toggle if they are approved or not
		};
		row.appendChild(approveBtn);

		main.appendChild(row);

		return main;
	}
}
customElements.define('weekend-entry', WeekendEntry);
WeekendEntry.constructor = customElements.get('weekend-entry');
