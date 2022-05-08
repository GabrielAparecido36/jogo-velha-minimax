import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayHumanComponent } from './pages/play-human/play-human.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/minimax',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
