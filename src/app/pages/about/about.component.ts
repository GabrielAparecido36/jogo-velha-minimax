import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [MessageService],
})
export class AboutComponent implements OnInit {
  public developers: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.initDevelopers();
  }

  public initDevelopers() {
    this.developers = [
      {
        name: 'Gabriel Aparecido de Sá',
        rgm: '2062563-4',
        position: 'Front-end JR Developer',
        resume:
          'Desenvolvedor Angular há quase 2 anos no mercado de tecnologia.',
        img: '/assets/imgs/gabriel.jpg',
      },
      {
        name: 'Gustavo Cesar Ribero de Souza',
        rgm: '2071961-2',
        position: 'Full Stack JR Developer',
        resume:
          'Desenvolvedor Java Spring e Vue há quase 2 anos no mercado de tecnologia.',
        img: '/assets/imgs/gustavo.jpg',
      },
      {
        name: 'Murilo Amais Bracero',
        rgm: '2355617-0',
        position: 'Back-end PL Developer',
        resume:
          'Desenvolvedor Java Spring e Node há 3 anos no mercado de tecnologia.',
        img: '/assets/imgs/murilo.jpg',
      },
    ];
  }
}
