declare class TweakedMap<K, V> extends Map<K, V> implements ITweakedMap<K, V> {
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
    groupBy<R>(keySelector: (value: V) => R, options?: GroupByOptions): TweakedMap<R, V[]>;
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
    filter(predicate: (value: V, key: K) => boolean): TweakedMap<K, V>;
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
    mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R>;
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
    reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initialValue: R): R;
}

declare class TweakedSet<T> extends Set<T> implements ITweakedSet<T> {
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
    groupBy<K>(keySelector: (value: T) => K, options?: GroupByOptions): TweakedMap<K, T[]>;
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
    union(other: Set<T>): TweakedSet<T>;
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
    intersection(other: Set<T>): TweakedSet<T>;
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
    difference(other: Set<T>): TweakedSet<T>;
    /**
     * Splits the set into two sets based on a predicate
     * @param predicate - Function to test each element
     * @returns A tuple of two sets: [matching, non-matching]
     *
     * @example
     * const numbers = new TweakedSet([1, 2, 3, 4]);
     * const [evens, odds] = numbers.partition(n => n % 2 === 0);
     */
    partition(predicate: Predicate<T>): [TweakedSet<T>, TweakedSet<T>];
}

/**
 * A selector function that extracts a key from a value
 */
type KeySelector<T, K> = (value: T) => K;
/**
 * A predicate function that tests a value
 */
type Predicate<T> = (value: T) => boolean;
/**
 * A transformer function that converts a value to another type
 */
type Transformer<T, R> = (value: T) => R;
/**
 * A reducer function that accumulates values
 */
type Reducer<T, R> = (accumulator: R, value: T) => R;
/**
 * Options for grouping operations
 */
interface GroupByOptions {
    /** Whether to maintain the original insertion order within groups */
    preserveOrder?: boolean;
}
/**
 * Result of a partition operation
 */
type PartitionResult<T> = [TweakedSet<T>, TweakedSet<T>];
/**
 * Generic interfaces for our collections
 */
interface ITweakedMap<K, V> extends Map<K, V> {
    groupBy<R>(keySelector: KeySelector<V, R>, options?: GroupByOptions): TweakedMap<R, V[]>;
    filter(predicate: (value: V, key: K) => boolean): TweakedMap<K, V>;
    mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R>;
    reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initialValue: R): R;
}
interface ITweakedSet<T> extends Set<T> {
    groupBy<K>(keySelector: KeySelector<T, K>, options?: GroupByOptions): TweakedMap<K, T[]>;
    union(other: Set<T>): TweakedSet<T>;
    intersection(other: Set<T>): TweakedSet<T>;
    difference(other: Set<T>): TweakedSet<T>;
    partition(predicate: Predicate<T>): PartitionResult<T>;
}

export { type GroupByOptions, type ITweakedMap, type ITweakedSet, type KeySelector, type PartitionResult, type Predicate, type Reducer, type Transformer, TweakedMap, TweakedSet };
