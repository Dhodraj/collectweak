import { TweakedSet } from '../TweakedSet';

describe('TweakedSet', () => {
  let set1: TweakedSet<number>;
  let set2: TweakedSet<number>;

  beforeEach(() => {
    set1 = new TweakedSet([1, 2, 3, 4]);
    set2 = new TweakedSet([3, 4, 5, 6]);
  });

  describe('set operations', () => {
    it('should perform union correctly', () => {
      const union = set1.union(set2);
      expect([...union].sort()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should perform intersection correctly', () => {
      const intersection = set1.intersection(set2);
      expect([...intersection].sort()).toEqual([3, 4]);
    });

    it('should perform difference correctly', () => {
      const difference = set1.difference(set2);
      expect([...difference].sort()).toEqual([1, 2]);
    });
  });

  describe('partition', () => {
    it('should partition numbers into even and odd', () => {
      const [evens, odds] = set1.partition(n => n % 2 === 0);
      
      expect([...evens].sort()).toEqual([2, 4]);
      expect([...odds].sort()).toEqual([1, 3]);
    });
  });
});