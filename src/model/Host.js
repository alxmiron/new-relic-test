import LimitedSortedList from '../structures/LimitedSortedList';

class Host {
	constructor(id) {
		this.id = id;
		this.apps = new LimitedSortedList({ idProp: 'id', compareProp: 'apdex', limit: 25 });
	}

	getApps() {
		return this.apps.getAll();
	}

	addApp(app) {
		this.apps.add(app);
	}

	removeApp(appId) {
		this.apps.remove(appId);
	}
}

export default Host;
