import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { Plateau } from '../../plateau';
import { Direction, InstructionType } from '../../../model';
import { Rover } from '../rover';

describe('Entity - Rover', () => {
  let rover: Rover;

  let plateau: Plateau;

  let xPlateau: number;
  let yPlateau: number;

  let x: number;
  let y: number;

  let direction: Direction;

  beforeEach(() => {
    xPlateau = faker.datatype.number({min: 1});
    yPlateau = faker.datatype.number({min: 1});

    plateau = new Plateau(xPlateau, yPlateau);

    x = faker.datatype.number({max: xPlateau});
    y = faker.datatype.number({max: yPlateau});
    direction = faker.helpers.objectValue(Direction);
  })

  afterEach(() => {
    plateau = undefined;
    rover = undefined;
    x = undefined;
    y = undefined;
    direction = undefined;
  })

  it('should construct rover with correct parameters', () => {
    rover = new Rover(x, y, direction, plateau);

    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y);
    expect(rover.direction).to.be.eq(direction);
  })

  it('should give error when x parameter is incorrect', () => {
    x = faker.datatype.float({max: xPlateau});

    expect(() => rover = new Rover(x, y, direction, plateau)).to.throw(Error, 'Rover positions must be integers')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when y parameter is incorrect', () => {
    y = faker.datatype.float({max: yPlateau});

    expect(() => rover = new Rover(x, y, direction, plateau)).to.throw(Error, 'Rover positions must be integers')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when both x and y parameters are incorrect', () => {
    x = faker.datatype.float({max: xPlateau});
    y = faker.datatype.float({max: yPlateau});

    expect(() => rover = new Rover(x, y, direction, plateau)).to.throw(Error, 'Rover positions must be integers')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when direction parameter is incorrect', () => {
    direction = faker.datatype.string() as Direction;

    expect(() => rover = new Rover(x, y, direction, plateau)).to.throw(Error, `Rover direction must be 'N', 'S', 'E' or 'W'`)
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when rover x position is greater than plateau size', () => {
    x = faker.datatype.number({min: xPlateau + 1});

    expect(() => rover = new Rover(x, y, direction, plateau)).to.throw(Error, 'Rover position must be less than plateau size')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when rover y position is greater than plateau size', () => {
    y = faker.datatype.number({min: yPlateau + 1});

    expect(() => rover = new Rover(x, y, direction, plateau)).to.throw(Error, 'Rover position must be less than plateau size')
    expect(rover).to.be.eq(undefined);
  })

  it('should give error when rover both x and y positions are greater than plateau size', () => {
    x = faker.datatype.number({min: xPlateau + 1});
    y = faker.datatype.number({min: yPlateau + 1});

    expect(() => rover = new Rover(x, y, direction, plateau)).to.throw(Error, 'Rover position must be less than plateau size')
    expect(rover).to.be.eq(undefined);
  })

  it('should rotate right without moving', () => {
    rover = new Rover(x, y, Direction.North, plateau);

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
    rover = new Rover(x, y, Direction.North, plateau);

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

  it(`should move to current direction and don't change the direction`, () => {
    x = 0;
    y = 0;
    rover = new Rover(x, y, Direction.North, plateau);

    rover.move();

    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y + 1);
    expect(rover.direction).to.be.eq(Direction.North);

    x = plateau.x;
    y = plateau.y;

    rover = new Rover(x, y, Direction.South, plateau);

    rover.move();

    expect(rover.x).to.be.eq(x);
    expect(rover.y).to.be.eq(y - 1);
    expect(rover.direction).to.be.eq(Direction.South);

    x = 0;
    y = 0;

    rover = new Rover(x, y, Direction.East, plateau);

    rover.move();

    expect(rover.x).to.be.eq(x + 1);
    expect(rover.y).to.be.eq(y);
    expect(rover.direction).to.be.eq(Direction.East);

    x = plateau.x;
    y = plateau.y;

    rover = new Rover(x, y, Direction.West, plateau);

    rover.move();

    expect(rover.x).to.be.eq(x - 1);
    expect(rover.y).to.be.eq(y);
    expect(rover.direction).to.be.eq(Direction.West);
  })

  it(`should give error if try to move outside plateau`, () => {
    x = plateau.x;
    y = plateau.y;
    rover = new Rover(x, y, Direction.North, plateau);

    expect(() => rover.move()).to.throw(Error, `Invalid input: you can\'t move outside the plateau`);

    x = 0;
    y = 0;

    rover = new Rover(x, y, Direction.South, plateau);

    expect(() => rover.move()).to.throw(Error, `Invalid input: you can\'t move outside the plateau`);

    x = plateau.x;
    y = plateau.y;
    rover = new Rover(x, y, Direction.East, plateau);

    expect(() => rover.move()).to.throw(Error, `Invalid input: you can\'t move outside the plateau`);

    x = 0;
    y = 0;

    rover = new Rover(x, y, Direction.West, plateau);

    expect(() => rover.move()).to.throw(Error, `Invalid input: you can\'t move outside the plateau`);
  })
})
