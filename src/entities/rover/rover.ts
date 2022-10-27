import { Direction, InstructionType, RotateDirection, RoverModel } from "../../model";
import { directionPattern, integerPattern } from "../../utils/regex";

export class Rover implements RoverModel {
  constructor(public x: number, public y: number, public direction: Direction) {
    if(!integerPattern.test(`${x}`) || !integerPattern.test(`${y}`)) {
      throw new Error('Rover positions must be integers');
    }

    if(!directionPattern.test(`${direction}`)) {
      throw new Error(`Rover direction must be 'N', 'S', 'E' or 'W'`)
    }
  }

  rotate(direction: RotateDirection) {
    const rotateByCurrentDirection: Record<Direction, Record<RotateDirection, Direction>> = {
      [Direction.North]: {
        [InstructionType.RotateLeft]: Direction.West,
        [InstructionType.RotateRight]: Direction.East,
      },
      [Direction.South]: {
        [InstructionType.RotateLeft]: Direction.East,
        [InstructionType.RotateRight]: Direction.West,
      },
      [Direction.East]: {
        [InstructionType.RotateLeft]: Direction.North,
        [InstructionType.RotateRight]: Direction.South,
      },
      [Direction.West]: {
        [InstructionType.RotateLeft]: Direction.South,
        [InstructionType.RotateRight]: Direction.North,
      },
    };

    const newDirection = rotateByCurrentDirection[this.direction][direction];

    this.direction = newDirection;
  }
}