import { TweakedMap } from "../TweakedMap";
import { TweakedSet } from "../TweakedSet";

/**
 * A selector function that extracts a key from a value
 */
export type KeySelector<T, K> = (value: T) => K;

/**
 * A predicate function that tests a value
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * A transformer function that converts a value to another type
 */
export type Transformer<T, R> = (value: T) => R;

/**
 * A reducer function that accumulates values
 */
export type Reducer<T, R> = (accumulator: R, value: T) => R;

/**
 * Options for grouping operations
 */
export interface GroupByOptions {
  /** Whether to maintain the original insertion order within groups */
  preserveOrder?: boolean;
}

/**
 * Result of a partition operation
 */
export type PartitionResult<T> = [TweakedSet<T>, TweakedSet<T>];

/**
 * Generic interfaces for our collections
 */
export interface ITweakedMap<K, V> extends Map<K, V> {
  groupBy<R>(keySelector: KeySelector<V, R>, options?: GroupByOptions): TweakedMap<R, V[]>;
  filter(predicate: (value: V, key: K) => boolean): TweakedMap<K, V>;
  mapValues<R>(transformer: (value: V, key: K) => R): TweakedMap<K, R>;
  reduce<R>(reducer: (accumulator: R, value: V, key: K) => R, initialValue: R): R;
}

export interface ITweakedSet<T> extends Set<T> {
  groupBy<K>(keySelector: KeySelector<T, K>, options?: GroupByOptions): TweakedMap<K, T[]>;
  union(other: Set<T>): TweakedSet<T>;
  intersection(other: Set<T>): TweakedSet<T>;
  difference(other: Set<T>): TweakedSet<T>;
  partition(predicate: Predicate<T>): PartitionResult<T>;
}