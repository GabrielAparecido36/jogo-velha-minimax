import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PlayHumanComponent } from './play-human/play-human.component';
import { PlayMinimaxComponent } from './play-minimax/play-minimax.component';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: 'human',
        component: PlayHumanComponent
      },
      {
        path: 'minimax',
        component: PlayMinimaxComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
