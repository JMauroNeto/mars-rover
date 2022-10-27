export interface BaseUseCase<T, V> {
  exec(input: T): V;
}
