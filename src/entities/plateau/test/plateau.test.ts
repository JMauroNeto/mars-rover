import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { Plateau } from '../plateau';

describe('Entity - Plateau', () => {
  let plateau: Plateau;

  let x: number;
  let y: number;

  beforeEach(() => {
    x = faker.datatype.number();
    y = faker.datatype.number();
  })

  afterEach(() => {
    plateau = undefined;
    x = undefined;
    y = undefined;
  })

  it('should construct plateau with correct size', () => {
    plateau = new Plateau(x, y);

    expect(plateau.x).to.be.eq(x);
    expect(plateau.y).to.be.eq(y);
  })

  it('should give error when x parameter is incorrect', () => {
    x = faker.datatype.float();

    expect(() => plateau = new Plateau(x, y)).to.throw(Error, 'Plateau inputs must be integers');
    expect(plateau).to.be.eq(undefined);
  })

  it('should give error when y parameter is incorrect', () => {
    y = faker.datatype.float();

    expect(() => plateau = new Plateau(x, y)).to.throw(Error, 'Plateau inputs must be integers');
    expect(plateau).to.be.eq(undefined);
  })

  it('should give error when both x and y parameters are incorrect', () => {
    x = faker.datatype.float();
    y = faker.datatype.float();

    expect(() => plateau = new Plateau(x, y)).to.throw(Error, 'Plateau inputs must be integers');
    expect(plateau).to.be.eq(undefined);
  })
})
