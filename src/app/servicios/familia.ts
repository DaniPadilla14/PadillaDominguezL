import { Injectable } from '@angular/core';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseDisponible, obtenerFirestore } from './firebase';

export type Familiar = {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nac: string;
  signo_zod: string;
};

@Injectable({
  providedIn: 'root',
})
export class ServFamilia {

  constructor() { }

  
  private readonly arregloFamilia: Familiar[] = [
  
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

  async consultarFamilia(): Promise<Familiar[]> {
    const db = obtenerFirestore();

    if (!db || !firebaseDisponible()) {
      return this.arregloFamilia;
    }

    try {
      const familiaRef = query(collection(db, 'familia'), orderBy('id', 'asc'));
      const respuesta = await getDocs(familiaRef);

      if (respuesta.empty) {
        return this.arregloFamilia;
      }

      return respuesta.docs.map((doc) => {
        const data = doc.data() as Partial<Familiar>;
        return {
          id: Number(data.id ?? doc.id),
          nombre: data.nombre ?? '',
          apellido: data.apellido ?? '',
          fecha_nac: data.fecha_nac ?? '',
          signo_zod: data.signo_zod ?? '',
        };
      });
    } catch (error) {
      console.error('No fue posible consultar familia en Firestore.', error);
      return this.arregloFamilia;
    }
  }

}
