import ListNode from './ListNode';

class List {
	constructor() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}

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

	getAll() {
		const result = [];
		let pointer = this.first;
		while (pointer !== null) {
			result.push(pointer.data);
			pointer = pointer.next;
		}
		return result;
	}

	forEach(func) {
		this.getAll().forEach((item, index) => func(item, index));
	}

	map(func) {
		return this.getAll().map((item, index) => func(item, index));
	}

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
