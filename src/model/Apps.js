class Apps {
	get(appId) {
		return this[appId];
	}

	getAll() {
		return Object.values(this);
	}

	add(app) {
		this[app.id] = app;
	}

	remove(appId) {
		delete this[appId];
	}

	// For debugging:
	toString() {
		return this.getAll()
			.map(app => `${app.id}: ${app.name}`)
			.join('\n');
	}
}

export default Apps;
