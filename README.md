# CollectWeak

A TypeScript library that enhances JavaScript's built-in Map and Set collections with powerful utility methods for data manipulation.

## Installation

```bash
npm install collectweak
```

## Features

- Type-safe: Written in TypeScript with full type definitions
- Enhanced Map and Set collections with useful utility methods
- Extends native Map and Set classes - all original methods available
- Zero dependencies
- Chainable operations

## Usage

### TweakedMap

```typescript
import { TweakedMap } from 'collectweak';

// Example: Managing CSK (Chennai Super Kings) team roster
interface Player {
  id: number;
  name: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  speciality: string;
  matchesPlayed: number;
  nationality: string;
  battingAverage?: number;
}

const cskTeam = new TweakedMap<number, Player>([
  [7, { 
    id: 7, 
    name: 'MS Dhoni', 
    role: 'wicket-keeper', 
    speciality: 'Finisher & Captain', 
    matchesPlayed: 250,
    nationality: 'Indian',
    battingAverage: 38.09
  }],
  [8, { 
    id: 8, 
    name: 'Ravindra Jadeja', 
    role: 'all-rounder', 
    speciality: 'Left-arm spin & Lower-order batting', 
    matchesPlayed: 180,
    nationality: 'Indian',
    battingAverage: 31.89
  }],
  [96, { 
    id: 96, 
    name: 'Ruturaj Gaikwad', 
    role: 'batsman', 
    speciality: 'Opening batsman & Team Captain', 
    matchesPlayed: 52,
    nationality: 'Indian',
    battingAverage: 42.62
  }],
  [27, { 
    id: 27, 
    name: 'Shivam Dube', 
    role: 'all-rounder', 
    speciality: 'Power-hitting & Medium pace', 
    matchesPlayed: 35,
    nationality: 'Indian',
    battingAverage: 33.45
  }],
  [69, { 
    id: 69, 
    name: 'Matheesha Pathirana', 
    role: 'bowler', 
    speciality: 'Death overs specialist & Malinga-like action', 
    matchesPlayed: 15,
    nationality: 'Sri Lankan',
    battingAverage: 5.50
  }]
]);

// 1. groupBy Example
const playersByRole = cskTeam.groupBy(player => player.role);
console.log('Players By Role:');
console.log('Batsmen:', playersByRole.get('batsman'));
// Result: [{ id: 96, name: 'Ruturaj Gaikwad', ... }]
console.log('All-rounders:', playersByRole.get('all-rounder'));
// Result: [{ id: 8, name: 'Ravindra Jadeja', ... }, { id: 27, name: 'Shivam Dube', ... }]

// 2. filter Example
const experiencedPlayers = cskTeam.filter(player => player.matchesPlayed > 100);
console.log('Experienced Players:', [...experiencedPlayers.values()]);
// Result: [
//   { id: 7, name: 'MS Dhoni', matchesPlayed: 250, ... },
//   { id: 8, name: 'Ravindra Jadeja', matchesPlayed: 180, ... }
// ]

// 3. mapValues Example
const playerSummaries = cskTeam.mapValues(player => ({
  name: player.name.toUpperCase(),
  experience: `${player.matchesPlayed} matches`,
  avgScore: player.battingAverage?.toFixed(2)
}));
console.log('Player Summaries:', [...playerSummaries.values()]);
// Result: [
//   { name: 'MS Dhoni', experience: '250 matches', avgScore: '38.09' },
//   { name: 'Ravindra Jadeja', experience: '180 matches', avgScore: '31.89' },
//   ...
// ]

// 4. reduce Example
const totalMatches = cskTeam.reduce((total, player) => total + player.matchesPlayed, 0);
console.log('Total Team Experience:', totalMatches);
// Result: 532 matches

// 5. Custom chaining example
const indianBatsmen = cskTeam
  .filter(player => player.nationality === 'Indian')
  .filter(player => player.battingAverage! > 35)
  .mapValues(player => ({
    name: player.name,
    average: player.battingAverage
  }));
console.log('Elite Indian Batsmen:', [...indianBatsmen.values()]);
// Result: [
//   { name: 'MS Dhoni', average: 38.09 },
//   { name: 'Ruturaj Gaikwad', average: 42.62 }
// ]
```

### TweakedSet

