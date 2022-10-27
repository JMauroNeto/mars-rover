import * as fs from 'fs';
import { Service } from 'typedi';
import { BaseUseCase } from '../../core';

@Service()
export class ReadInputUseCase implements BaseUseCase<string, string[]> {
  exec(path: string) {
    return fs.readFileSync(path, { encoding: 'utf8' }).split('\n');
  }
}
