import LimitedSortedList from '../structures/LimitedSortedList';

class Host {
	constructor(id) {
		this.id = id;
		this.sites = new LimitedSortedList({ idProp: 'id', compareProp: 'apdex', limit: 25 });
	}

	addSite(site) {
		this.sites.add(site);
	}

	getSites() {
		return this.sites.getAll();
	}
}

export default Host;
