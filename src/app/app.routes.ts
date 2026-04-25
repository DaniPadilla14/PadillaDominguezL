import { Routes } from '@angular/router';
import { CFamilia } from './paginas/c-familia/c-familia';
import { Acercade } from './paginas/acercade/acercade';
import { Noticias } from './paginas/noticias/noticias';
import { Noticia } from './paginas/noticia/noticia';
import { Login } from './componentes/login/login';
import { SesionIniciada } from './paginas/sesion-iniciada/sesion-iniciada';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'sesion-iniciada', component: SesionIniciada },
  { path: 'familia', component: CFamilia },
  { path: 'acercade', component: Acercade },
  { path: 'noticias', component: Noticias },
  { path: 'noticia/:id', component: Noticia },
  { path: '**', redirectTo: 'login' }
];
