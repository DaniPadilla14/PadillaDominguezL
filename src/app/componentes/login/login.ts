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
        void this.router.navigateByUrl('/sesion-iniciada', { replaceUrl: true });
      }
    });
  }

  ngOnInit(): void {
    const perfil = this.authGoogle.getPerfil();
    if (perfil?.email) {
      this.mensajeGoogle = `Sesion iniciada con ${perfil.email}`;
    }
  }

  protected get errorGoogle(): string {
    return this.authGoogle.error();
  }

  protected async login(): Promise<void> {
    this.mensajeGoogle = 'Abriendo Google para iniciar sesion...';
    await this.authGoogle.login(this.recordar);
  }

  protected alternarClave(): void {
    this.mostrarClave = !this.mostrarClave;
  }

  protected async iniciarSesion(): Promise<void> {
    this.enviando.set(true);
    await this.authGoogle.loginConCorreo(this.correo, this.clave, this.recordar);
    this.enviando.set(false);

    if (this.authGoogle.autenticado()) {
      this.mensajeGoogle = `Sesion iniciada con ${this.correo}`;
      void this.router.navigateByUrl('/sesion-iniciada', { replaceUrl: true });
    }
  }
}
