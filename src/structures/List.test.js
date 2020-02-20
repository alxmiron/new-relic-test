import List from './List';

describe('List structure', () => {
	it('should create empty list on init', () => {
		const list = new List();
		expect(list).toHaveLength(0);
		expect(list.getAll()).toEqual([]);
	});

	it('should append new item', () => {
		const list = new List();
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		list.add(newItemA);
		list.add(newItemB);
		expect(list).toHaveLength(2);
		const items = list.getAll();
		expect(items).toHaveLength(2);
		expect(items[0]).toBe(newItemA);
		expect(items[1]).toBe(newItemB);
	});

	it('should remove last item', () => {
		const list = new List();
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		list.add(newItemA);
		list.add(newItemB);
		list.removeLast();
		expect(list).toHaveLength(1);
		const items = list.getAll();
		expect(items).toHaveLength(1);
		expect(items[0]).toBe(newItemA);
	});

	it('should support forEach()', () => {
		const list = new List();
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		const newItemC = { id: 3 };
		list.add(newItemA);
		list.add(newItemB);
		list.add(newItemC);

		const mockCallback = jest.fn();
		const result = list.forEach(mockCallback);

		expect(mockCallback).toHaveBeenCalledTimes(3);
		expect(mockCallback).toHaveBeenNthCalledWith(1, newItemA, 0);
		expect(mockCallback).toHaveBeenNthCalledWith(2, newItemB, 1);
		expect(mockCallback).toHaveBeenNthCalledWith(3, newItemC, 2);
		expect(result).toBeUndefined();
	});

	it('should support map()', () => {
		const list = new List();
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		const newItemC = { id: 3 };
		list.add(newItemA);
		list.add(newItemB);
		list.add(newItemC);

		const mockCallback = jest.fn(item => ({ ...item, id: item.id + 1 }));
		const result = list.map(mockCallback);

		expect(mockCallback).toHaveBeenCalledTimes(3);
		expect(mockCallback).toHaveBeenNthCalledWith(1, newItemA, 0);
		expect(mockCallback).toHaveBeenNthCalledWith(2, newItemB, 1);
		expect(mockCallback).toHaveBeenNthCalledWith(3, newItemC, 2);
		expect(result).toEqual([{ id: 2 }, { id: 3 }, { id: 4 }]);
	});

	it('should remove specific node', () => {
		const list = new List();
		const newItemA = { id: 1 };
		const newItemB = { id: 2 };
		const newItemC = { id: 3 };
		list.add(newItemA);
		list.add(newItemB);
		list.add(newItemC);

		const targetNode = list.findNode(item => item === newItemB);
		expect(targetNode.data).toBe(newItemB);

		list.removeNode(targetNode);
		expect(list).toHaveLength(2);
		expect(list.getAll()).toEqual([newItemA, newItemC]);
	});
});
