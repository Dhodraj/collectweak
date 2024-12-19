# CollecTweak

Enhanced TypeScript collections with powerful utility methods for Maps and Sets.

## Installation

```bash
npm install collectweak
```

## Features

### TweakedMap
- Type-safe implementation extending JavaScript's Map
- Group values by custom keys
- Filter entries based on predicates
- Transform values while preserving keys
- Reduce operations with type safety

### TweakedSet
- Type-safe implementation extending JavaScript's Set
- Group elements by custom keys
- Set operations (union, intersection, difference)
- Partition sets based on predicates

## Usage Examples

```typescript
import { TweakedMap, TweakedSet } from 'collectweak';

// Using TweakedMap
interface User {
  id: number;
  name: string;
  role: string;
}

const users = new TweakedMap<number, User>([
  [1, { id: 1, name: 'John', role: 'admin' }],
  [2, { id: 2, name: 'Jane', role: 'user' }]
]);

// Group users by role
const usersByRole = users.groupBy(user => user.role);
console.log(usersByRole.get('admin')); // [{ id: 1, name: 'John', role: 'admin' }]

// Using TweakedSet
const numbers = new TweakedSet([1, 2, 3, 4]);
const [evens, odds] = numbers.partition(n => n % 2 === 0);
console.log([...evens]); // [2, 4]
console.log([...odds]);  // [1, 3]
```

## API Reference

### TweakedMap<K, V>

#### Methods

- `groupBy<R>(keySelector: (value: V) => R): TweakedMap<R, V[]>`
- `filter(predicate: (value: V, key: K) => boolean): TweakedMap<K, V>`
- `mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R>`
- `reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initial: R): R`

### TweakedSet<T>

#### Methods

- `groupBy<K>(keySelector: (value: T) => K): TweakedMap<K, T[]>`
- `union(other: Set<T>): TweakedSet<T>`
- `intersection(other: Set<T>): TweakedSet<T>`
- `difference(other: Set<T>): TweakedSet<T>`
- `partition(predicate: (value: T) => boolean): [TweakedSet<T>, TweakedSet<T>]`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT