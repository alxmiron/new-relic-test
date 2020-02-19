import Host from './Host';

class Hosts {
	constructor() {
		this.hash = {};
		this.subscriptions = {};
	}

	get(hostId) {
		return this.hash[hostId];
	}

	getAll() {
		return Object.values(this.hash);
	}

	getTopAppsByHost(hostId) {
		const host = this.hash[hostId];
		if (!host) return undefined;
		return host.getApps();
	}

	addAppToHosts(app) {
		app.host.forEach(hostId => {
			const existingHost = this.hash[hostId];
			if (existingHost) {
				existingHost.addApp(app);
			} else {
				const host = new Host(hostId);
				host.addApp(app);
				this.hash[host.id] = host;
				this.emitUpdateEvent();
			}
		});
	}

	removeAppFromHosts(app) {
		const appId = app.id;
		app.host.forEach(hostId => {
			const host = this.get(hostId);
			if (!host) return;
			host.removeApp(appId);
			if (host.isEmpty()) {
				delete this.hash[hostId];
				this.emitUpdateEvent();
			}
		});
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
