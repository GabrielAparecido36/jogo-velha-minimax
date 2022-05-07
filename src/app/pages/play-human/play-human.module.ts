import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayHumanComponent } from './play-human.component';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PlayHumanComponent],
  exports: [PlayHumanComponent],
  imports: [CommonModule, ToastModule, ButtonModule],
  providers: [MessageService],
})
export class PlayHumanModule {}
