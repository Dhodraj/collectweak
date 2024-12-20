import { ITweakedMap, GroupByOptions } from './types';

export class TweakedMap<K, V> extends Map<K, V> implements ITweakedMap<K, V> {
    /**
     * Groups values by a key selector function
     * @param keySelector - Function to extract the grouping key from values
     * @param options - Optional configuration for grouping behavior
     * @returns A new TweakedMap where keys are group identifiers and values are arrays
     * 
     * @example
     * const players = new TweakedMap([
     *   [7, { name: 'MS Dhoni', role: 'wicket-keeper', nationality: 'Indian' }],
     *   [8, { name: 'Ravindra Jadeja', role: 'all-rounder', nationality: 'Indian' }]
     * ]);
     * const byRole = players.groupBy(player => player.role);
     * // Result: Map {
     * //   'wicket-keeper' => [{ name: 'MS Dhoni', role: 'wicket-keeper', nationality: 'Indian' }],
     * //   'all-rounder' => [{ name: 'Ravindra Jadeja', role: 'all-rounder', nationality: 'Indian' }]
     * // }
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
     * const players = new TweakedMap([
     *   [96, { name: 'Ruturaj Gaikwad', matchesPlayed: 52, nationality: 'Indian' }],
     *   [69, { name: 'Matheesha Pathirana', matchesPlayed: 15, nationality: 'Sri Lankan' }]
     * ]);
     * const experiencedPlayers = players.filter(player => player.matchesPlayed > 30);
     * // Result: Map {
     * //   96 => { name: 'Ruturaj Gaikwad', matchesPlayed: 52, nationality: 'Indian' }
     * // }
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
     * const players = new TweakedMap([
     *   [27, { name: 'Shivam Dube', role: 'all-rounder', speciality: 'Power-hitting' }],
     *   [8, { name: 'Ravindra Jadeja', role: 'all-rounder', speciality: 'Left-arm spin' }]
     * ]);
     * const playerCards = players.mapValues(player => ({
     *   displayName: player.name.toUpperCase(),
     *   title: `${player.role} - ${player.speciality}`
     * }));
     * // Result: Map {
     * //   27 => { displayName: 'SHIVAM DUBE', title: 'all-rounder - Power-hitting' },
     * //   8 => { displayName: 'RAVINDRA JADEJA', title: 'all-rounder - Left-arm spin' }
     * // }
     */
    mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R> {
        const result = new TweakedMap<K, R>();

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
     * const players = new TweakedMap([
     *   [7, { name: 'MS Dhoni', matchesPlayed: 250 }],
     *   [8, { name: 'Ravindra Jadeja', matchesPlayed: 180 }]
     * ]);
     * const totalMatches = players.reduce((total, player) => total + player.matchesPlayed, 0);
     * // Result: 430
     */
    reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initialValue: R): R {
        let result = initialValue;

        for (const [key, value] of this) {
            result = reducer(result, value, key);
        }

        return result;
    }
}