import ListNode from './ListNode';

/**
 * Classic two-way linked list
 */
class List {
	/**
	 * List instance constructor
	 */
	constructor() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}

	/**
	 * Add item to the end of the list
	 * Time complexity: O(1)
	 * @param {<T>} itemData
	 * @return {Void}
	 */
	add(itemData) {
		const newNode = new ListNode(itemData);
		if (!this.first) this.first = newNode;
		if (this.last) {
			const prevLast = this.last;
			prevLast.next = newNode;
			newNode.prev = prevLast;
			this.last = newNode;
		} else {
			this.last = newNode;
		}
		this.length++;
	}

	/**
	 * Remove last item in the list
	 * Time complexity: O(1)
	 * @return {Void}
	 */
	removeLast() {
		if (this.last) {
			const newLast = this.last.prev;
			if (newLast) {
				newLast.next = null;
				this.last = newLast;
			} else {
				this.first = null;
				this.last = null;
			}
			this.length--;
		}
	}

	/**
	 * Return all items of the list
	 * Time complexity: O(n)
	 * @return {<T>[]} items
	 */
	getAll() {
		const result = [];
		let pointer = this.first;
		while (pointer !== null) {
			result.push(pointer.data);
			pointer = pointer.next;
		}
		return result;
	}

	/**
	 * Call func on each item of the list
	 * Time complexity: O(n)
	 * @param {Function} func
	 * @return {Void}
	 */
	forEach(func) {
		this.getAll().forEach((item, index) => func(item, index));
	}

	/**
	 * Map array of list items with func
	 * Time complexity: O(n)
	 * @param {Function} func
	 * @return {*[]} mapped array
	 */
	map(func) {
		return this.getAll().map((item, index) => func(item, index));
	}

	/**
	 * Return a specific list node by func
	 * (when func() returns true on some node - that node is returned)
	 * Time complexity: O(n)
	 * @param {Function} func
	 * @return {ListNode|undefined}
	 */
	findNode(func) {
		let pointer = this.first;
		let index = 0;
		while (pointer !== null) {
			if (func(pointer.data, index)) return pointer;
			pointer = pointer.next;
			index++;
		}
		return undefined;
	}

	/**
	 * Remove passed node from the list
	 * Time complexity: O(1)
	 * @param {ListNode} itemNode
	 * @return {Void}
	 */
	removeNode(itemNode) {
		const prevNode = itemNode.prev;
		const nextNode = itemNode.next;
		if (prevNode) {
			prevNode.next = nextNode;
		} else {
			this.first = nextNode;
		}
		if (nextNode) {
			nextNode.prev = prevNode;
		} else {
			this.last = prevNode;
		}
		this.length--;
	}

	// For debugging:
	toString() {
		return ['List:'].concat(this.map((item, idx) => `${idx}) ${item.toString()}`)).join('\n');
	}
}

export default List;
