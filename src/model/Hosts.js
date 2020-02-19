import Host from './Host';

class Hosts {
	addAppToHosts(app) {
		const appHosts = app.host || [];
		appHosts.forEach(hostId => {
			const existingHost = this[hostId];
			if (existingHost) {
				existingHost.addApp(app);
			} else {
				const host = new Host(hostId);
				host.addApp(app);
				this[host.id] = host;
			}
		});
	}

	getAll() {
		return Object.values(this);
	}

	getTopAppsByHost(hostId) {
		const host = this[hostId];
		if (!host) return undefined;
		return host.getApps();
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
