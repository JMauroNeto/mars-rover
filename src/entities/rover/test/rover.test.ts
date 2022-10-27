import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { Direction, InstructionType } from '../../../model';
import { Rover } from '../rover';

describe('Entity - Rover', () => {
  let rover: Rover;

  let x: number;
  let y: number;

  let direction: Direction;

  beforeEach(() => {
    x = faker.datatype.number();
    y = faker.datatype.number();
    direction = faker.helpers.objectValue(Direction);
  })

  afterEach(() => {
    rover = undefined;
    x = undefined;
    y = undefined;
    direction = undefined;
  })

  it('should construct rover with correct parameters', () => {
    rover = new Rover(x, y, direction);

    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);
    expect(rover.direction).to.be.eq(direction);
  })

  it('should give error when x parameter is incorrect', () => {
    x = faker.datatype.float();

    expect(() => rover = new Rover(x, y, direction)).to.throw(Error, 'Rover positions must be integers')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when y parameter is incorrect', () => {
    y = faker.datatype.float();

    expect(() => rover = new Rover(x, y, direction)).to.throw(Error, 'Rover positions must be integers')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when both x and y parameters are incorrect', () => {
    x = faker.datatype.float();
    y = faker.datatype.float();

    expect(() => rover = new Rover(x, y, direction)).to.throw(Error, 'Rover positions must be integers')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when direction parameter is incorrect', () => {
    direction = faker.datatype.string() as Direction;

    expect(() => rover = new Rover(x, y, direction)).to.throw(Error, `Rover direction must be 'N', 'S', 'E' or 'W'`)
    expect(rover).to.be.eq(undefined);
  })

  it('should rotate right without moving', () => {
    rover = new Rover(x, y, Direction.North);

    rover.rotate(InstructionType.RotateRight);

    expect(rover.direction).to.be.eq(Direction.East)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);
    
    rover.rotate(InstructionType.RotateRight);

    expect(rover.direction).to.be.eq(Direction.South)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);

    rover.rotate(InstructionType.RotateRight);

    expect(rover.direction).to.be.eq(Direction.West)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);

    rover.rotate(InstructionType.RotateRight);

    expect(rover.direction).to.be.eq(Direction.North)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);
  })

  it('should rotate left without moving', () => {
    rover = new Rover(x, y, Direction.North);

    rover.rotate(InstructionType.RotateLeft);

    expect(rover.direction).to.be.eq(Direction.West)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);
    
    rover.rotate(InstructionType.RotateLeft);

    expect(rover.direction).to.be.eq(Direction.South)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);

    rover.rotate(InstructionType.RotateLeft);

    expect(rover.direction).to.be.eq(Direction.East)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);

    rover.rotate(InstructionType.RotateLeft);

    expect(rover.direction).to.be.eq(Direction.North)
    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);
  })
})
