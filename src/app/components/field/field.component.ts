import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class FieldComponent implements OnInit {
  size = 20;
  field: Square[][] = [];
  snake$ = new BehaviorSubject<Snake>([]);

  constructor(private snakeService: SnakeService) {
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

  ngOnInit(): void {
    this.snakeService.getSnake().subscribe((occupiedSquares) => {
      console.log(occupiedSquares);
      occupiedSquares.forEach((occupiedSquare) => {
        this.field[occupiedSquare.x][occupiedSquare.y].occupied = true;
      });
    });
  }

  getClass(square: Square) {
    return `square ${square.occupied ? 'occupied' : ''}`;
  }

  onClick() {
    // only for debugging
    this.snakeService.addToSnake();
  }
}
