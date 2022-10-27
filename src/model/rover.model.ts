import { InstructionType } from "./instruction.model";
import { PositionModel } from "./position.model";

export interface RoverModel extends PositionModel {
  direction: Direction;
}

export type RotateDirection = InstructionType.RotateLeft | InstructionType.RotateRight;

export enum Direction {
  North = 'N',
  South = 'S',
  East = 'E',
  West = 'W',
}
