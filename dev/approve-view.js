class ApproveViewPage extends HTMLElement {
	constructor(user) {
		super();

		// add classes for this object

		// get the data from the user
		this.entries = user
			.getEntries()
			.map((entry) => {
				// makes it so the user cannot approve themself (it has to be someone higher than them)
				if (entry.ALPHA != user.alpha) {
					return new WeekendEntry(entry);
				}
				return undefined;
			})
			.filter((entry) => {
				return entry !== undefined;
			});
		this.expandedEntry = undefined;

		// add click event listeners
		this.entries.forEach((entry) => {
			entry.addEventListener('click', () => {
				this.expandEntry(entry);
			});
		});

		// add all of the entries
		this.displayAll();
	}

	displayAll() {
		// empty the page and put all cards on the screen
		this.clearChildren();

		this.entries.forEach((entry) => {
			this.appendChild(entry);
		});
	}

	expandEntry(entry) {
		// empty the page
		this.clearChildren();

		// close the current card
		if (this.expandedEntry != undefined) {
			this.expandedEntry.toggle();

			// if it's the open card that was clicked,
			// then close it and display all closed cards
			if (this.expandedEntry.getID() == entry.getID()) {
				this.expandedEntry = undefined;
				this.displayAll();
				return;
			}
		}

		// otherwise expand the new card and display it
		this.expandedEntry = entry.toggle();
		this.appendChild(this.expandedEntry);
	}
}
customElements.define('approve-view', ApproveViewPage);
ApproveViewPage.constructor = customElements.get('approve-view');
