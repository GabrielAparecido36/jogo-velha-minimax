import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PlayHumanModule } from './play-human/play-human.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [PagesRoutingModule, CommonModule, PlayHumanModule],
})
export class PagesModule {}
