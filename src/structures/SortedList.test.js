import SortedList from './SortedList';

describe('SortedList structure', () => {
	it('should save items sorted', () => {
		const list = new SortedList({ compareProp: 'id' });
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		const newItemC = { id: 3 };
		const newItemD = { id: 4 };
		list.add(newItemD);
		list.add(newItemB);
		list.add(newItemA);
		list.add(newItemC);

		const items = list.getAll();
		expect(items).toEqual([newItemD, newItemC, newItemB, newItemA]);
		expect(list.getMax()).toBe(newItemD);
		expect(list.getMin()).toBe(newItemA);
	});
});
