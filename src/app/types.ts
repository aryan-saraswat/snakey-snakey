export type Square = {
  occupied: boolean;
  position: Coordinates;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Snake = Array<Coordinates>;

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
