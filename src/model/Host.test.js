import App from './App';
import Host from './Host';

describe('Host model', () => {
	const hostId = 'b0b655c5-928a.nadia.biz';
	const appsData = [
		{
			id: '1',
			name: 'Ergonomic Plastic Hat - Kuhn LLC, Inc',
			contributors: ['Leopoldo Lakin', 'Alta Kuphal', 'Meagan Durgan', 'Tyrique Paucek', 'Natalie Pfannerstill'],
			version: 9,
			apdex: 61,
			host: ['b0b655c5-928a.nadia.biz', '95b346a0-17f4.abbigail.name'],
		},
		{
			id: '2',
			name: 'Incredible Rubber Computer - Glover, Christiansen and Hartmann, and Sons',
			contributors: ['Manuela Lind', 'Maddison Durgan IV', 'Eda Jaskolski'],
			version: 3,
			apdex: 60,
			host: ['95b346a0-17f4.abbigail.name', '9a450527-cdd9.kareem.info', 'e7bf58af-f0be.dallas.biz', '92116865-5462.conor.com'],
		},
	];

	it('should create empty host object', () => {
		const host = new Host(hostId);
		expect(host.getApps()).toEqual([]);
		expect(host.isEmpty()).toBe(true);
	});

	it('should add app to host apps collection', () => {
		const host = new Host(hostId);
		const app = new App(appsData[0].id, appsData[0]);
		host.addApp(app);

		const savedApps = host.getApps();
		expect(savedApps).toHaveLength(1);
		expect(savedApps[0]).toBe(app);
		expect(host.isEmpty()).toBe(false);
	});

	it('should remove app from host apps collection', () => {
		const host = new Host(hostId);
		const appA = new App(appsData[0].id, appsData[0]);
		const appB = new App(appsData[1].id, appsData[1]);
		host.addApp(appA);
		host.addApp(appB);
		host.removeApp(appA.id);

		const savedApps = host.getApps();
		expect(savedApps).toHaveLength(1);
		expect(savedApps[0]).toBe(appB);
		expect(host.isEmpty()).toBe(false);
	});

	it('should emit update events on apps changes, unsubscribe when done', () => {
		const host = new Host(hostId);
		const appA = new App(appsData[0].id, appsData[0]);
		const appB = new App(appsData[1].id, appsData[1]);
		const subscriptionId = 'updates';
		const eventListener = jest.fn();
		host.subscribe(subscriptionId, eventListener);

		host.addApp(appA);
		host.addApp(appB);
		host.removeApp(appA.id);
		expect(eventListener).toHaveBeenCalledTimes(3);
		expect(eventListener).toHaveBeenNthCalledWith(1, [appA]);
		expect(eventListener).toHaveBeenNthCalledWith(2, [appA, appB]);
		expect(eventListener).toHaveBeenNthCalledWith(3, [appB]);

		host.unsubscribe(subscriptionId);
		host.addApp(appA);
		host.removeApp(appB.id);
		expect(eventListener).toHaveBeenCalledTimes(3);
	});
});
