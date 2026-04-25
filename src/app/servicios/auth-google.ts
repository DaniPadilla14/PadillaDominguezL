import { Injectable, signal } from '@angular/core';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  configurarPersistencia,
  firebaseDisponible,
  obtenerAuth,
  proveedorGoogle,
} from './firebase';

export type PerfilGoogle = {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
  sub?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle {
  readonly perfil = signal<PerfilGoogle | null>(null);
  readonly autenticado = signal(false);
  readonly inicializado = signal(false);
  readonly error = signal('');
  readonly firebaseActivo = signal(firebaseDisponible());

  constructor() {
    this.inicializarAutenticacion();
  }

  private inicializarAutenticacion(): void {
    const auth = obtenerAuth();

    if (!auth) {
      this.error.set(
        'Firebase no esta configurado todavia. Agrega tus credenciales en src/environments/environment.ts.'
      );
      this.inicializado.set(true);
      return;
    }

    onAuthStateChanged(auth, (usuario) => {
      this.actualizarEstado(usuario);
      this.inicializado.set(true);
    });
  }

  async login(recordar = true): Promise<void> {
    this.error.set('');
    const auth = obtenerAuth();

    if (!auth) {
      this.error.set('Firebase Auth no esta configurado.');
      return;
    }

    try {
      await configurarPersistencia(recordar);
      const resultado = await signInWithPopup(auth, proveedorGoogle);
      const credencial = GoogleAuthProvider.credentialFromResult(resultado);
      const usuario = resultado.user;

      if (!usuario) {
        throw new Error('No se recibio el usuario autenticado.');
      }

      this.actualizarEstado(usuario);
      if (!credencial) {
        console.warn('Se inicio sesion con Google sin una credencial adicional legible.');
      }
    } catch (error) {
      console.error('No fue posible iniciar sesion con Google.', error);
      this.error.set('No fue posible iniciar sesion con Google. Revisa tu configuracion de Firebase.');
    }
  }

  async loginConCorreo(correo: string, clave: string, recordar = true): Promise<void> {
    this.error.set('');
    const auth = obtenerAuth();

    if (!auth) {
      this.error.set('Firebase Auth no esta configurado.');
      return;
    }

    try {
      await configurarPersistencia(recordar);
      const resultado = await signInWithEmailAndPassword(auth, correo, clave);
      this.actualizarEstado(resultado.user);
    } catch (error) {
      console.error('No fue posible iniciar sesion con correo y contrasena.', error);
      this.error.set('No fue posible iniciar sesion con correo y contrasena.');
    }
  }

  async logout(): Promise<void> {
    const auth = obtenerAuth();

    if (!auth) {
      this.limpiarSesion();
      return;
    }

    await signOut(auth);
    this.limpiarSesion();
  }

  getPerfil(): PerfilGoogle | null {
    return this.perfil();
  }

  private actualizarEstado(usuario: User | null): void {
    if (!usuario) {
      this.limpiarSesion();
      return;
    }

    this.perfil.set({
      email: usuario.email ?? undefined,
      given_name: usuario.displayName?.split(' ')[0],
      name: usuario.displayName ?? undefined,
      picture: usuario.photoURL ?? undefined,
      sub: usuario.uid,
    });
    this.autenticado.set(true);
    this.error.set('');
  }

  private limpiarSesion(): void {
    this.perfil.set(null);
    this.autenticado.set(false);
    this.error.set('');
  }
}
