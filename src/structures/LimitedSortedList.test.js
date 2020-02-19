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
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		const newItemC = { id: 3 };
		const newItemD = { id: 4 };
		list.add(newItemD);
		list.add(newItemB);
		list.add(newItemA);
		list.add(newItemC);
		list.remove(3);

		const items = list.getAll();
		expect(items).toEqual([newItemD, newItemB, newItemA]);
		expect(list.getMax()).toBe(newItemD);
		expect(list.getMin()).toBe(newItemA);
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
