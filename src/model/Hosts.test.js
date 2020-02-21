import App from './App';
import Host from './Host';
import Hosts from './Hosts';

describe('Hosts model', () => {
	const appsData = [
		{
			name: 'Ergonomic Plastic Hat - Kuhn LLC, Inc',
			contributors: ['Leopoldo Lakin', 'Alta Kuphal', 'Meagan Durgan', 'Tyrique Paucek', 'Natalie Pfannerstill'],
			version: 9,
			apdex: 61,
			host: ['b0b655c5-928a.nadia.biz', '95b346a0-17f4.abbigail.name'],
		},
		{
			name: 'Incredible Rubber Computer - Glover, Christiansen and Hartmann, and Sons',
			contributors: ['Manuela Lind', 'Maddison Durgan IV', 'Eda Jaskolski'],
			version: 3,
			apdex: 60,
			host: ['95b346a0-17f4.abbigail.name', '9a450527-cdd9.kareem.info', 'e7bf58af-f0be.dallas.biz', '92116865-5462.conor.com'],
		},
		{
			name: 'Intelligent Rubber Mouse - Herzog - Morissette, Inc',
			contributors: ['Eliane Welch', 'Lavonne Little'],
			version: 9,
			apdex: 65,
			host: ['e0419f48-6a5a.craig.info', '9a450527-cdd9.kareem.info', '128406fc-0d3f.tiana.biz', '95b346a0-17f4.abbigail.name', '7e6272f7-098e.dakota.biz'],
		},
		{
			name: 'Refined Rubber Gloves - Kuhlman, Beer and Fritsch, Group',
			contributors: ['Scotty Marks', 'Blair Howe', 'Hershel Brown Sr.', 'Marcia Ebert'],
			version: 2,
			apdex: 71,
			host: ['95b346a0-17f4.abbigail.name'],
		},
	];

	it('should create empty hosts object', () => {
		const host = new Hosts();
		expect(host.getAll()).toEqual([]);
	});

	it('should create hosts and save app in them on addAppToHosts()', () => {
		const hosts = new Hosts();
		const appA = new App(appsData[0]);
		const appB = new App(appsData[1]);
		hosts.addAppToHosts(appA);
		hosts.addAppToHosts(appB);

		const savedHosts = hosts.getAll();
		expect(savedHosts).toHaveLength(5);
		savedHosts.forEach(host => {
			expect(host).toBeInstanceOf(Host);
			const savedApps = host.getApps();
			if (host.id === 'b0b655c5-928a.nadia.biz') {
				expect(savedApps).toHaveLength(1);
				expect(savedApps[0]).toBe(appA);
			} else if (host.id === '95b346a0-17f4.abbigail.name') {
				expect(savedApps).toHaveLength(2);
				expect(savedApps[0]).toBe(appA);
				expect(savedApps[1]).toBe(appB);
			} else {
				expect(savedApps).toHaveLength(1);
				expect(savedApps[0]).toBe(appB);
			}
		});
	});

	it('should remove host on removeAppFromHosts() if there is no more apps in host', () => {
		const hosts = new Hosts();
		const appA = new App(appsData[0]);
		const appB = new App(appsData[1]);
		hosts.addAppToHosts(appA);
		hosts.addAppToHosts(appB);
		hosts.removeAppFromHosts(appA);

		const savedHosts = hosts.getAll();
		expect(savedHosts).toHaveLength(4);
		const removedHost = savedHosts.find(host => host.id === 'b0b655c5-928a.nadia.biz');
		expect(removedHost).toBeUndefined();
		const hostWithAppA = savedHosts.find(host => host.getApps().find(app => app.id === appA.id));
		expect(hostWithAppA).toBeUndefined();
	});

	it('should always return sorted apps of particular host', () => {
		const hosts = new Hosts({ sortedLimit: 2 });
		const appA = new App(appsData[0]);
		const appB = new App(appsData[1]);
		const appC = new App(appsData[2]);
		const appD = new App(appsData[3]);
		hosts.addAppToHosts(appA);
		hosts.addAppToHosts(appB);
		hosts.addAppToHosts(appC);
		hosts.addAppToHosts(appD);
		const hostId = '95b346a0-17f4.abbigail.name';

		const sortedAppsA = hosts.getTopAppsByHost(hostId);
		expect(sortedAppsA).toHaveLength(2);
		expect(sortedAppsA).toEqual([appD, appC]);

		hosts.removeAppFromHosts(appC);
		const sortedAppsB = hosts.getTopAppsByHost(hostId);
		expect(sortedAppsB).toHaveLength(2);
		expect(sortedAppsB).toEqual([appD, appA]);

		hosts.removeAppFromHosts(appD);
		const sortedAppsC = hosts.getTopAppsByHost(hostId);
		expect(sortedAppsC).toHaveLength(2);
		expect(sortedAppsC).toEqual([appA, appB]);

		hosts.removeAppFromHosts(appA);
		hosts.removeAppFromHosts(appB);
		const sortedAppsD = hosts.getTopAppsByHost(hostId);
		expect(sortedAppsD).toEqual([]);
	});

	it('should emit update events on hosts changes, unsubscribe when done', () => {
		const hosts = new Hosts();
		const appA = new App(appsData[0]);
		const appB = new App(appsData[1]);
		const appC = new App(appsData[2]);
		const subscriptionId = 'updates';
		const eventListener = jest.fn();
		hosts.subscribe(subscriptionId, eventListener);
		const expectHostsOnNthCall = (nth, hostIds) => {
			const hostsUpdate = eventListener.mock.calls[nth - 1][0];
			hostIds.forEach((hostId, index) => expect(hostsUpdate[index].id).toBe(hostId));
		};

		hosts.addAppToHosts(appA);
		hosts.addAppToHosts(appB);
		hosts.removeAppFromHosts(appA);

		expect(eventListener).toHaveBeenCalledTimes(3);
		expectHostsOnNthCall(1, ['b0b655c5-928a.nadia.biz', '95b346a0-17f4.abbigail.name']);
		expectHostsOnNthCall(2, ['b0b655c5-928a.nadia.biz', '95b346a0-17f4.abbigail.name', '9a450527-cdd9.kareem.info', 'e7bf58af-f0be.dallas.biz', '92116865-5462.conor.com']);
		expectHostsOnNthCall(3, ['95b346a0-17f4.abbigail.name', '9a450527-cdd9.kareem.info', 'e7bf58af-f0be.dallas.biz', '92116865-5462.conor.com']);

		hosts.unsubscribe(subscriptionId);
		hosts.addAppToHosts(appC);
		hosts.removeAppFromHosts(appB);
		expect(eventListener).toHaveBeenCalledTimes(3);
	});
});
