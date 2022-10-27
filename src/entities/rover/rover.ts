import { Direction, RoverModel } from "model/rover.model";
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
}