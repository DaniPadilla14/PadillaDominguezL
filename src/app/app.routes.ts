import { Routes } from '@angular/router';
import { CFamilia } from './paginas/c-familia/c-familia';
import { Acercade } from './paginas/acercade/acercade';
import { Noticias } from './paginas/noticias/noticias';
import { Noticia } from './paginas/noticia/noticia';
import { Login } from './componentes/login/login';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'familia', component: CFamilia },
  { path: 'acercade', component: Acercade },
  { path: 'noticias', component: Noticias },
  { path: 'noticia/:id', component: Noticia },
  { path: '**', redirectTo: 'login' }
];
