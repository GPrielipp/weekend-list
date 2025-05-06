// form to get a depart and return date for an MO or SRC
class DateForm extends HTMLElement {
	constructor() {
		super();

		// define the form here
		const row = document.createElement('div');
		row.classList.add(['row']);

		this.appendChild(row);

		// get the date they depart
		const departsDiv = document.createElement('div');
		departsDiv.classList.add(['col-sm']);

		this.departs = document.createElement('input');
		this.departs.type = 'date';
		this.departs.id = 'departs';
		this.departs.name = 'departs';
		this.departs.classList.add(['mx-3']);

		const departsLabel = document.createElement('label');
		departsLabel.for = 'departs';
		departsLabel.innerText = 'Departs:';

		departsDiv.appendChild(departsLabel);
		departsDiv.appendChild(this.departs);

		row.appendChild(departsDiv);

		// get the date they return
		const returnsDiv = document.createElement('div');
		returnsDiv.classList.add(['col-sm']);

		this.returns = document.createElement('input');
		this.returns.type = 'date';
		this.returns.id = 'returns';
		this.returns.name = 'returns';
		this.returns.classList.add(['mx-3']);

		const returnsLabel = document.createElement('label');
		returnsLabel.for = 'returns';
		returnsLabel.innerText = 'Returns:';

		returnsDiv.appendChild(returnsLabel);
		returnsDiv.appendChild(this.returns);

		row.appendChild(returnsDiv);
	}
}
// registers the object so it can be instantiated and will show up on the page
customElements.define('date-form', DateForm);
DateForm.constructor = customElements.get('date-form');

// get input for an MO
class MOForm extends HTMLElement {
	constructor() {
		super();

		this.classList.add(['row']);

		// get the MO code
		this.code = document.createElement('input');
		this.code.type = 'text';
		this.code.placeholder = 'MO Code';
		this.code.classList.add(['col']);

		this.appendChild(this.code);

		// get the MO organization
		this.organization = document.createElement('input');
		this.organization.type = 'text';
		this.organization.placeholder = 'MO Organization';
		this.organization.classList.add(['col']);

		this.appendChild(this.organization);

		this.dateForm = new DateForm();

		this.appendChild(this.dateForm);
	}
}
customElements.define('mo-form', MOForm);
MOForm.constructor = customElements.get('mo-form');

// get input for an SRC
class SRCForm extends HTMLElement {
    constructor() {
        super();

        // get the src link
        this.link = document.createElement('input');
        this.link.type = 'text';
        this.link.placeholder = 'SRC Link';

        this.appendChild(this.link);

        // get the dates for the SRC
        this.dateForm = new DateForm();

        this.appendChild(this.dateForm);
    }
}
customElements.define('src-form', SRCForm);
SRCForm.constructor = customElements.get('src-form');

// gets input for a given day
class DayInput extends HTMLElement {
	constructor(day, callbackOnChange) {
		super();
		this.day = day;
		this.callbackOnChange = callbackOnChange;

		this.classList.add(['col']);

		// Day label
		const title = document.createElement('h3');
		title.innerText = day;
		this.appendChild(title);

		// to create a custom radio input
		this.signing = this.createInput('signing', 'Signing');
		this.weekend = this.createInput('weekend', 'Weekend');
		this.mo = this.createInput('mo', 'MO');
		this.src = this.createInput('src', 'SRC');

		this.appendChild(this.signing);
		this.appendChild(this.weekend);
		this.appendChild(this.mo);
		this.appendChild(this.src);

		this.selected = undefined;
		this.select('signing');
	}

	createInput(id, text) {
		const input = document.createElement('p');
		input.classList.add(['row-input']);
		input.id = `${id}-${this.day}`;
		input.name = id;
		input.innerText = text;

		input.addEventListener('click', (event) => {
			this.select(id);
		});

		return input;
	}

	// mark the clicked input as selected
	select(id) {
		const next = this.querySelector(`#${id}-${this.day}`);

		if (this.selected !== undefined) {
			this.selected.classList.toggle('selected');
		}

		this.selected = next;
		this.selected.classList.toggle('selected');

		this.callbackOnChange(this.getStatus());
	}

	getStatus() {
		return this.selected.name;
	}
}

