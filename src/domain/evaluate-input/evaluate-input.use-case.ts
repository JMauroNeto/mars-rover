import { BaseUseCase } from 'core';
import { EvaluateInstructionsUseCase } from '../evaluate-instructions';
import { Plateau } from '../../entities/plateau';
import { Rover } from '../../entities/rover';
import { Service } from 'typedi';
import { getPosition, getRoverPosition } from '../../utils/get-position';

@Service()
export class EvaluateInputUseCase implements BaseUseCase<string[], string[]> {
  constructor(private readonly evaluateInstructionsUseCase: EvaluateInstructionsUseCase) {}

  exec(input: string[]) {
    const { x: plateauX, y: plateauY } = getPosition(input[0]);
    const plateau = new Plateau(plateauX, plateauY);

    const finalPositions = [];

    for (let i = 1; i < input.length; i += 2) {
      const roverInitialPosition = input[i];

      const { x, y, direction } = getRoverPosition(roverInitialPosition);

      const rover = new Rover(x, y, direction, plateau);

      const instructions = input[i + 1];

      this.evaluateInstructionsUseCase.exec({ instructions, rover });

      finalPositions.push(`${rover.x} ${rover.y} ${rover.direction}`);
    }

    return finalPositions;
  }
}
