import { TweakedMap } from '../TweakedMap';

interface User {
  id: number;
  name: string;
  role: string;
  age: number;
}

describe('TweakedMap', () => {
  let userMap: TweakedMap<number, User>;

  beforeEach(() => {
    userMap = new TweakedMap<number, User>([
      [1, { id: 1, name: 'John', role: 'admin', age: 30 }],
      [2, { id: 2, name: 'Jane', role: 'user', age: 25 }],
      [3, { id: 3, name: 'Bob', role: 'admin', age: 35 }]
    ]);
  });

  describe('groupBy', () => {
    it('should group items by role', () => {
      const grouped = userMap.groupBy(user => user.role);
      
      expect(grouped.get('admin')).toHaveLength(2);
      expect(grouped.get('user')).toHaveLength(1);
      expect(grouped.get('admin')![0].name).toBe('John');
    });

    it('should preserve order when option is set', () => {
      const grouped = userMap.groupBy(user => user.role, { preserveOrder: true });
      
      expect(grouped.get('admin')![0].name).toBe('John');
      expect(grouped.get('admin')![1].name).toBe('Bob');
    });
  });

  describe('filter', () => {
    it('should filter users by age', () => {
      const adults = userMap.filter(user => user.age >= 30);
      
      expect(adults.size).toBe(2);
      expect(adults.has(2)).toBe(false);
    });
  });

  describe('mapValues', () => {
    it('should transform values', () => {
      const names = userMap.mapValues(user => user.name);
      
      expect(names.get(1)).toBe('John');
      expect(names.get(2)).toBe('Jane');
    });
  });
});
