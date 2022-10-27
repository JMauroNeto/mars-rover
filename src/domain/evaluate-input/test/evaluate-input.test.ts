import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import Container from 'typedi';
import { EvaluateInstructionsUseCase } from '../../evaluate-instructions';
import { EvaluateInputUseCase } from '../evaluate-input.use-case';
import { Plateau, Rover } from '../../../entities';
import { getRoverPosition } from '../../../utils/get-position';

describe('Domain - EvaluateInput', () => {
  const defaultInput = ['5 5', '1 2 N', 'LMLMLMLMM', '3 3 E', 'MRRMMRMRRM'];

  const defaultPlateau = new Plateau(5, 5);

  let evaluateInputUseCase: EvaluateInputUseCase;
  let evaluateInstructionsUseCase: EvaluateInstructionsUseCase;

  let stubEvaluateInstructionsUseCase: sinon.SinonStub;

  before(() => {
    evaluateInputUseCase = Container.get(EvaluateInputUseCase);
    evaluateInstructionsUseCase = Container.get(EvaluateInstructionsUseCase);
  });

  beforeEach(() => {
    stubEvaluateInstructionsUseCase = sinon.stub(evaluateInstructionsUseCase, 'exec');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call evaluateInstructionsUseCase with correct arguments', () => {
    evaluateInputUseCase.exec(defaultInput);

    expect(stubEvaluateInstructionsUseCase.callCount).to.be.eq(2);

    for (let i = 1, j = 0; i < defaultInput.length; i += 2, j++) {
      const { x, y, direction } = getRoverPosition(defaultInput[i]);

      const args = stubEvaluateInstructionsUseCase.getCall(j).args[0];
      const rover = new Rover(x, y, direction, defaultPlateau);

      expect(args.instructions).to.be.eq(defaultInput[i + 1]);
      expect(args.rover).to.be.deep.eq(rover);
    }
  });

  it('should return correct value', () => {
    const result = evaluateInputUseCase.exec(defaultInput);

    expect(result).to.be.deep.eq(['1 2 N', '3 3 E']);
  });
});
