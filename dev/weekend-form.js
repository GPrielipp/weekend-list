class WeekendForm extends HTMLElement {
	constructor(user) {
		super();
		this.user = user;
	}
}

customElements.define('weekend-form', WeekendForm);
WeekendForm.constructor = customElements.get('weekend-form');
