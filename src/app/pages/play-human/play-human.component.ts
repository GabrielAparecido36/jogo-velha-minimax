import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-play-human',
  templateUrl: './play-human.component.html',
  styleUrls: ['./play-human.component.scss'],
  providers: [MessageService],
})
export class PlayHumanComponent implements OnInit {
  public rowArray = new Array(3);
  public positions: any[] = [];
  public currentPlayer: number = 1;
  public victory: number = -1;
  public lockGame: boolean = false;
  constructor(private messageService: MessageService) {}

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
    if (this.lockGame) return;
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
    // Verifica diagonal
    if (
      this.positions[1][1] &&
      ((this.positions[0][0] == this.positions[1][1] &&
        this.positions[0][0] == this.positions[2][2]) ||
        (this.positions[0][2] == this.positions[1][1] &&
          this.positions[0][2] == this.positions[2][0]))
    ) {
      this.positions[1][1] == 'O' ? (this.victory = 1) : (this.victory = 0);
      this.messageService.add({
        severity: 'victory',
        summary: 'Vitória',
        detail: `Jogador ${this.victory + 1} é o vencedor!`,
        icon: 'pi-check-circle',
      });
      this.lockGame = true;
      return;
    }

    for (let i = 0; i < 3; i++) {
      // Verifica coluna
      if (
        this.positions[0][i] &&
        this.positions[0][i] == this.positions[1][i] &&
        this.positions[0][i] == this.positions[2][i]
      ) {
        this.positions[0][i] == 'O' ? (this.victory = 1) : (this.victory = 2);
        this.messageService.add({
          severity: 'victory',
          summary: 'Vitória',
          detail: `Jogador ${this.victory + 1} é o vencedor!`,
          icon: 'pi-check-circle',
        });
        this.lockGame = true;
        return;
      }
      // Verifica linha
      if (
        this.positions[i][0] &&
        this.positions[i][0] == this.positions[i][1] &&
        this.positions[i][0] == this.positions[i][2]
      ) {
        this.positions[i][0] == 'O' ? (this.victory = 1) : (this.victory = 2);
        this.messageService.add({
          severity: 'victory',
          summary: 'Vitória',
          detail: `Jogador ${this.victory + 1} é o vencedor!`,
          icon: 'pi-check-circle',
        });
        this.lockGame = true;
        return;
      }
    }

    if (this.victory === -1 && this.verifyTiedGame()) {
      this.victory = 0;
      this.messageService.add({
        severity: 'tied-game',
        summary: 'Empate',
        detail: `Jogo empatado!`,
        icon: 'pi-info-circle',
      });
    }
  }

  public verifyTiedGame(): boolean {
    let notFinish = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.positions[i][j]) {
          notFinish = false;
          return notFinish;
        }
      }
    }
    return notFinish;
  }
}
