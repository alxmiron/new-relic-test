import LimitedSortedList from '../structures/LimitedSortedList';

class Host {
	constructor(id) {
		this.id = id;
		this.apps = new LimitedSortedList({ idProp: 'id', compareProp: 'apdex', limit: 25 });
		this.subscriptions = {};
	}

	getApps() {
		return this.apps.getAll();
	}

	addApp(app) {
		this.apps.add(app);
		this.emitUpdateEvent();
	}

	removeApp(appId) {
		this.apps.remove(appId);
		this.emitUpdateEvent();
	}

	isEmpty() {
		return this.length === 0;
	}

	subscribe(subscriptionId, listener) {
		this.subscriptions[subscriptionId] = listener;
	}

	unsubscribe(subscriptionId) {
		delete this.subscriptions[subscriptionId];
	}

	emitUpdateEvent() {
		const updatedValue = this.getApps();
		Object.values(this.subscriptions).forEach(listener => listener(updatedValue));
	}
}

export default Host;
