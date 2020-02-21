import SortedList from './SortedList';

/**
 * LimitedSortedList is like SortedList, but it keeps only limited amount of items sorted.
 * Other items are saved in unsorted heap
 */
class LimitedSortedList extends SortedList {
	/**
	 * LimitedSortedList instance constructor
	 * @param {Object} options constructor options
	 * 	limit {Number} how many items need to be sorted
	 * 	idProp {String} property name of item object, which is unique for item
	 */
	constructor({ limit, idProp, ...otherProps }) {
		super(otherProps);
		this.idProp = idProp;
		this.limit = limit;
		this.unsortedHeap = {};
	}

	/**
	 * Add item, either to sorted list or unsorted heap
	 * Time complexity: varies from O(1) (when item is saved to unsorted heap) to O(n)
	 * @param {Object} itemData
	 * @return {Void}
	 */
	add(itemData) {
		const compareProp = this.compareProp;
		const minItem = this.getMin(); // O(1)
		if (this.length + 1 > this.limit && minItem && itemData[compareProp] < minItem[compareProp]) {
			this.addToUnsortedHeap(itemData); // O(1)
			return;
		}

		SortedList.prototype.add.call(this, itemData); // O(n)
		if (this.length > this.limit) {
			const newMinItem = this.getMin(); // O(1)
			this.addToUnsortedHeap(newMinItem); // O(1)
			this.removeLast(); // O(1)
		}
	}

	/**
	 * Remove specific item, either from sorted list or unsorted heap
	 * Time complexity: varies from O(1) (when item saved in unsorted heap) to O(n)
	 * @param {String} itemId
	 * @return {Void}
	 */
	remove(itemId) {
		if (this.unsortedHeap[itemId]) {
			this.removeFromUnsortedHeap(itemId); // O(1)
			return;
		}

		const idProp = this.idProp;
		const targetNode = this.findNode(item => item[idProp] === itemId); // O(1), because sorted list is not long
		if (!targetNode) return;
		this.removeNode(targetNode); // O(1)
		const nextSortedItemData = this.getMaxFromUnsortedHeap(); // O(n)
		if (!nextSortedItemData) return;
		this.removeFromUnsortedHeap(nextSortedItemData[idProp]); // O(1)
		this.append(nextSortedItemData); // O(1)
		// We can use SortedList.append() instead of SortedList.add(),
		// because nextSortedItemData item is less than all items in sorted list for sure
	}

	/**
	 * Save item in unsorted heap
	 * Time complexity: O(1)
	 * @param {Object} itemData
	 */
	addToUnsortedHeap(itemData) {
		const id = itemData[this.idProp];
		this.unsortedHeap[id] = itemData;
	}

	/**
	 * Remove specific item from unsorted heap
	 * Time complexity: O(1)
	 * @param {String} itemId
	 */
	removeFromUnsortedHeap(itemId) {
		delete this.unsortedHeap[itemId];
	}

	/**
	 * Get max item from unsorted heap
	 * Time complexity: O(n)
	 * @return {Object} max item
	 */
	getMaxFromUnsortedHeap() {
		const compareProp = this.compareProp;
		return Object.values(this.unsortedHeap).reduce((maxItemData, itemData) => {
			if (maxItemData === undefined) return itemData;
			if (itemData[compareProp] > maxItemData[compareProp]) return itemData;
			return maxItemData;
		}, undefined);
	}
}

export default LimitedSortedList;
