import { Component, OnInit } from '@angular/core';
import { Responsavel } from './../../models/Responsavel';
import { ResponsaveisService } from './../../services/responsaveis.service';


@Component({
  selector: 'app-responsaveis',
  templateUrl: './responsaveis.component.html',
  styleUrls: ['./responsaveis.component.css']
})
export class ResponsaveisComponent implements OnInit {
  responsavel: Responsavel = {
    id:null,
    nome:null,
    sobrenome:null,
    dataCad:null
  }

  responsaveis: Responsavel[];

  constructor(private service: ResponsaveisService) { }

  ngOnInit(): void {    
  }

  salva(){  
    console.log(this.responsavel)  
    this.service.salvar(this.responsavel)
        .subscribe(
          response => {
            console.log(response);            
          },
          error => {
            console.log(error);
            alert(error.error);
          });
  } 

}
