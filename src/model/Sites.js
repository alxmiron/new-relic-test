class Sites {
	add(site) {
		this[site.id] = site;
	}

	remove(siteId) {
		delete this[siteId];
	}

	getAll() {
		return Object.values(this);
	}

	// For debugging:
	toString() {
		return this.getAll()
			.map(site => `${site.id}: ${site.name}`)
			.join('\n');
	}
}

export default Sites;
