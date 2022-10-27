import * as faker from 'faker';
import { expect } from 'chai';
import { Plateau } from '../plateau';

describe('Entity - Plateau', () => {
  let plateau: Plateau;

  let x: number;
  let y: number;

  beforeEach(() => {
    x = faker.datatype.number();
    y = faker.datatype.number();
  });

  afterEach(() => {
    plateau = undefined;
    x = undefined;
    y = undefined;
  });

  it('should construct plateau with correct size', () => {
    plateau = new Plateau(x, y);

    expect(plateau.x).to.be.eq(x);
    expect(plateau.y).to.be.eq(y);
  });

  it('should give error when x parameter is incorrect', () => {
    x = faker.datatype.float();

    expect(() => (plateau = new Plateau(x, y))).to.throw(Error, 'Plateau inputs must be integers');
    expect(plateau).to.be.eq(undefined);
  });

  it('should give error when y parameter is incorrect', () => {
    y = faker.datatype.float();

    expect(() => (plateau = new Plateau(x, y))).to.throw(Error, 'Plateau inputs must be integers');
    expect(plateau).to.be.eq(undefined);
  });

  it('should give error when both x and y parameters are incorrect', () => {
    x = faker.datatype.float();
    y = faker.datatype.float();

    expect(() => (plateau = new Plateau(x, y))).to.throw(Error, 'Plateau inputs must be integers');
    expect(plateau).to.be.eq(undefined);
  });

  it('should create plateau if x parameter is 0', () => {
    x = 0;
    y = faker.datatype.number();

    plateau = new Plateau(x, y);

    expect(plateau.x).to.be.eq(x);
    expect(plateau.y).to.be.eq(y);
  });

  it('should create plateau if y parameter is 0', () => {
    x = faker.datatype.number();
    y = 0;

    plateau = new Plateau(x, y);

    expect(plateau.x).to.be.eq(x);
    expect(plateau.y).to.be.eq(y);
  });

  it('should give error if both x and y parameters are 0', () => {
    x = 0;
    y = 0;

    expect(() => (plateau = new Plateau(x, y))).to.throw(
      Error,
      'Almost one side of the plateau must be greater than 0',
    );
    expect(plateau).to.be.eq(undefined);
  });
});
