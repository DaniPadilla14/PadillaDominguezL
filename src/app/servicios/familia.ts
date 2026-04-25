import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServFamilia {

  constructor() { }

  
  arregloFamilia: any[] = [
  
    {
    id : 1,
    nombre : 'Jose Juan',
    apellido : 'Padilla Elizondo',
    fecha_nac : '4/07/79',
    signo_zod : ''
    },

    {
    id : 2,
    nombre : 'Sandra Mireya',
    apellido : 'Dominnguez Fuentes',
    fecha_nac : '1/05/80',
    signo_zod : ''
    },

    {
    id : 3,
    nombre : 'Jezreel Abisai',
    apellido : 'Padilla Dominguez',
    fecha_nac : '8/07/98',
    signo_zod : ''
    },

    {
    id : 4,
    nombre : 'Misael',
    apellido : 'Padilla Dominguez',
    fecha_nac : '23/11/02',
    signo_zod : ''
    },
    
      {
    id : 5,
    nombre : 'Valeria Sarahi',
    apellido : 'Padilla Dominguez',
    fecha_nac : '2/02/05',
    signo_zod : ''
    },


    {
    id : 6,
    nombre : 'Daniel',
    apellido : 'Padilla Dominguez',
    fecha_nac : '14/07/06',
    signo_zod : ''
    },
    
  ];

consultarFamilia(){
  return this.arregloFamilia;
}

}
