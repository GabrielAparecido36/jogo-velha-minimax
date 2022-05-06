import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-human',
  templateUrl: './play-human.component.html',
  styleUrls: ['./play-human.component.scss'],
})
export class PlayHumanComponent implements OnInit {
  public rowArray = new Array(3);
  public positions: any[] = [];
  public currentPlayer: number = 1;
  constructor() {}

  ngOnInit(): void {
    this.initPositions();
  }

  public initPositions() {
    for (let i = 0; i < 3; i++) {
      this.positions[i] = [];
      for (let j = 0; j < 3; j++) {
        this.positions[i][j] = null;
      }
    }
  }

  public humanTurn(row: number, column: number) {
    if (!this.positions[row][column]) {
      if (this.currentPlayer === 1) {
        this.positions[row][column] = 'O';
        this.currentPlayer = 2;
      } else {
        this.positions[row][column] = 'X';
        this.currentPlayer = 1;
      }
      this.verifyVictory();
    }
  }

  public verifyVictory() {
    if (
      this.positions[1][1] &&
      ((this.positions[0][0] == this.positions[1][1] &&
        this.positions[0][0] == this.positions[2][2]) ||
        (this.positions[0][2] == this.positions[1][1] &&
          this.positions[0][2] == this.positions[2][0]))
    ) {
      console.log(`${this.positions[1][1]} é o vencedor`);
    }
    for (let i = 0; i < 3; i++) {
      // Verifica coluna
      if (
        this.positions[0][i] &&
        this.positions[0][i] == this.positions[1][i] &&
        this.positions[0][i] == this.positions[2][i]
      ) {
        console.log(`${this.positions[0][i]} É O VENCEDOR!`);
      }
      // Verifica linha
      if (
        this.positions[i][0] &&
        this.positions[i][0] == this.positions[i][1] &&
        this.positions[i][0] == this.positions[i][2]
      ) {
        console.log(`${this.positions[i][0]} É O VENCEDOR!`);
      }
    }
  }
}
