import Host from './Host';

class Hosts {
	constructor({ sortedLimit = 25 } = {}) {
		this.hash = {};
		this.subscriptions = {};
		this.sortedLimit = sortedLimit;
	}

	get(hostId) {
		return this.hash[hostId];
	}

	getAll() {
		return Object.values(this.hash);
	}

	getTopAppsByHost(hostId) {
		const host = this.hash[hostId];
		if (!host) return [];
		return host.getApps();
	}

	addAppToHosts(app) {
		const prevLength = Object.keys(this.hash).length;
		app.host.forEach(hostId => {
			const existingHost = this.hash[hostId];
			if (existingHost) {
				existingHost.addApp(app);
			} else {
				const host = new Host(hostId, { sortedLimit: this.sortedLimit });
				host.addApp(app);
				this.hash[host.id] = host;
			}
		});
		const newLength = Object.keys(this.hash).length;
		if (prevLength !== newLength) this.emitUpdateEvent();
	}

	removeAppFromHosts(app) {
		const prevLength = Object.keys(this.hash).length;
		const appId = app.id;
		app.host.forEach(hostId => {
			const host = this.get(hostId);
			if (!host) return;
			host.removeApp(appId);
			if (host.isEmpty()) {
				delete this.hash[hostId];
			}
		});
		const newLength = Object.keys(this.hash).length;
		if (prevLength !== newLength) this.emitUpdateEvent();
	}

	subscribe(subscriptionId, listener) {
		this.subscriptions[subscriptionId] = listener;
	}

	unsubscribe(subscriptionId) {
		delete this.subscriptions[subscriptionId];
	}

	emitUpdateEvent() {
		const updatedValue = this.getAll();
		Object.values(this.subscriptions).forEach(listener => listener(updatedValue));
	}

	// For debugging:
	toString() {
		return this.getAll()
			.map(host => {
				const apps = host.getApps();
				return `${host.id} (${apps.length}): ${apps.map(app => `id:${app.id},apdex:${app.apdex}}`).join(', ')}`;
			})
			.join('\n\n');
	}
}

export default Hosts;
