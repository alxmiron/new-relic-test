import LimitedSortedList from '../structures/LimitedSortedList';

class Host {
	constructor(id) {
		this.id = id;
		this.apps = new LimitedSortedList({ idProp: 'id', compareProp: 'apdex', limit: 25 });
	}

	addApp(app) {
		this.apps.add(app);
	}

	getApps() {
		return this.apps.getAll();
	}
}

export default Host;
