import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraMenuComponent } from './barra-menu.component';

import { MenubarModule } from 'primeng/menubar';
import {ToolbarModule} from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    BarraMenuComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    FontAwesomeModule   
    
  ],
  exports:[
    BarraMenuComponent
  ]
})
export class BarraMenuModule { }
