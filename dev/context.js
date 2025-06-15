const COVIEW = 0b100000;
const CoC = 0b010000;
const PLT = 0b001000;
const SQD = 0b000100;
const CDO = 0b000010;
const WEEKEND = 0b000001;

class User {
	constructor(data) {
		// unpack the data
		this.fname = data.FIRST_NAME;
		this.lname = data.LAST_NAME;
		this.alpha = data.ALPHA;
		this.phone = data.PHONE_NUMBER;
		this.permissions = data.PERMISSIONS;
		this.company = data.COMPANY;
		this.platoon = data.PLATOON;
		this.squad = data.SQUAD;
		this.weekend_count = data.WEEKEND_COUNT;
		this.spirit_passes = data.SPIRIT_PASSES;
		this.verified = false;

		this.entries = [];
	}

	async loadEntries() {
		let level;

		if (this.permissions & (COVIEW | CoC)) {
			level = 'Company';
		} else if (this.permissions & PLT) {
			level = 'Platoon';
		} else if (this.permissions & SQD) {
			level = 'Squad';
		} else {
			throw new Error('do not have permission to load entries');
		}

		let result = await fetch('api/query.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				action: `query${level}`,
				COMPANY: this.company,
				PLATOON: this.platoon,
				SQUAD: this.squad,
				LAST: this.lname,
			}),
		})
			.then((data) => data.json())
			.then((json) => json.results);

		this.entries = result;
	}

	getEntries() {
		return this.entries;
	}

	/**
	 * load information about the user from the backend
	 */
	static async loadInfo(data) {
		if (data == undefined) return undefined;
		else {
			this.verified = true;
			let user = new User(data);
			await user.loadEntries();
			return user;
		}
	}

	/**
	 * check the backend to see if the user is good
	 */
	static async authenticate(fname, lname, alpha) {
		let data = await fetch('api/query.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				action: 'authenticate',
				FIRST: fname,
				LAST: lname,
				ALPHA: alpha,
			}),
		})
			.then((resp) => {
				if (resp.status == 200) return resp.json();
				else return undefined;
			})
			.then((json) => {
				if (json.status == 'bad_query') return undefined;
				else if (json.status == 'success') {
					// length of results should only be one
					if (json.results.length != 1) throw Exception('The query failed');
					return json.results[0];
				} else throw Exception('failed to authenticate user');
			});
		return data;
	}
}

class Context {
	constructor() {
		this.user = undefined;
	}

	/**
	 * verify a user with the backend
	 */
	async authenticate(fname, lname, alpha) {
		let val = await User.authenticate(fname, lname, alpha);
		this.user = await User.loadInfo(val);
	}

	getUser() {
		return this.user;
	}
}
