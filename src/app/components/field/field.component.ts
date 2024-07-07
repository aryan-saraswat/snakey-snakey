import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnakeService } from '../../services/snake.service';
import { Direction, Snake, Square } from '../../types';

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
      console.log(occupiedSquares);
      this.updateField(occupiedSquares);
    });
    window.addEventListener('keyup', (event) => {
      this.handleDirectionChange(event.key);
    });
  }

  handleDirectionChange(pressedKey: string) {
    let currentDirection = this.snakeService.getDirection().value;
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
    this.snakeService.getDirection().next(nextDirection);
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
    }, 500);
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
