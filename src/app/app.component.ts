import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'jogo-velha-minmax';
  public items: MenuItem[] = [];
  public year: any;
  public theme: any;
  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.theme = this.getTheme();
    this.setTheme(this.theme);
    this.year = new Date().getFullYear();
    this.items = [
      {
        label: 'Jogos',
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
        label: 'Sobre',
        icon: 'pi pi-info-circle',
        url: 'pages/about',
      },
    ];
  }

  public navigatePage(url: string) {
    this.router.navigate([url]);
  }

  public getTheme() {
    const theme = localStorage.getItem('theme');
    if (theme && theme != null && theme != 'null') {
      return theme;
    } else {
      localStorage.setItem('theme', 'md-dark-indigo');
      return 'md-dark-indigo';
    }
  }

  public changeTheme(theme: string) {
    if (theme == 'md-dark-indigo') {
      localStorage.removeItem('theme');
      localStorage.setItem('theme', 'md-light-indigo');
    } else {
      localStorage.removeItem('theme');
      localStorage.setItem('theme', 'md-dark-indigo');
    }
    this.theme = this.getTheme();
    this.setTheme(this.getTheme());
  }

  public setTheme(theme: any) {
    localStorage.removeItem('theme');
    localStorage.setItem('theme', theme);
    this.theme = theme;
    this.themeService.switchTheme(this.theme);
  }
}
