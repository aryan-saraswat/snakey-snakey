import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnakeService } from '../../services/snake.service';
import { Snake, Square } from '../../types';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [NgFor],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css',
})
export class FieldComponent implements OnInit, OnDestroy {
  size = 20;
  field: Square[][] = [];
  snake$ = new BehaviorSubject<Snake>([]);
  moveInterval: NodeJS.Timeout | undefined;

  constructor(private snakeService: SnakeService) {
    this.initialiseField();
  }

  ngOnInit(): void {
    console.log('in oninit');
    this.snakeService.getSnake().subscribe((occupiedSquares) => {
      console.log(occupiedSquares);
      this.updateField(occupiedSquares);
    });
  }

  initialiseField() {
    for (let i = 0; i < this.size; i++) {
      this.field[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.field[i][j] = {
          position: {
            x: i,
            y: j,
          },
          occupied: false,
        };
      }
    }
  }

  updateField(snake: Snake) {
    if (snake[0].x < 20) {
      this.field.forEach((row) =>
        row.forEach((square) => (square.occupied = false))
      );

      snake.forEach((occupiedSquare) => {
        this.field[occupiedSquare.x][occupiedSquare.y].occupied = true;
      });
    } else {
      alert('snake reached boundary???');
    }
  }

  getClass(square: Square) {
    return `square ${square.occupied ? 'occupied' : ''}`;
  }

  onMoveClick() {
    // only for debugging
    this.moveInterval = setInterval(() => {
      console.log('in timeout');
      this.snakeService.moveSnake();
    }, 1000);
  }

  onStopMoveClick() {
    console.log('stopping timeout: ', this.moveInterval);
    clearTimeout(this.moveInterval);
  }

  onAddClick() {
    this.snakeService.addToSnake();
  }

  ngOnDestroy(): void {
    this.snakeService.getSnake().unsubscribe();
  }
}
