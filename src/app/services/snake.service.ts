import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinates, Direction, Snake } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  snake$ = new BehaviorSubject<Snake>([{ x: 9, y: 10 }]);
  direction$ = new BehaviorSubject<Direction>(Direction.RIGHT);

  constructor() {}

  getSnake() {
    return this.snake$;
  }

  getDirection() {
    return this.direction$;
  }

  addToSnake() {
    let currentEnd = this.snake$.value[this.snake$.value.length - 1];
    let nextSnake: Snake = [
      ...this.snake$.value,
      { x: currentEnd.x - 1, y: currentEnd.y },
    ];
    this.snake$.next(nextSnake);
  }

  moveSnake() {
    let currentSnake = this.snake$.value;
    let updatedSnake: Snake = [];

    const head: Coordinates = {
      x: currentSnake[0].x,
      y: currentSnake[0].y,
    };

    switch (this.direction$.value) {
      case Direction.UP:
        head.y -= 1;
        break;
      case Direction.DOWN:
        head.y += 1;
        break;
      case Direction.LEFT:
        head.x -= 1;
        break;
      case Direction.RIGHT:
        head.x += 1;
        break;
      default:
        alert('snakey has escaped 2 dimensional world');
        break;
    }

    updatedSnake.push(head);

    for (let i = 1; i < currentSnake.length; i++) {
      const previousSegment = currentSnake[i - 1];
      updatedSnake.push(previousSegment);
    }

    this.snake$.next(updatedSnake);
  }

  handleDirectionChange(pressedKey: string) {
    let currentDirection = this.direction$.value;
    let nextDirection = currentDirection;
    switch (pressedKey) {
      case 'ArrowLeft':
        if (currentDirection !== Direction.RIGHT)
          nextDirection = Direction.LEFT;
        break;
      case 'ArrowRight':
        if (currentDirection !== Direction.LEFT)
          nextDirection = Direction.RIGHT;
        break;
      case 'ArrowUp':
        if (currentDirection !== Direction.DOWN) nextDirection = Direction.UP;
        break;
      case 'ArrowDown':
        if (currentDirection !== Direction.UP) nextDirection = Direction.DOWN;
        break;
      default:
        console.log('going nowhere');
        break;
    }
    this.direction$.next(nextDirection);
  }
}
