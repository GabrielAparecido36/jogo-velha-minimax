import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AboutComponent],
  exports: [AboutComponent],
  imports: [CommonModule, ToastModule, ButtonModule],
  providers: [MessageService],
})
export class AboutModule {}
