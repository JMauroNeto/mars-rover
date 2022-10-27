import 'reflect-metadata';
import * as sinon from 'sinon';
import Container from 'typedi';
import { EvaluateInstructionsUseCase } from '../evaluate-instructions.use-case';
import { Plateau, Rover } from '../../../entities';
import { Direction, InstructionType } from '../../../model';
import { expect } from 'chai';

describe('Domain - EvaluateInstructions', () => {
  const defaultInstructions = 'LMLMLMLMM';
  const defaultPlateau = new Plateau(5, 5);
  const defaultRover = new Rover(1, 3, Direction.North, defaultPlateau);

  let evaluateInstructionsUseCase: EvaluateInstructionsUseCase;

  let roverMoveSpy: sinon.SinonSpy;
  let roverRotateSpy: sinon.SinonSpy;

  before(() => {
    evaluateInstructionsUseCase = Container.get(EvaluateInstructionsUseCase);
  });

  beforeEach(() => {
    roverMoveSpy = sinon.spy(defaultRover, 'move');
    roverRotateSpy = sinon.spy(defaultRover, 'rotate');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call correct rover methods with default input', () => {
    evaluateInstructionsUseCase.exec({ instructions: defaultInstructions, rover: defaultRover });

    expect(roverMoveSpy.callCount).to.be.eq(5);

    checkRotateBehaviour(defaultInstructions);
  });

  it('should call correct rover rotate methods', () => {
    const instructions = 'LLLRR';

    evaluateInstructionsUseCase.exec({ instructions, rover: defaultRover });

    expect(roverMoveSpy.callCount).to.be.eq(0);

    checkRotateBehaviour(instructions);
  });

  const checkRotateBehaviour = (instructions: string) => {
    const rotateInstructions = instructions.replace(/[M]/g, '');

    expect(roverRotateSpy.callCount).to.be.eq(rotateInstructions.length);

    for (let i = 0; i < rotateInstructions.length; i++) {
      const instruction = rotateInstructions[i] as InstructionType;

      const args = roverRotateSpy.getCall(i).args[0];

      expect(args).to.be.eq(instruction);
    }
  };
});