```typescript
import { TweakedSet } from 'collectweak';

// Example: Managing CSK player specialties and categories
const batsmen = new TweakedSet(['MS Dhoni', 'Ruturaj Gaikwad', 'Shivam Dube']);
const bowlers = new TweakedSet(['Matheesha Pathirana', 'Ravindra Jadeja']);
const allrounders = new TweakedSet(['Ravindra Jadeja', 'Shivam Dube']);

// 1. union Example
const skillPlayers = batsmen.union(bowlers);
console.log('All Skilled Players:', [...skillPlayers]);
// Result: ['MS Dhoni', 'Ruturaj Gaikwad', 'Shivam Dube', 'Matheesha Pathirana', 'Ravindra Jadeja']

// 2. intersection Example
const battingAllrounders = batsmen.intersection(allrounders);
console.log('Batting All-rounders:', [...battingAllrounders]);
// Result: ['Shivam Dube']

// 3. difference Example
const pureBatsmen = batsmen.difference(allrounders);
console.log('Pure Batsmen:', [...pureBatsmen]);
// Result: ['MS Dhoni', 'Ruturaj Gaikwad']

// 4. partition Example
const players = new TweakedSet([
  'MS Dhoni',
  'Ravindra Jadeja',
  'Ruturaj Gaikwad',
  'Shivam Dube',
  'Matheesha Pathirana'
]);

const seniorPlayers = new Set(['MS Dhoni', 'Ravindra Jadeja']);
const [veterans, youngsters] = players.partition(player => seniorPlayers.has(player));
console.log('Veterans:', [...veterans]);
// Result: ['MS Dhoni', 'Ravindra Jadeja']
console.log('Youngsters:', [...youngsters]);
// Result: ['Ruturaj Gaikwad', 'Shivam Dube', 'Matheesha Pathirana']

// 5. groupBy Example
const roleBasedPlayers = players.groupBy(player => {
  if (allrounders.has(player)) return 'all-rounder';
  if (pureBatsmen.has(player)) return 'batsman';
  return 'bowler';
});

console.log('Players by Role:', {
  allrounders: roleBasedPlayers.get('all-rounder'),
  batsmen: roleBasedPlayers.get('batsman'),
  bowlers: roleBasedPlayers.get('bowler')
});
// Result: {
//   allrounders: ['Ravindra Jadeja', 'Shivam Dube'],
//   batsmen: ['MS Dhoni', 'Ruturaj Gaikwad'],
//   bowlers: ['Matheesha Pathirana']
// }
```

## API Reference

### TweakedMap

#### `groupBy<R>(keySelector: (value: V) => R, options?: GroupByOptions): TweakedMap<R, V[]>`
Groups map values by a key selector function. Options include `preserveOrder` flag.

#### `filter(predicate: (value: V, key: K) => boolean): TweakedMap<K, V>`
Creates a new map with entries that satisfy the predicate.

#### `mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R>`
Creates a new map with transformed values while preserving keys.

#### `reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initialValue: R): R`
Reduces the map to a single value using the provided reducer function.

### TweakedSet

#### `groupBy<K>(keySelector: (value: T) => K, options?: GroupByOptions): TweakedMap<K, T[]>`
Groups set elements by a key selector function. Returns a TweakedMap.

#### `union(other: Set<T>): TweakedSet<T>`
Creates a new set with elements from both sets (A ∪ B).

#### `intersection(other: Set<T>): TweakedSet<T>`
Creates a new set with elements common to both sets (A ∩ B).

#### `difference(other: Set<T>): TweakedSet<T>`
Creates a new set with elements unique to this set (A - B).

#### `partition(predicate: (value: T) => boolean): [TweakedSet<T>, TweakedSet<T>]`
Splits the set into two sets based on a predicate function.

## Type Definitions

```typescript
interface GroupByOptions {
  preserveOrder?: boolean; // Maintains original order in grouped arrays
}

type Predicate<T> = (value: T) => boolean;

interface ITweakedMap<K, V> extends Map<K, V> {
  groupBy<R>(keySelector: (value: V) => R, options?: GroupByOptions): TweakedMap<R, V[]>;
  filter(predicate: (value: V, key: K) => boolean): TweakedMap<K, V>;
  mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R>;
  reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initialValue: R): R;
}

interface ITweakedSet<T> extends Set<T> {
  groupBy<K>(keySelector: (value: T) => K, options?: GroupByOptions): TweakedMap<K, T[]>;
  union(other: Set<T>): TweakedSet<T>;
  intersection(other: Set<T>): TweakedSet<T>;
  difference(other: Set<T>): TweakedSet<T>;
  partition(predicate: Predicate<T>): [TweakedSet<T>, TweakedSet<T>];
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.