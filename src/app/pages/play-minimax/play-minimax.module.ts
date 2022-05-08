import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayMinimaxComponent } from './play-minimax.component';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PlayMinimaxComponent],
  exports: [PlayMinimaxComponent],
  imports: [CommonModule, ToastModule, ButtonModule],
  providers: [MessageService],
})
export class PlayMinimaxModule {}
