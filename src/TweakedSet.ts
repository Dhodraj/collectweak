import { ITweakedSet, GroupByOptions, Predicate } from './types';
import { TweakedMap } from './TweakedMap';

export class TweakedSet<T> extends Set<T> implements ITweakedSet<T> {
  /**
   * Groups elements by a key selector function
   * @param keySelector - Function to extract the grouping key
   * @param options - Optional configuration for grouping behavior
   * @returns A map where keys are group identifiers and values are arrays
   * 
   * @example
   * const numbers = new TweakedSet([1, 2, 3, 4]);
   * const byParity = numbers.groupBy(n => n % 2 === 0 ? 'even' : 'odd');
   */
  groupBy<K>(keySelector: (value: T) => K, options: GroupByOptions = {}): TweakedMap<K, T[]> {
    const result = new TweakedMap<K, T[]>();
    
    for (const value of this) {
      const groupKey = keySelector(value);
      if (!result.has(groupKey)) {
        result.set(groupKey, []);
      }
      result.get(groupKey)!.push(value);
    }

    if (options.preserveOrder) {
      for (const [key, group] of result) {
        result.set(key, [...group]);
      }
    }
    
    return result;
  }

  /**
   * Creates a union with another set
   * @param other - The set to combine with
   * @returns A new set containing elements from both sets
   * 
   * @example
   * const set1 = new TweakedSet([1, 2]);
   * const set2 = new TweakedSet([2, 3]);
   * const union = set1.union(set2); // [1, 2, 3]
   */
  union(other: Set<T>): TweakedSet<T> {
    return new TweakedSet<T>([...this, ...other]);
  }

  /**
   * Creates an intersection with another set
   * @param other - The set to intersect with
   * @returns A new set containing common elements
   * 
   * @example
   * const set1 = new TweakedSet([1, 2]);
   * const set2 = new TweakedSet([2, 3]);
   * const intersection = set1.intersection(set2); // [2]
   */
  intersection(other: Set<T>): TweakedSet<T> {
    return new TweakedSet<T>([...this].filter(x => other.has(x)));
  }

  /**
   * Creates a difference with another set
   * @param other - The set to subtract
   * @returns A new set containing elements unique to this set
   * 
   * @example
   * const set1 = new TweakedSet([1, 2]);
   * const set2 = new TweakedSet([2, 3]);
   * const difference = set1.difference(set2); // [1]
   */
  difference(other: Set<T>): TweakedSet<T> {
    return new TweakedSet<T>([...this].filter(x => !other.has(x)));
  }

  /**
   * Splits the set into two sets based on a predicate
   * @param predicate - Function to test each element
   * @returns A tuple of two sets: [matching, non-matching]
   * 
   * @example
   * const numbers = new TweakedSet([1, 2, 3, 4]);
   * const [evens, odds] = numbers.partition(n => n % 2 === 0);
   */
  partition(predicate: Predicate<T>): [TweakedSet<T>, TweakedSet<T>] {
    const truthy = new TweakedSet<T>();
    const falsy = new TweakedSet<T>();
    
    for (const value of this) {
      if (predicate(value)) {
        truthy.add(value);
      } else {
        falsy.add(value);
      }
    }
    
    return [truthy, falsy];
  }
}