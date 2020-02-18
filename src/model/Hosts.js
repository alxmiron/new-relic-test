import Site from './Site';
import Host from './Host';

class Hosts {
    constructor(sitesList) {
        sitesList.forEach((siteData, siteId) => {
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
            })
        })
    }

    getAll() {
        return Object.values(this);
    }

    toString() {
        return this.getAll()
            .map(host => {
                const sites = Object.values(host.sites);
                return `${host.id} (${sites.length}): ${sites.map(site => site.id).join(',')}`;
            })
            .join('\n\n');
    }
}

export default Hosts;