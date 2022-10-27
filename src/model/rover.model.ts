export interface RoverModel {
  direction: Direction;
  x: number;
  y: number;
}

export enum Direction {
  North = 'N',
  South = 'S',
  East = 'E',
  West = 'W',
}