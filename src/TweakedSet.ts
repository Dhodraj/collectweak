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
   * const players = new TweakedSet([
   *   'MS Dhoni',
   *   'Ravindra Jadeja',
   *   'Ruturaj Gaikwad',
   *   'Shivam Dube',
   *   'Matheesha Pathirana'
   * ]);
   * const byExperience = players.groupBy(player => {
   *   const veterans = ['MS Dhoni', 'Ravindra Jadeja'];
   *   return veterans.includes(player) ? 'veteran' : 'youngster';
   * });
   * // Result: Map {
   * //   'veteran' => ['MS Dhoni', 'Ravindra Jadeja'],
   * //   'youngster' => ['Ruturaj Gaikwad', 'Shivam Dube', 'Matheesha Pathirana']
   * // }
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
   * const indianPlayers = new TweakedSet(['MS Dhoni', 'Ravindra Jadeja', 'Ruturaj Gaikwad']);
   * const allRounders = new TweakedSet(['Ravindra Jadeja', 'Shivam Dube']);
   * const squadMembers = indianPlayers.union(allRounders);
   * // Result: Set {
   * //   'MS Dhoni',
   * //   'Ravindra Jadeja',
   * //   'Ruturaj Gaikwad',
   * //   'Shivam Dube'
   * // }
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
   * const powerHitters = new TweakedSet(['MS Dhoni', 'Shivam Dube']);
   * const allRounders = new TweakedSet(['Ravindra Jadeja', 'Shivam Dube']);
   * const powerHittingAllRounders = powerHitters.intersection(allRounders);
   * // Result: Set {
   * //   'Shivam Dube'
   * // }
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
   * const captains = new TweakedSet(['MS Dhoni', 'Ravindra Jadeja', 'Ruturaj Gaikwad']);
   * const allRounders = new TweakedSet(['Ravindra Jadeja', 'Shivam Dube']);
   * const pureCaptains = captains.difference(allRounders);
   * // Result: Set {
   * //   'MS Dhoni',
   * //   'Ruturaj Gaikwad'
   * // }
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
   * const players = new TweakedSet([
   *   'MS Dhoni',
   *   'Ravindra Jadeja',
   *   'Ruturaj Gaikwad',
   *   'Shivam Dube',
   *   'Matheesha Pathirana'
   * ]);
   * const internationalPlayers = new Set(['MS Dhoni', 'Ravindra Jadeja']);
   * const [experienced, upcoming] = players.partition(
   *   player => internationalPlayers.has(player)
   * );
   * // Result: [
   * //   Set { 'MS Dhoni', 'Ravindra Jadeja' },
   * //   Set { 'Ruturaj Gaikwad', 'Shivam Dube', 'Matheesha Pathirana' }
   * // ]
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