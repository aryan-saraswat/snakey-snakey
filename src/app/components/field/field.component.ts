import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  moveInterval: NodeJS.Timeout | undefined;

  constructor(private snakeService: SnakeService) {
    this.initialiseField();
  }

  ngOnInit(): void {
    console.log('in oninit');
    this.snakeService.getSnake().subscribe((occupiedSquares) => {
      this.updateField(occupiedSquares);
    });
    window.addEventListener('keyup', (event) => {
      this.snakeService.handleDirectionChange(event.key);
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
      x;
    }
  }

  getClass(square: Square) {
    return `square ${square.occupied ? 'occupied' : ''}`;
  }

  onStartGameClick() {
    // only for debugging
    this.moveInterval = setInterval(() => {
      this.snakeService.moveSnake();
    }, 500);
  }

  onPauseGameClick() {
    console.log('stopping timeout: ', this.moveInterval);
    clearInterval(this.moveInterval);
  }

  onAddClick() {
    this.snakeService.addToSnake();
  }

  ngOnDestroy(): void {
    this.snakeService.getSnake().unsubscribe();
  }
}
