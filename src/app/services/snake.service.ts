import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Snake } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  snake$ = new BehaviorSubject<Snake>([{ x: 9, y: 10 }]);

  constructor() {}

  getSnake() {
    return this.snake$;
  }

  addToSnake() {
    let currentEnd = this.snake$.value[this.snake$.value.length - 1];
    let nextSnake: Snake = [
      ...this.snake$.value,
      { x: currentEnd.x - 1, y: currentEnd.y },
    ];
    this.snake$.next(nextSnake);
  }
}
