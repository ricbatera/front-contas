import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

//icones
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {
  itemsMenuSair: MenuItem[];
//icones
  faUserCircle = faUserCircle;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.redirecionaDashboard();

    this.itemsMenuSair = [
      {
        label: 'Editar meus dados',
        icon: 'pi pi-align-left'

      },
      {
        label: 'Novo Responsável',
        icon: 'pi pi-id-card',
        url: "/responsaveis"
      },
      {
        label: 'Configurações',
        icon: 'pi pi-sliders-v',
        url: "/meiosPagto"
      },
      {
        label: 'Sair',
        icon: 'pi pi-power-off'
      }
    ];
  }

  redirecionaDashboard() {
    // esse código precisa ser melhorado, uma vez que se acessar a URL padrão ele não redireciona mais para dashbard
    let teste = sessionStorage.getItem('carregada');
    if (teste == "true") {
    } else {
      this.router.navigate(['/dashboard']);
      sessionStorage.setItem('carregada', "true");
    }

  }


}
