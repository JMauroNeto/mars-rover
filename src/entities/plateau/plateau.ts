import { PlateauModel } from "model/plateau.model";
import { integerPattern } from "../../utils/regex";

export class Plateau implements PlateauModel {
  constructor(public x: number, public y: number) {
    if(!integerPattern.test(`${x}`) || !integerPattern.test(`${y}`)) {
      throw new Error('Plateau inputs must be integers');
    }
  }
}
