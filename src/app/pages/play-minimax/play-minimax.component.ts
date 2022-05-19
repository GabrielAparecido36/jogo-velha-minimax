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
  public action = '>';

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

  public createNode(value: any, parent?: any, player?: any) {
    let obj = {
      value,
      parent,
      childrens: [],
      player,
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
    if (actual.compare(node.parent) && !actual.childrens.some((children: any) => node.compare(children))) {
      if (actual.parent) {
        const childrenWithNode = actual.parent.childrens.find((children: any) => children.childrens.some((childrenChildren: any) => childrenChildren.compare(node)))
        if (childrenWithNode) {
          node = childrenWithNode.childrens.find((children: any) => children.compare(node))
        }
      }
      
      actual.childrens.push(node)
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
    this.stateNode = this.stateNode.childrens.find((children: any) => this.compareArrays(stateMatriz, children.value));
    let childrens = [this.stateNode];

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
      }
    }
    
  }

  public addMove(stateMatriz: any, move: any) {
    if (!this.stateNode.childrens.length) {
      this.completePossibilites(this.stateNode, move);
      this.mapMovementsGame(stateMatriz, 'X');
    } else {
      this.stateNode = this.stateNode.childrens.find((children: any) => this.compareArrays(stateMatriz, children.value));
    }
    this.getNextAction(this.stateNode)
    this.findMove(this.stateNode, true);
  }

  public completePossibilites(stateNode: any, move: any) {
    if (!this.verifyUtility(stateNode.value)) {
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
              stateNode,
              move
            );
            // stateNode.childrens.push(node);
            stateNode.childrens.push(node)
          }
        }
        copyMatriz[i] = [...stateNode.value[i]];
      }
    }
  }

  public findMove(node: any, originalCall: boolean) {
    const stateNode = this.stateNode;
    const moves: any = [];

    if (!node.childrens.length) {
      node.utility = this.verifyUtility(node.value)
      return node;
    } else {
      for (const next of node.childrens) {
        // for (const parent of next.parent) {
          this.stateNode = next;
          const nextUtility = this.findMove(next, false);
          moves.push(nextUtility);
        // }
      }
    }
    
    this.getNextAction(node);
    this.stateNode = stateNode;
    const finalMove = moves.reduce(this.getMinMax.bind(this));
    if (originalCall) {
      const possibilitesMoves = moves.filter((move: any) => move.utility === finalMove.utility)
      this.stateNode = possibilitesMoves[Math.floor(possibilitesMoves.length * (Math.random()))];
    } else {
      node.utility = finalMove.utility;
      return node;
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
    let empties = 0;
    // for (let i = 0; i < 3; i++) {
    //   let line = matriz[i];

    //   const lineParent = [
    //     this.stateNode.value[i][0],
    //     this.stateNode.value[i][1],
    //     this.stateNode.value[i][2],
    //   ];

    //   const alteredLine = !this.compareArrays(line, lineParent)

    //   for (let j = 0; j < 3; j++) {
    //     let column = [matriz[0][j], matriz[1][j], matriz[2][j]];

    //     const columnParent = [
    //       this.stateNode.value[0][j],
    //       this.stateNode.value[1][j],
    //       this.stateNode.value[2][j],
    //     ];
  
    //     const alteredColumn = !this.compareArrays(column, columnParent)
  
    //     if (line.filter((value: any) => value === 'X').length === 3 || column.filter((value: any) => value === 'X').length === 3) {
    //       total = 1;
    //       break;
    //     } /*else if (alteredLine && line.filter((value: any) => value === 'O').length === 2 || alteredColumn && column.filter((value: any) => value === 'O').length === 2) {
    //       return 1;
    //     } */else if (line.filter((value: any) => value === 'O').length === 3 || column.filter((value: any) => value === 'O').length === 3) {
    //       total = -1;
    //       break;
    //     } else {
          
    //     }
    //   }

    //   brancos += line.filter((value: any) => value != undefined).length
    // }

    for (let i = 0; i < 3; i++) {
      const line = matriz[i];
      if (line.filter((value: any) => value === 'X').length === 3 || line.filter((value: any) => value === 'O').length == 3) {
        total = line[0] === 'X' ? 1 : -1;
        break;
      }
    }

    if (!total) {
      for (let i = 0; i < 3; i++) {
        const column = [matriz[0][i], matriz[1][i], matriz[2][i]];
        if (column.filter((value: any) => value === 'X').length === 3 || column.filter((value: any) => value === 'O').length === 3) {
          total = column[0] === 'X' ? 1 : -1;
          break;
        }
      }
    }

    if (!total) {
      const valueDiagonals = [0, 2];
      for (const valueDiagonal of valueDiagonals) {
        const diagonal = this.getDiagonal(matriz, valueDiagonal);
        const diagonalParent = this.getDiagonal(this.stateNode.value, valueDiagonal);

        if (diagonal.filter((value: any) => value === 'X').length === 3 || diagonal.filter((value: any) => value === 'O').length === 3) {
          total = diagonal[0] === 'X' ? 1 : -1;
          break;
        } /*else if (!this.compareArrays(diagonal, diagonalParent) && diagonal.filter((value: any) => value === 'O').length === 2) {
          total = 1;
          break;
        } */
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!matriz[i][j]) {
          empties += 1;
        }
      }
    }

    return total * (empties + 1);
  }

  public getNextAction(node: any) {
    this.action = node.player === 'O' ? '>' : '<'
  }

  public getMinMax(move1: any, move2: any) {
    if (this.action === '>') {
      if (move1.utility > move2.utility) {
        return move1;
      } else {
        return move2;
      }
    } else if (this.action === '<') {
      if (move1.utility < move2.utility) {
        return move1;
      } else {
        return move2;
      }
    }
  }
}
