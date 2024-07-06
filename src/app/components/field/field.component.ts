import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Square } from '../../types';

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

  ngOnInit(): void {
    for (let i = 0; i < this.size; i++) {
      this.field[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.field[i][j] = {
          occupied: false,
        };
      }
    }
    console.log(this.field);
  }
}
