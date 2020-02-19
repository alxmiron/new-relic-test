import ListNode from './ListNode';
import List from './List';

class SortedList extends List {
	constructor(props) {
		const { compareProp, ...otherProps } = props;
		super(otherProps);
		this.compareProp = compareProp;
	}

	add(itemData) {
		const compareProp = this.compareProp;
		const newNode = new ListNode(itemData);
		let pointer = this.first;
		while (pointer !== null && pointer.data[compareProp] > newNode.data[compareProp]) {
			pointer = pointer.next;
		}

		const addToEnd = pointer === null;
		const prevNode = addToEnd ? this.last : pointer.prev;
		if (prevNode) {
			prevNode.next = newNode;
			newNode.prev = prevNode;
		} else {
			this.first = newNode;
		}
		if (addToEnd) {
			this.last = newNode;
		} else {
			const movedNode = pointer;
			movedNode.prev = newNode;
			newNode.next = movedNode;
		}
		this.length++;
	}

	append(itemData) {
		List.prototype.add.call(this, itemData);
	}

	getMax() {
		return this.first ? this.first.data : undefined;
	}

	getMin() {
		return this.last ? this.last.data : undefined;
	}
}

export default SortedList;
