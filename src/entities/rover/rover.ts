import { Plateau } from "entities/plateau";
import { Direction, InstructionType, RotateDirection, RoverModel } from "../../model";
import { directionPattern, integerPattern } from "../../utils/regex";

export class Rover implements RoverModel {
  private maxX: number;
  private maxY: number;

  constructor(public x: number, public y: number, public direction: Direction, plateau: Plateau) {
    if (x > plateau.x || y > plateau.y) {
      throw new Error('Rover position must be less than plateau size');
    }

    if(!integerPattern.test(`${x}`) || !integerPattern.test(`${y}`)) {
      throw new Error('Rover positions must be integers');
    }

    if(!directionPattern.test(`${direction}`)) {
      throw new Error(`Rover direction must be 'N', 'S', 'E' or 'W'`)
    }

    this.maxX = plateau.x;
    this.maxY = plateau.y;
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

  move() {
    const moveByCurrentDirection: Record<Direction, () => void> = {
      [Direction.North]: () => this.moveNorth(),
      [Direction.South]: () => this.moveSouth(),
      [Direction.East]: () => this.moveEast(),
      [Direction.West]: () => this.moveWest(),
    };

    moveByCurrentDirection[this.direction]();
  }

  private moveNorth() {
    if (this.y < this.maxY) {
      this.y = this.y + 1;
    } else {
      this.throwInvalidMove();
    }
  }

  private moveSouth() {
    if (this.y > 0) {
      this.y = this.y - 1;
    } else {
      this.throwInvalidMove();
    }
  }

  private moveEast() {
    if(this.x < this.maxX) {
      this. x = this.x + 1;
    } else {
      this.throwInvalidMove();
    }
  }

  private moveWest() {
    if (this.x > 0) {
      this.x = this.x - 1;
    } else {
      this.throwInvalidMove();
    }
  }

  private throwInvalidMove() {
    throw new Error(`Invalid input: you can\'t move outside the plateau`);
  }
}