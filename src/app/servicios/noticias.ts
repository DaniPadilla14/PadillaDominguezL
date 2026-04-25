import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServNoticias {

  arregloNoticias: any[] = [

    {
      id: 1,
      titulo: 'Cumpleaños de José Juan',
      descripcion: 'José Juan celebró su cumpleaños el 4 de julio.',
      fecha: '04/07/2026',
      tipo: 'Cumpleaños'
    },

    {
      id: 2,
      titulo: 'Graduación de Daniel',
      descripcion: 'Daniel terminó sus estudios con excelente promedio.',
      fecha: '20/06/2026',
      tipo: 'Logro'
    },

    {
      id: 3,
      titulo: 'Reunión Familiar',
      descripcion: 'Se realizó la reunión anual de la familia Padilla Domínguez.',
      fecha: '15/12/2025',
      tipo: 'Evento'
    }

  ];

  consultarNoticias(){
    return this.arregloNoticias;
  }

}
