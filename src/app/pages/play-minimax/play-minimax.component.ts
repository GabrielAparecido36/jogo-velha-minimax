import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-play-minimax',
  templateUrl: './play-minimax.component.html',
  styleUrls: ['./play-minimax.component.scss'],
  providers: [MessageService],
})
export class PlayMinimaxComponent implements OnInit {
  public rowArray = new Array(3);
  public positions: any[] = [];
  public currentPlayer: number = 1;
  public victory: number = -1;
  public lockGame: boolean = false;
  public lineVictory: any[] = [];
  public tree: any;
  public stateNode: any;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.initPositions();
    this.initTree();
  }

  public initTree() {
    this.createTree();
    this.stateNode = this.tree.source;
  }

  public initPositions() {
    for (let i = 0; i < 3; i++) {
      this.positions[i] = [];
      for (let j = 0; j < 3; j++) {
        this.positions[i][j] = undefined;
      }
    }
  }

  public restartGame() {
    this.victory = -1;
    this.currentPlayer = 1;
    this.lockGame = false;
    this.lineVictory = [];
    this.positions = [];
    this.initTree();
    this.initPositions();
  }

  public humanTurn(row: number, column: number) {
    if (this.lockGame) return;
    if (!this.positions[row][column]) {
      this.positions[row][column] = 'O';
      this.verifyVictory(true);
    }
  }

  public verifyVictory(player: boolean = false) {
    // Verifica diagonal
    if (
      this.positions[1][1] &&
      ((this.positions[0][0] == this.positions[1][1] &&
        this.positions[0][0] == this.positions[2][2]) ||
        (this.positions[0][2] == this.positions[1][1] &&
          this.positions[0][2] == this.positions[2][0]))
    ) {
      if (
        this.positions[0][0] == this.positions[1][1] &&
        this.positions[0][0] == this.positions[2][2]
      ) {
        this.setLineVictory([`${0},${0}`, `${1},${1}`, `${2},${2}`]);
      } else {
        this.setLineVictory([`${0},${2}`, `${1},${1}`, `${2},${0}`]);
      }
      this.positions[1][1] == 'O' ? (this.victory = 1) : (this.victory = 2);
      this.messageService.add({
        severity: 'victory',
        summary: 'Vitória',
        detail: `Jogador ${this.victory} é o vencedor!`,
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
        this.setLineVictory([`${0},${i}`, `${1},${i}`, `${2},${i}`]);
        this.positions[0][i] == 'O' ? (this.victory = 1) : (this.victory = 2);
        this.messageService.add({
          severity: 'victory',
          summary: 'Vitória',
          detail: `Jogador ${this.victory} é o vencedor!`,
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
        this.setLineVictory([`${i},${0}`, `${i},${1}`, `${i},${2}`]);
        this.positions[i][0] == 'O' ? (this.victory = 1) : (this.victory = 2);
        this.messageService.add({
          severity: 'victory',
          summary: 'Vitória',
          detail: `Jogador ${this.victory} é o vencedor!`,
          icon: 'pi-check-circle',
        });
        this.lockGame = true;
        return;
      }
    }

    if (this.victory === -1 && this.verifyTiedGame()) {
      this.victory = 0;
      this.lineVictory = [];
      this.messageService.add({
        severity: 'tied-game',
        summary: 'Empate',
        detail: `Jogo empatado!`,
        icon: 'pi-info-circle',
      });
    }

    if (this.victory === -1 && !this.verifyTiedGame() && player) {
      this.CPUTurn();
    }
  }

  public CPUTurn() {
    this.addMove(this.positions, 'O');
    for (let i = 0; i < 3; i++) {
      if (!this.compareArrays(this.stateNode.value[i], this.positions[i])) {
        for (let j = 0; j < 3; j++) {
          if (this.positions[i][j] != this.stateNode.value[i][j]) {
            this.positions[i][j] = this.stateNode.value[i][j];
            break;
          }
        }
        break;
      }
    }
    this.verifyVictory();
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

  public setLineVictory(lineVictory: any[]) {
    this.lineVictory = [...lineVictory];
  }

  public compareArrays(array: any, anotherArray: any) {
    for (let i = 0; i <= 2; i++) {
      if (Array.isArray(array[i]) && Array.isArray(anotherArray[i])) {
        if (!this.compareArrays(array[i], anotherArray[i])) {
          return false;
        }
      } else if (array[i] != anotherArray[i]) {
        return false;
      }
    }
    return true;
  }

  public createNode(value: any, parent?: any) {
    let obj = {
      value,
      parent: parent ? [parent] : [],
      childrens: [],
      compare: (anotherNode: any) => {
        return this.compareArrays(obj.value, anotherNode.value);
      },
    };
    return obj;
  }

  public createTree() {
    let source = this.createNode([[], [], []]);
    let addNode = (node: any) => {
      if (!source) {
        source = node;
      } else {
        this.createAddNode(source, node);
      }
    };
    this.tree = { source, addNode };
  }

  public createAddNode(actual: any, node: any) {
    if (node.compare(actual)) {
      node.parent[0].childrens.push(actual);
      actual.parent.push(node.parent[0]);
      return true;
    } else if (
      node.parent.some((parent: any) => parent.compare(actual)) &&
      !actual.childrens.some((childrenNode: any) =>
        this.compareArrays(childrenNode.value, node.value)
      )
    ) {
      actual.childrens.push(node);
      return true;
    } else {
      for (const children of actual.childrens) {
        if (this.createAddNode(children, node)) {
          return true;
        }
      }
    }
    return false;
  }

  public mapMovementsGame(stateMatriz: any, move: any) {
    let childrens = [...this.stateNode.childrens];
    this.stateNode = childrens.find((children) =>
      this.compareArrays(stateMatriz, children.value)
    );

    let lengthChildrens = childrens.length;
    while (lengthChildrens > 0) {
      const childrenNode = childrens.shift();
      this.completePossibilites(childrenNode, move);

      if (childrenNode.childrens.length > 0) {
        childrens.push(...childrenNode.childrens);
      }

      if (--lengthChildrens == 0) {
        lengthChildrens = childrens.length;
        move = move === 'X' ? 'O' : 'X';

        if (lengthChildrens >= 80) {
          break;
        }
      }
    }
  }

  public addMove(stateMatriz: any, move: any) {
    if (!this.stateNode.parent.length) {
      this.completePossibilites(this.stateNode, move);
      move = 'X';
    }
    this.mapMovementsGame(stateMatriz, 'X');
    this.findMove(this.stateNode);
  }

  public completePossibilites(stateNode: any, move: any) {
    const copyMatriz = [
      [...stateNode.value[0]],
      [...stateNode.value[1]],
      [...stateNode.value[2]],
    ];
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (!copyMatriz[i][j]) {
          copyMatriz[i] = [...stateNode.value[i]];
          copyMatriz[i][j] = move;

          const node = this.createNode(
            [[...copyMatriz[0]], [...copyMatriz[1]], [...copyMatriz[2]]],
            stateNode
          );
          this.tree.addNode(node);
        }
      }
      copyMatriz[i] = [...stateNode.value[i]];
    }
  }

  public findMove(node: any) {
    const originalCall = node === this.stateNode;
    const stateNode = this.stateNode;
    const moves: any = [];

    if (!node.childrens.length) {
      return { node, utility: this.verifyUtility(node.value) };
    } else {
      for (const next of node.childrens) {
        for (const parent of next.parent) {
          this.stateNode = parent;
          const nextUtility = this.findMove(next);
          moves.push({ node: next, utility: nextUtility.utility });
        }
      }
    }

    this.stateNode = stateNode;
    const move = moves.reduce((definedMove: any, move: any) =>
      move.utility >= definedMove.utility ? move : definedMove
    );
    if (originalCall) {
      for (const localMove of moves) {
        localMove.utility += this.verifyUtility(localMove.node.value);
      }
      this.stateNode = moves.reduce((definedMove: any, move: any) =>
        move.utility > definedMove.utility ? move : definedMove
      ).node;
    } else {
      return move;
    }
  }

  public getDiagonal(matriz: any, lineStart: any) {
    const diagonal = [];
    lineStart = -lineStart;
    for (let i = 0; i <= 2; i++) {
      diagonal.push(matriz[Math.abs(lineStart++)][i]);
    }
    return diagonal;
  }

  public verifyUtility(matriz: any) {
    let total = 0;
    for (let i = 0; i <= 2; i++) {
      let line = matriz[i];
      const lineParentX = [
        this.stateNode.value[0][i],
        this.stateNode.value[1][i],
        this.stateNode.value[2][i],
      ];
      let column = [matriz[0][i], matriz[1][i], matriz[2][i]];
      const columnParentX = [
        this.stateNode.value[0][i],
        this.stateNode.value[1][i],
        this.stateNode.value[2][i],
      ];
      if (
        line.filter((value: any) => value === 'X').length === 3 ||
        column.filter((value: any) => value === 'X').length === 3
      ) {
        return 6;
      }
    }
    const valueDiagonals = [0, 2];
    for (const valueDiagonal of valueDiagonals) {
      const diagonal = this.getDiagonal(matriz, valueDiagonal);
      const diagonalParent = this.getDiagonal(
        this.stateNode.value,
        valueDiagonal
      );
      if (diagonal.filter((value: any) => value === 'X').length === 3) {
        return 6;
      } else if (
        !this.compareArrays(diagonal, diagonalParent) &&
        diagonal.filter((value: any) => value === 'O').length === 1
      ) {
        if (diagonal[1] != diagonalParent[1] && diagonal[1] === 'X') {
          return 4;
        } else if (!this.compareArrays(matriz[1], this.stateNode.value[1])) {
          total += 2;
        }
      } else if (
        !this.compareArrays(diagonal, diagonalParent) &&
        diagonal.filter((value: any) => value === 'O').length === 2
      ) {
        if (diagonal[1] != diagonalParent[1] && diagonal[1] === 'X') {
          return 4;
        } else {
          for (const j of valueDiagonals) {
            const column = [matriz[0][j], matriz[1][j], matriz[2][j]];
            const columnParent = [
              this.stateNode.value[0][j],
              this.stateNode.value[1][j],
              this.stateNode.value[2][j],
            ];
            if (!this.compareArrays(column, columnParent)) {
              return 4;
            }
          }
        }
      }
    }
    for (let i = 0; i <= 2; i++) {
      let line = matriz[i];
      let column = [matriz[0][i], matriz[1][i], matriz[2][i]];

      const lineParent = this.stateNode.value[i];
      const columnParent = [
        this.stateNode.value[0][i],
        this.stateNode.value[1][i],
        this.stateNode.value[2][i],
      ];
      if (
        !this.compareArrays(line, lineParent) &&
        line.filter((value: any) => value === 'O').length === 2
      ) {
        return 5;
      } else if (
        !this.compareArrays(column, columnParent) &&
        column.filter((value: any) => value === 'O').length === 2
      ) {
        return 5;
      } else if (line.filter((value: any) => value === 'O').length === 1) {
        if (i == 1 && line[1] !== lineParent[1] && line[1] === 'X') {
          return 4;
        }
      } else {
        total +=
          0.33 * Math.max(line.filter((value: any) => value !== 'O').length, 0);
      }
    }

    return total;
  }
}
