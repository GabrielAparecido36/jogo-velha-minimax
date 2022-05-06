import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayHumanComponent } from './play-human/play-human.component';

const routes: Routes = [
  {
    path: 'human',
    component: PlayHumanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
