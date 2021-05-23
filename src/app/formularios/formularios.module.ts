import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaidasComponent } from './saidas/saidas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule, } from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import { ResponsaveisComponent } from './responsaveis/responsaveis/responsaveis.component';
import { MeiosPagtoComponent } from './meios-pagto/meios-pagto.component';
import { TesteComponent } from './teste/teste.component';
import { EntradasComponent } from './entradas/entradas.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ListagemSaidasComponent } from './listagem-saidas/listagem-saidas.component';
import {TableModule} from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';


@NgModule({
  declarations: [
    SaidasComponent,
    ResponsaveisComponent,
    MeiosPagtoComponent,
    TesteComponent,
    EntradasComponent,
    ListagemSaidasComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    ToggleButtonModule,
    TableModule,
    FontAwesomeModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    RadioButtonModule
  ],
  exports:[
    SaidasComponent
  ]
})
export class FormulariosModule { }
