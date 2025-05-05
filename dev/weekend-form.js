// gets input for a given day
class DayInput extends HTMLElement {
	constructor(day, callbackOnChange) {
		super();
		this.day = day;

		this.classList.add('col');

		// Day label
		const title = document.createElement('h3');
		title.innerText = day;
		this.appendChild(title);

		// to create a custom radio input
		this.signing = this.createInput('signing', 'Signing');
		this.weekend = this.createInput('weekend', 'Weekend');
		this.MO_SRC = this.createInput('mo-src', 'MO / SRC');

		this.appendChild(this.signing);
		this.appendChild(this.weekend);
		this.appendChild(this.MO_SRC);

		this.selected = undefined;
		this.select('signing');
	}

	createInput(id, text) {
		const input = document.createElement('p');
		input.classList.add(['row-input']);
		input.id = `${id}-${this.day}`;
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
	}
}

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

		// TODO -- new input type for the days
		const row = document.createElement('div');
		row.classList.add('row');
		this.dayInputs = [new DayInput('Friday'), new DayInput('Saturday')];
		if (longWeekend) this.dayInputs.push(new DayInput('Sunday'));
		this.dayInputs.forEach((input) => {
			row.appendChild(input);
		});
		this.modalBody.appendChild(row);

		// take down the user's weekend plans
		this.plans = document.createElement('input');
		this.plans.type = 'text';
		this.plans.placeholder = 'Weekend plans';
		this.modalBody.appendChild(this.plans);

		// get MO information
		// get SRC information

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

	createCol(text) {
		const col = document.createElement('p');
		col.classList.add(['col']);
		col.innerHTML = text;
		return col;
	}
}

customElements.define('weekend-form', WeekendForm);
WeekendForm.constructor = customElements.get('weekend-form');

customElements.define('day-input', DayInput);
DayInput.constructor = customElements.get('day-input');
