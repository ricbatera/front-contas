import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {
  items: MenuItem[];
  constructor( ) { }

  ngOnInit(): void {   

    this.items = [
      {
        label:"Dashboard",
        icon:"pi pi-fw pi-chart-bar",
        url: "/dashboard"
      },
      {
          label:'Novo',
          icon:'pi pi-fw pi-file',
          items:[
              {
                  label:'Saída',
                  icon:'pi pi-fw pi-minus',
                  url: "/saida"
              },
              {
                  label:'Entrada',
                  icon:'pi pi-fw pi-plus',
                  url:"/entrada"
              },
              {
                  separator:true
              },
              {
                  label:'Relatório',
                  icon:'pi pi-fw pi-check-square'
              }
          ]
      },
      {
          label:'Movimentar',
          icon:'pi pi-fw pi-pencil',
          items:[
              {
                  label:'Pagar Conta',
                  icon:'pi pi-fw pi-dollar'
              },
              {
                  label:'Receber Valor',
                  icon:'pi pi-fw pi-dollar'
              },
              {
                  label:'Alterar Conta',
                  icon:'pi pi-fw pi-align-center'
              },
          ]
      }
  ];
  }

}
