import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ServNoticias } from '../../servicios/noticias';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia.html',
  styleUrls: ['./noticia.css'],
})
export class Noticia implements OnInit {

  noticia: any;

  constructor(
    private route: ActivatedRoute,
    private servicioNoticias: ServNoticias
  ) {}

 ngOnInit(): void {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  const noticias = this.servicioNoticias.consultarNoticias();
  this.noticia = noticias.find(n => n.id === id);

  if (!this.noticia) {
    console.error('Noticia no encontrada');
  }
}
}