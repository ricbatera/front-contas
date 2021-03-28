import { ListagemSaidasComponent } from './formularios/listagem-saidas/listagem-saidas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntradasComponent } from './formularios/entradas/entradas.component';
import { MeiosPagtoComponent } from './formularios/meios-pagto/meios-pagto.component';
import { ResponsaveisComponent } from './formularios/responsaveis/responsaveis/responsaveis.component';
import { SaidasComponent } from './formularios/saidas/saidas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : 'saida', component : SaidasComponent },
  { path : 'responsaveis', component : ResponsaveisComponent },
  { path : 'meiosPagto', component : MeiosPagtoComponent },
  { path : 'entrada', component : EntradasComponent },
  { path : 'dashboard', component : DashboardComponent },
  { path : 'listSaidas', component : ListagemSaidasComponent },
  //{ path : 'meiosPagto', component : TesteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
