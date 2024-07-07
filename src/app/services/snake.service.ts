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
      square.x += 1;
    });
    this.snake$.next(updatedSnake);
  }
}
