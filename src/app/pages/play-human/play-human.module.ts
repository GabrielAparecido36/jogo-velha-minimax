import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayHumanComponent } from './play-human.component';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [PlayHumanComponent],
  exports: [PlayHumanComponent],
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
})
export class PlayHumanModule {}
