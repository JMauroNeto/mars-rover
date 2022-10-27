import 'reflect-metadata';
import { EvaluateInputUseCase, ReadInputUseCase, WriteOutputUseCase } from './domain';
import Container from 'typedi';

const readInputUseCase = Container.get(ReadInputUseCase);
const input = readInputUseCase.exec('input.txt');

const evaluateInputUseCase = Container.get(EvaluateInputUseCase);
const output = evaluateInputUseCase.exec(input);

const writeOutputUseCase = Container.get(WriteOutputUseCase);
writeOutputUseCase.exec({ path: 'output.txt', output });
