import { BaseUseCase } from '../../core';
import { EvaluateInstructionsInputModel, InstructionType } from '../../model';
import { Service } from 'typedi';
import { roverInstructionsPattern } from '../../utils/regex';

@Service()
export class EvaluateInstructionsUseCase implements BaseUseCase<EvaluateInstructionsInputModel, void> {
  exec({ instructions, rover }: EvaluateInstructionsInputModel) {
    if (!roverInstructionsPattern.test(instructions)) {
      throw new Error(`Instructions must be 'M', 'R' or 'L'`);
    }

    instructions.split('').forEach((instruction: InstructionType) => {
      const executeInstruction: Record<InstructionType, () => void> = {
        [InstructionType.Move]: () => rover.move(),
        [InstructionType.RotateLeft]: () => rover.rotate(InstructionType.RotateLeft),
        [InstructionType.RotateRight]: () => rover.rotate(InstructionType.RotateRight),
      };

      executeInstruction[instruction]();
    });
  }
}
