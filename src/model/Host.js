class Host {
	constructor(id) {
		this.id = id;
		this.sites = {};
	}

	addSite(site) {
		this.sites[site.id] = site;
	}
}

export default Host;
