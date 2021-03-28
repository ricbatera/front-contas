import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {
  teste: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  troca(){
    if(this.teste){
      this.teste = false;
      console.log(this.teste);
    }else{
      this.teste = true;
      console.log(this.teste);
    }
  }

}
