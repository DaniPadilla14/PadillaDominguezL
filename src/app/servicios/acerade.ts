import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServAcercade {

  arregloAcercade: any[] = [

    {
      id: 1,
      titulo: 'Sobre el Proyecto',
      descripcion: 'Este proyecto muestra el árbol genealógico de la familia Padilla Domínguez utilizando Angular.'
    },

    {
      id: 2,
      titulo: 'Objetivo',
      descripcion: 'Organizar y visualizar la información familiar de manera estructurada y dinámica.'
    },

    {
      id: 3,
      titulo: 'Tecnologías Utilizadas',
      descripcion: 'Angular 17, TypeScript, Bootstrap 5 y HTML.'
    },

    {
      id: 4,
      titulo: 'Desarrollador',
      descripcion: 'Daniel Padilla Domínguez - Técnico Superior Universitario en Desarrollo de Software.'
    }

  ];

  consultarAcercade(){
    return this.arregloAcercade;
  }

}