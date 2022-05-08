import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'jogo-velha-minmax';
  public items: MenuItem[] = [];
  public year: any;
  constructor(private router: Router) {}

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.items = [
      {
        label: 'Página inicial',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Humano x Minimax',
            icon: 'pi pi-play',
            url: 'pages/minimax',
          },
          {
            label: 'Humano x Humano',
            icon: 'pi pi-play',
            url: 'pages/human',
          },
        ],
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
      },
      {
        label: 'Sobre',
        icon: 'pi pi-info-circle',
      },
    ];
  }

  public navigatePage(url: string) {
    this.router.navigate([url]);
  }
}
