// src/TweakedMap.ts
var TweakedMap = class _TweakedMap extends Map {
  /**
   * Groups values by a key selector function
   * @param keySelector - Function to extract the grouping key from values
   * @param options - Optional configuration for grouping behavior
   * @returns A new TweakedMap where keys are group identifiers and values are arrays
   * 
   * @example
   * const users = new TweakedMap([
   *   [1, { name: 'John', role: 'admin' }],
   *   [2, { name: 'Jane', role: 'user' }]
   * ]);
   * const byRole = users.groupBy(user => user.role);
   */
  groupBy(keySelector, options = {}) {
    const result = new _TweakedMap();
    for (const [, value] of this) {
      const groupKey = keySelector(value);
      if (!result.has(groupKey)) {
        result.set(groupKey, []);
      }
      result.get(groupKey).push(value);
    }
    if (options.preserveOrder) {
      for (const [key, group] of result) {
        result.set(key, [...group]);
      }
    }
    return result;
  }
  /**
   * Creates a new map with entries that satisfy the predicate
   * @param predicate - Function to test each entry
   * @returns A new filtered map
   * 
   * @example
   * const users = new TweakedMap([
   *   [1, { name: 'John', age: 30 }],
   *   [2, { name: 'Jane', age: 25 }]
   * ]);
   * const adults = users.filter(user => user.age >= 18);
   */
  filter(predicate) {
    const result = new _TweakedMap();
    for (const [key, value] of this) {
      if (predicate(value, key)) {
        result.set(key, value);
      }
    }
    return result;
  }
  /**
   * Creates a new map with transformed values
   * @param transformer - Function to transform each value
   * @returns A new map with transformed values
   *
   * @example
   * const numbers = new TweakedMap([
   *   ['a', 1],
   *   ['b', 2]
   * ]);
   * const doubled = numbers.mapValues((value, key) => `${key}-${value * 2}`);
   */
  mapValues(transformer) {
    const result = new _TweakedMap();
    for (const [key, value] of this) {
      result.set(key, transformer(value, key));
    }
    return result;
  }
  /**
   * Reduces the map to a single value
   * @param reducer - Function to execute on each entry
   * @param initialValue - Starting value for reduction
   * @returns The final reduced value
   *
   * @example
   * const numbers = new TweakedMap([
   *   ['a', 1],
   *   ['b', 2]
   * ]);
   * const sum = numbers.reduce((acc, value, key) => acc + value, 0);
   */
  reduce(reducer, initialValue) {
    let result = initialValue;
    for (const [key, value] of this) {
      result = reducer(result, value, key);
    }
    return result;
  }
};

// src/TweakedSet.ts
var TweakedSet = class _TweakedSet extends Set {
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
  groupBy(keySelector, options = {}) {
    const result = new TweakedMap();
    for (const value of this) {
      const groupKey = keySelector(value);
      if (!result.has(groupKey)) {
        result.set(groupKey, []);
      }
      result.get(groupKey).push(value);
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
  union(other) {
    return new _TweakedSet([...this, ...other]);
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
  intersection(other) {
    return new _TweakedSet([...this].filter((x) => other.has(x)));
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
  difference(other) {
    return new _TweakedSet([...this].filter((x) => !other.has(x)));
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
  partition(predicate) {
    const truthy = new _TweakedSet();
    const falsy = new _TweakedSet();
    for (const value of this) {
      if (predicate(value)) {
        truthy.add(value);
      } else {
        falsy.add(value);
      }
    }
    return [truthy, falsy];
  }
};
export {
  TweakedMap,
  TweakedSet
};
