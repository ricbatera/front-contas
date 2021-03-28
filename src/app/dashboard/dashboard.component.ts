import { ResponsaveisService } from './../formularios/services/responsaveis.service';
import { Component, OnInit } from '@angular/core';
import { Responsavel } from '../formularios/models/Responsavel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  
  respSelected;

  constructor(
  ) { }

  ngOnInit(): void {
    
  }

  
 }
