import { Injectable } from '@angular/core';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseDisponible, obtenerFirestore } from './firebase';

export type NoticiaItem = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo: string;
};

@Injectable({
  providedIn: 'root'
})
export class ServNoticias {

  private readonly arregloNoticias: NoticiaItem[] = [

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

  async consultarNoticias(): Promise<NoticiaItem[]> {
    const db = obtenerFirestore();

    if (!db || !firebaseDisponible()) {
      return this.arregloNoticias;
    }

    try {
      const noticiasRef = query(collection(db, 'noticias'), orderBy('id', 'asc'));
      const respuesta = await getDocs(noticiasRef);

      if (respuesta.empty) {
        return this.arregloNoticias;
      }

      return respuesta.docs.map((doc) => {
        const data = doc.data() as Partial<NoticiaItem>;
        return {
          id: Number(data.id ?? doc.id),
          titulo: data.titulo ?? '',
          descripcion: data.descripcion ?? '',
          fecha: data.fecha ?? '',
          tipo: data.tipo ?? '',
        };
      });
    } catch (error) {
      console.error('No fue posible consultar noticias en Firestore.', error);
      return this.arregloNoticias;
    }
  }

}
