import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Familiar, ServFamilia } from '../../servicios/familia';

@Component({
  selector: 'app-c-familia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './c-familia.html',
  styleUrl: './c-familia.css',
})
export class CFamilia implements OnInit {

  familia: Familiar[] = [];  

  constructor(private servicioFamilia: ServFamilia) {}

  ngOnInit(): void {
    void this.cargarFamilia();
  }

  private async cargarFamilia(): Promise<void> {
    this.familia = await this.servicioFamilia.consultarFamilia();
  }
}
