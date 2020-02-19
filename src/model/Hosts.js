import Host from './Host';

class Hosts {
	addAppToHosts(site) {
		const siteHosts = site.host || [];
		siteHosts.forEach(hostId => {
			const existingHost = this[hostId];
			if (existingHost) {
				existingHost.addSite(site);
			} else {
				const host = new Host(hostId);
				host.addSite(site);
				this[host.id] = host;
			}
		});
	}

	getAll() {
		return Object.values(this);
	}

	// For debugging:
	toString() {
		return this.getAll()
			.map(host => {
				const sites = host.getSites();
				return `${host.id} (${sites.length}): ${sites.map(site => `id:${site.id},apdex:${site.apdex}}`).join(', ')}`;
			})
			.join('\n\n');
	}
}

export default Hosts;
