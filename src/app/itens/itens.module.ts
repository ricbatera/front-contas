import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensComponent } from './itens.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//primeng
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ItensComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule
  ],
  exports:[
    ItensComponent
  ]
})
export class ItensModule { }
