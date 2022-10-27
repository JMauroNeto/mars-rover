import 'reflect-metadata';
import { EvaluateInputUseCase } from './domain/evaluate-input';
import Container from 'typedi';
import { ReadInputUseCase } from 'domain/read-input';
import { WriteOutputUseCase } from 'domain/write-output';

const readInputUseCase = Container.get(ReadInputUseCase);
const input = readInputUseCase.exec('input.txt');

const evaluateInputUseCase = Container.get(EvaluateInputUseCase);
const output = evaluateInputUseCase.exec(input);

const writeOutputUseCase = Container.get(WriteOutputUseCase);
writeOutputUseCase.exec({ path: 'output.txt', output });
