import LimitedSortedList from './LimitedSortedList';

describe('LimitedSortedList structure', () => {
	it('should not exceed limit of sorted items', () => {
		const list = new LimitedSortedList({ compareProp: 'id', limit: 3, idProp: 'id' });
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		const newItemC = { id: 3 };
		const newItemD = { id: 4 };
		list.add(newItemD);
		list.add(newItemB);
		list.add(newItemA);
		list.add(newItemC);

		const items = list.getAll();
		expect(items).toEqual([newItemD, newItemC, newItemB]);
		expect(list.getMax()).toBe(newItemD);
		expect(list.getMin()).toBe(newItemB);
	});

	it('should remove sorted item, but still return sorted list of specified length', () => {
		const list = new LimitedSortedList({ compareProp: 'id', limit: 3, idProp: 'id' });
		const newItem1 = { id: 1 };
		const newItem2 = { id: 2 };
		const newItem3 = { id: 3 };
		const newItem4 = { id: 4 };
		const newItem5 = { id: 5 };
		const newItem6 = { id: 6 };
		const newItem7 = { id: 7 };

		list.add(newItem4);
		list.add(newItem2);
		list.add(newItem1);
		list.add(newItem3);
		list.add(newItem6);
		list.add(newItem5);
		list.add(newItem7);

		const itemsA = list.getAll();
		expect(itemsA).toEqual([newItem7, newItem6, newItem5]);
		expect(list.getMax()).toBe(newItem7);
		expect(list.getMin()).toBe(newItem5);

		list.remove(7);
		list.remove(5);
		list.remove(6);

		const itemsB = list.getAll();
		expect(itemsB).toEqual([newItem4, newItem3, newItem2]);
		expect(list.getMax()).toBe(newItem4);
		expect(list.getMin()).toBe(newItem2);
	});

	it('should remove all items', () => {
		const list = new LimitedSortedList({ compareProp: 'id', limit: 3, idProp: 'id' });
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		const newItemC = { id: 3 };
		const newItemD = { id: 4 };
		list.add(newItemD);
		list.add(newItemB);
		list.add(newItemA);
		list.add(newItemC);
		list.remove(3);
		list.remove(1);
		list.remove(2);
		list.remove(4);

		const items = list.getAll();
		expect(items).toEqual([]);
		expect(list.getMax()).toBeUndefined();
		expect(list.getMin()).toBeUndefined();
	});
});
