import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServFamilia } from '../../servicios/familia';

@Component({
  selector: 'app-c-familia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './c-familia.html',
  styleUrl: './c-familia.css',
})
export class CFamilia implements OnInit {

  familia: any[] = [];  

  constructor(private servicioFamilia: ServFamilia) {}

  ngOnInit(): void {
    this.familia = this.servicioFamilia.consultarFamilia();
    console.log(this.familia);
  }
}
