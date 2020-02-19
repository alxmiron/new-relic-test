class Apps {
	add(app) {
		this[app.id] = app;
	}

	remove(appId) {
		delete this[appId];
	}

	getAll() {
		return Object.values(this);
	}

	// For debugging:
	toString() {
		return this.getAll()
			.map(app => `${app.id}: ${app.name}`)
			.join('\n');
	}
}

export default Apps;
