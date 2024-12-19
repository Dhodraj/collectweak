import { ITweakedMap, GroupByOptions } from './types';

export class TweakedMap<K, V> extends Map<K, V> implements ITweakedMap<K, V> {
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
    groupBy<R>(keySelector: (value: V) => R, options: GroupByOptions = {}): TweakedMap<R, V[]> {
        const result = new TweakedMap<R, V[]>();

        for (const [, value] of this) {
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
    filter(predicate: (value: V, key: K) => boolean): TweakedMap<K, V> {
        const result = new TweakedMap<K, V>();

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
    mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R> {
        const result = new TweakedMap<K, R>();

        for (const [key, value] of this) {
            // Pass both value and key to the transformer
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
    reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initialValue: R): R {
        let result = initialValue;

        for (const [key, value] of this) {
            // Pass accumulator, value, and key to the reducer
            result = reducer(result, value, key);
        }

        return result;
    }

}