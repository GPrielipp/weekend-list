// gets input for a given day
class DayInput extends HTMLElement {
	constructor(day) {
		super();
		this.classList.add('col');
		const p = document.createElement('p');
		p.innerText = day;
		this.appendChild(p);
	}
}

// does the weekend list
class WeekendForm extends HTMLElement {
	constructor(user) {
		super();
		this.classList.add(['container']);
		this.tabIndex = -1;

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
		this.userInfo.appendChild(this.createCol(`${user.lname}, ${user.fname}`));
		this.userInfo.appendChild(
			this.createCol(`PLT-SQD: ${user.platoon}-${user.squad}`)
		);
		this.userInfo.appendChild(
			this.createCol(`Weekend count: ${user.weekendCount}`)
		);

		this.modalBody.appendChild(this.userInfo);

		// TODO -- new input type for the days
		const row = document.createElement('div');
		row.classList.add('row');
		this.dayInputs = [new DayInput('Friday'), new DayInput('Saturday')];
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
		const col = document.createElement('div');
		col.classList.add(['col']);
		col.innerText = text;
		return col;
	}
}

customElements.define('weekend-form', WeekendForm);
WeekendForm.constructor = customElements.get('weekend-form');

customElements.define('day-input', DayInput);
DayInput.constructor = customElements.get('day-input');
