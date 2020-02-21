import Host from './Host';

class Hosts {
	/**
	 * Hosts instance constructor
	 * @param {Object?} options constructor options (optional)
	 */
	constructor({ sortedLimit = 25 } = {}) {
		this.hash = {};
		this.subscriptions = {};
		this.sortedLimit = sortedLimit;
	}

	/**
	 * Return host of specific ID
	 * @param {String} hostId
	 * @return {Host}
	 */
	get(hostId) {
		return this.hash[hostId];
	}

	/**
	 * Return all hosts
	 * @return {Host[]}
	 */
	getAll() {
		return Object.values(this.hash);
	}

	/**
	 * Return sortedLimit amount of apps by specific host
	 * Time complexity: see Host.getApps()
	 * @param {String} hostId
	 * @return {App[]}
	 */
	getTopAppsByHost(hostId) {
		const host = this.hash[hostId];
		if (!host) return [];
		return host.getApps();
	}

	/**
	 * Save app in it's hosts
	 * Time complexity: see Host.addApp()
	 * @param {App} app
	 * @return {Void}
	 */
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

	/**
	 * Remove app from it's hosts
	 * Time complexity: see Host.removeApp()
	 * @param {App} app
	 * @return {Void}
	 */
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
