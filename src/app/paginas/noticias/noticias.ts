import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServNoticias } from '../../servicios/noticias';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.html',
  styleUrls: ['./noticias.css']
})
export class Noticias implements OnInit {

  noticias: any[] = [];

  constructor(private ServNoticias: ServNoticias){}

  ngOnInit(): void {
    this.noticias = this.ServNoticias.consultarNoticias();
  }

}