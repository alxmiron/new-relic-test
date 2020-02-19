import Site from './Site';
import Host from './Host';

class Hosts {
	constructor(sitesList) {
		sitesList.forEach((siteData, index) => {
			const siteId = index + 1;
			const site = new Site(siteId, siteData);
			const siteHosts = siteData.host || [];
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
		});
	}

	getAll() {
		return Object.values(this);
	}

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
