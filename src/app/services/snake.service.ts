import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Direction, Snake } from '../types';

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
    let updatedSnake = this.snake$.value;
    updatedSnake.forEach((square) => {
      switch (this.direction$.value) {
        case Direction.UP:
          square.y -= 1;
          break;
        case Direction.DOWN:
          square.y += 1;
          break;
        case Direction.LEFT:
          square.x -= 1;
          break;
        case Direction.RIGHT:
          square.x += 1;
          break;
        default:
          alert('snakey has esacped 2 dimensional world');
          break;
      }
    });
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
