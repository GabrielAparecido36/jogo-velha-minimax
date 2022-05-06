import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PlayHumanComponent } from './play-human/play-human.component';

@NgModule({
  declarations: [AboutComponent, PlayHumanComponent],
  exports:[PlayHumanComponent],
  imports: [PagesRoutingModule, CommonModule],
})
export class PagesModule {}
