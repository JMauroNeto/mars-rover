import { RoverModel } from './rover.model';

export interface EvaluateInstructionsInputModel {
  instructions: string;
  rover: RoverModel;
}

export enum InstructionType {
  Move = 'M',
  RotateLeft = 'L',
  RotateRight = 'R',
}
