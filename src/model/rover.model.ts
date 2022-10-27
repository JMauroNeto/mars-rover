import { InstructionType } from "./instruction.model";
import { PositionModel } from "./position.model";

export interface RoverModel extends PositionModel {
  direction: Direction;
  rotate: (direction: RotateDirection) => void;
  move: () => void;
}

export type RotateDirection = InstructionType.RotateLeft | InstructionType.RotateRight;

export enum Direction {
  North = 'N',
  South = 'S',
  East = 'E',
  West = 'W',
}
