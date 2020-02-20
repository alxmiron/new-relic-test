import SortedList from './SortedList';

class LimitedSortedList extends SortedList {
	constructor(props) {
		const { limit, idProp, ...otherProps } = props;
		super(otherProps);
		this.idProp = idProp;
		this.limit = limit;
		this.unsortedHeap = {};
	}

	add(itemData) {
		const compareProp = this.compareProp;
		const minItem = this.getMin();
		if (this.length + 1 > this.limit && minItem && itemData[compareProp] < minItem[compareProp]) {
			this.addToUnsortedHeap(itemData);
			return;
		}

		SortedList.prototype.add.call(this, itemData);
		if (this.length > this.limit) {
			const newMinItem = this.getMin();
			this.addToUnsortedHeap(newMinItem);
			this.removeLast();
		}
	}

	remove(itemId) {
		if (this.unsortedHeap[itemId]) {
			this.removeFromUnsortedHeap(itemId);
			return;
		}

		const idProp = this.idProp;
		const targetNode = this.findNode(item => item[idProp] === itemId);
		if (!targetNode) return;
		this.removeNode(targetNode);
		const nextSortedItemData = this.getMaxFromUnsortedHeap();
		if (!nextSortedItemData) return;
		this.removeFromUnsortedHeap(nextSortedItemData[idProp]);
		this.append(nextSortedItemData);
	}

	addToUnsortedHeap(itemData) {
		const id = itemData[this.idProp];
		this.unsortedHeap[id] = itemData;
	}

	removeFromUnsortedHeap(itemId) {
		delete this.unsortedHeap[itemId];
	}

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
