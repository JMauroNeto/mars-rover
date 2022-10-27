import * as fs from 'fs';
import { WriteOutputInputModel } from '../../model';
import { Service } from 'typedi';
import { BaseUseCase } from '../../core';

@Service()
export class WriteOutputUseCase implements BaseUseCase<WriteOutputInputModel, void> {
  exec({ path, output }: WriteOutputInputModel) {
    return fs.writeFileSync(path, output.join('\n'), { encoding: 'utf-8' });
  }
}
