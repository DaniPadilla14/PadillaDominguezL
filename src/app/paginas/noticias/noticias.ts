import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaItem, ServNoticias } from '../../servicios/noticias';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.html',
  styleUrls: ['./noticias.css']
})
export class Noticias implements OnInit {

  noticias: NoticiaItem[] = [];

  constructor(private servNoticias: ServNoticias){}

  ngOnInit(): void {
    void this.cargarNoticias();
  }

  private async cargarNoticias(): Promise<void> {
    this.noticias = await this.servNoticias.consultarNoticias();
  }

}
