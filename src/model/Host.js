import LimitedSortedList from '../structures/LimitedSortedList';

class Host {
	/**
	 * Host instance constructor
	 * @param {String} id host id
	 * @param {Object} options constructor options (optional)
	 * 	sortedLimit {Number} amount of apps to be sorted
	 */
	constructor(id, { sortedLimit = 25 } = {}) {
		this.id = id;
		// We can use LimitedSortedList instead of SortedList,
		// because the tasks requires Hosts.getTopAppsByHost() to return only specific amount of sorted items, not all of them
		this.apps = new LimitedSortedList({ idProp: 'id', compareProp: 'apdex', limit: sortedLimit });
		this.subscriptions = {};
	}

	/**
	 * Return sortedLimit amount of sorted apps
	 * Time complexity: see LimitedSortedList.getAll()
	 * @return {App[]}
	 */
	getApps() {
		return this.apps.getAll();
	}

	/**
	 * Save app in host
	 * Time complexity: see LimitedSortedList.add()
	 * @param {App} app
	 * @return {Void}
	 */
	addApp(app) {
		this.apps.add(app);
		this.emitUpdateEvent();
	}

	/**
	 * Remove specific app from host
	 * Time complexity: see LimitedSortedList.remove()
	 * @param {String} appId
	 * @return {Void}
	 */
	removeApp(appId) {
		this.apps.remove(appId);
		this.emitUpdateEvent();
	}

	/**
	 * Return true if host has no apps
	 * @return {Boolean}
	 */
	isEmpty() {
		return this.apps.length === 0;
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
