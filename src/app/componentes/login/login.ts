import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGoogle } from '../../servicios/auth-google';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  protected correo = '';
  protected clave = '';
  protected recordar = true;
  protected mostrarClave = false;
  protected enviando = signal(false);
  protected mensajeGoogle = '';

  constructor(
    private authGoogle: AuthGoogle,
    private router: Router
  ) {
    effect(() => {
      const authLista = this.authGoogle.inicializado();
      const autenticado = this.authGoogle.autenticado();

      if (authLista && autenticado) {
        void this.router.navigateByUrl('/familia', { replaceUrl: true });
      }
    });
  }

  ngOnInit(): void {
    const perfil = this.authGoogle.getPerfil();
    if (perfil?.email) {
      this.mensajeGoogle = `Sesion iniciada con ${perfil.email}`;
    }
  }

  protected login(): void {
    this.mensajeGoogle = 'Redirigiendo a Google para iniciar sesion...';
    this.authGoogle.login();
  }

  protected alternarClave(): void {
    this.mostrarClave = !this.mostrarClave;
  }

  protected iniciarSesion(): void {
    this.enviando.set(true);

    setTimeout(() => {
      this.enviando.set(false);
      void this.router.navigateByUrl('/familia', { replaceUrl: true });
    }, 1400);
  }
}
