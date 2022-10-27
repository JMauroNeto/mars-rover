import { Direction, PositionModel, RoverModel } from '../model';

export const getPosition = (input: string): PositionModel => {
  const [x, y] = input.split(' ');

  return { x: +x, y: +y };
};

export const getRoverPosition = (input: string): Pick<RoverModel, 'x' | 'y' | 'direction'> => {
  const direction = input[input.length - 1] as Direction;

  return { ...getPosition(input), direction };
};
