import ListNode from './ListNode';
import List from './List';

/**
 * Two-way linked list of sorted items
 * Items are compared by compareProp
 */
class SortedList extends List {
	/**
	 * SortedList instance constructor
	 * @param {Object} options constructor options
	 * 	compareProp {String} property name if item object, that is used to compare items for sorting
	 */
	constructor(props) {
		const { compareProp, ...otherProps } = props;
		super(otherProps);
		this.compareProp = compareProp;
	}

	/**
	 * Put item in correct place of sorted list
	 * Time complexity: O(n)
	 * @param {Object} itemData
	 * @return {Void}
	 */
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

	/**
	 * Add item to the end of sorted list,
	 * if you are sure this item is smaller than other items in the list
	 * Time complexity: see List.add()
	 * @param {Object} itemData
	 * @return {Void}
	 */
	append(itemData) {
		List.prototype.add.call(this, itemData);
	}

	/**
	 * Get the biggest item from sorted list, if list is not empty
	 * Time complexity: O(1)
	 * @return {Object|undefined}
	 */
	getMax() {
		return this.first ? this.first.data : undefined;
	}

	/**
	 * Get the smallest item from sorted list, if list is not empty
	 * Time complexity: O(1)
	 * @return {Object|undefined}
	 */
	getMin() {
		return this.last ? this.last.data : undefined;
	}
}

export default SortedList;
