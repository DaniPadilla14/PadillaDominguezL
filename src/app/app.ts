import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navegacion } from './componentes/navegacion/navegacion';
import { PieDePagina } from './componentes/pie-de-pagina/pie-de-pagina';
import { Titulo } from './componentes/titulo/titulo';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navegacion, PieDePagina, Titulo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PadillaDominguez');
}