customElements.define('day-input', DayInput);
DayInput.constructor = customElements.get('day-input');

// does the weekend list
class WeekendForm extends HTMLElement {
	constructor(user, longWeekend = false) {
		super();
		this.classList.add(['container']);

		// outermost dialog div
		this.modalDialog = document.createElement('div');
		this.appendChild(this.modalDialog);

		// everything gets added to this before being added to this
		this.modalContent = document.createElement('div');
		this.modalDialog.appendChild(this.modalContent);

		// header for the form
		this.modalHeader = document.createElement('div');

		const header = document.createElement('h5');
		header.innerText = 'Weekend List Entry';
		this.modalHeader.appendChild(header);

		this.modalContent.appendChild(this.modalHeader);

		// create the user info display
		this.modalBody = document.createElement('div');
		this.modalContent.appendChild(this.modalBody);

		// define the form
		this.userInfo = document.createElement('div');
		this.userInfo.classList.add(['row']);
		this.userInfo.appendChild(
			this.createCol(`<b>${user.lname}</b>, ${user.fname}`)
		);
		this.userInfo.appendChild(
			this.createCol(`PLT-SQD: <b>${user.platoon}-${user.squad}</b>`)
		);
		this.userInfo.appendChild(
			this.createCol(`Weekend count: <b>${user.weekendCount}</b>`)
		);

		this.modalBody.appendChild(this.userInfo);

		// Get the input for their status per day
		const row = document.createElement('div');
		row.classList.add('row');
		this.dayInputs = [
			new DayInput('Friday', (status) => {
				this.updateFormVisibility(status);
			}),
			new DayInput('Saturday', (status) => {
				this.updateFormVisibility(status);
			}),
		];
		if (longWeekend)
			this.dayInputs.push(
				new DayInput('Sunday', (status) => {
					this.updateFormVisibility(status);
				})
			);
		this.dayInputs.forEach((input) => {
			row.appendChild(input);
		});
		this.modalBody.appendChild(row);

		// take down the user's weekend plans
		this.plans = document.createElement('div');
		// this.plans.type = 'text';
		this.plans.contentEditable = true;
		this.plans.id = 'weekend-plans-input';
		this.plans.innerText = 'Weekend plans';
		this.plans.classList.add(['input-lg']);
		this.modalBody.appendChild(this.plans);

		// get MO information
		this.moform = new MOForm();
		this.moform.style.display = 'none';
		this.modalBody.appendChild(this.moform);

		// get SRC information
		this.srcform = new SRCForm();
		this.srcform.style.display = 'none';
		this.modalBody.appendChild(this.srcform);

		// submit/save the form
		const submitBtn = document.createElement('button');
		submitBtn.innerText = 'Save';
		submitBtn.addEventListener('click', (event) => {
			this.submit(event, this);
		});
		this.modalBody.appendChild(submitBtn);
	}

	submit(event, form) {
		// use form as if it were "this"

		console.log('Submitting the form');
		console.log('Weekend plans are:');
	}

	updateFormVisibility(status) {
		// the definition of things are a little off
		if (
			this.moform == undefined ||
			this.srcform == undefined ||
			this.dayInputs == undefined
		)
			return;

		// show the mo form
		if (status == 'mo' && this.moform.style.display == 'none') {
			this.moform.style.display = 'block';
		}
		// show the src form
		else if (status == 'src' && this.srcform.style.display == 'none') {
			this.srcform.style.display = 'block';
		}
		// hide the forms
		else {
			const moVisible = this.moform.style.display != 'none';
			const srcVisible = this.srcform.style.display != 'none';
			let moSelected = false;
			let srcSelected = false;

			this.dayInputs.forEach((input) => {
				let status = input.getStatus();
				if (status == 'mo') moSelected = true;
				else if (status == 'src') srcSelected = true;
			});

			// hide the forms
			if (moVisible && !moSelected) {
				this.moform.style.display = 'none';
			}
			if (srcVisible && !srcSelected) {
				this.srcform.style.display = 'none';
			}
		}
	}

	createCol(text) {
		const col = document.createElement('p');
		col.classList.add(['col']);
		col.innerHTML = text;
		return col;
	}
}

customElements.define('weekend-form', WeekendForm);
WeekendForm.constructor = customElements.get('weekend-form');
