import { Injectable, signal } from '@angular/core';

type PerfilGoogle = {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
  sub?: string;
};

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleTokenRequest = {
  prompt?: string;
};

type GoogleTokenClient = {
  callback: ((response: GoogleTokenResponse) => void) | null;
  requestAccessToken: (overrideConfig?: GoogleTokenRequest) => void;
};

type GoogleAccounts = {
  accounts?: {
    oauth2?: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        callback: (response: GoogleTokenResponse) => void;
      }) => GoogleTokenClient;
      revoke: (token: string, done?: () => void) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleAccounts;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle {
  readonly perfil = signal<PerfilGoogle | null>(null);
  readonly autenticado = signal(false);
  readonly inicializado = signal(false);
  readonly error = signal('');

  private readonly clientId =
    '824395350675-n2ut8gm7ulja010fv9o88o1krjubd0p8.apps.googleusercontent.com';
  private readonly perfilStorageKey = 'padilla_google_profile';
  private readonly tokenStorageKey = 'padilla_google_token';
  private tokenClient: GoogleTokenClient | null = null;

  constructor() {
    this.restaurarSesion();
    void this.inicializarLoginGmail();
  }

  async inicializarLoginGmail(): Promise<void> {
    try {
      await this.esperarGoogleIdentityServices();

      const oauth2 = window.google?.accounts?.oauth2;
      if (!oauth2) {
        throw new Error('Google Identity Services no esta disponible.');
      }

      this.tokenClient = oauth2.initTokenClient({
        client_id: this.clientId,
        scope: 'openid profile email',
        callback: (response) => {
          void this.procesarRespuestaToken(response);
        },
      });
    } catch (error) {
      console.error('No se pudo inicializar Google Identity Services.', error);
      this.error.set('No se pudo conectar con Google. Intenta de nuevo.');
    } finally {
      this.inicializado.set(true);
    }
  }

  login(): void {
    this.error.set('');

    if (!this.tokenClient) {
      this.error.set('Google todavia no esta listo. Intenta otra vez en unos segundos.');
      return;
    }

    this.tokenClient.requestAccessToken({ prompt: 'select_account' });
  }

  logout(): void {
    const token = localStorage.getItem(this.tokenStorageKey);
    const oauth2 = window.google?.accounts?.oauth2;

    if (token && oauth2) {
      oauth2.revoke(token, () => this.limpiarSesion());
      return;
    }

    this.limpiarSesion();
  }

  getPerfil(): PerfilGoogle | null {
    return this.perfil();
  }

  private async procesarRespuestaToken(response: GoogleTokenResponse): Promise<void> {
    if (response.error || !response.access_token) {
      this.error.set(response.error_description || 'No fue posible iniciar sesion con Google.');
      return;
    }

    try {
      const perfil = await this.obtenerPerfilUsuario(response.access_token);
      this.guardarSesion(perfil, response.access_token);
      this.error.set('');
    } catch (error) {
      console.error('No se pudo obtener el perfil de Google.', error);
      this.error.set('Google inicio sesion, pero no fue posible leer tu perfil.');
      this.limpiarSesion();
    }
  }

  private async obtenerPerfilUsuario(accessToken: string): Promise<PerfilGoogle> {
    const respuesta = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error(`No se pudo consultar userinfo: ${respuesta.status}`);
    }

    return (await respuesta.json()) as PerfilGoogle;
  }

  private guardarSesion(perfil: PerfilGoogle, accessToken: string): void {
    localStorage.setItem(this.perfilStorageKey, JSON.stringify(perfil));
    localStorage.setItem(this.tokenStorageKey, accessToken);
    this.perfil.set(perfil);
    this.autenticado.set(true);
  }

  private limpiarSesion(): void {
    localStorage.removeItem(this.perfilStorageKey);
    localStorage.removeItem(this.tokenStorageKey);
    this.perfil.set(null);
    this.autenticado.set(false);
  }

  private restaurarSesion(): void {
    const perfilGuardado = localStorage.getItem(this.perfilStorageKey);
    if (!perfilGuardado) {
      return;
    }

    try {
      const perfil = JSON.parse(perfilGuardado) as PerfilGoogle;
      this.perfil.set(perfil);
      this.autenticado.set(true);
    } catch {
      this.limpiarSesion();
    }
  }

  private esperarGoogleIdentityServices(): Promise<void> {
    if (window.google?.accounts?.oauth2) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      let intentos = 0;
      const maxIntentos = 80;

      const timer = window.setInterval(() => {
        if (window.google?.accounts?.oauth2) {
          window.clearInterval(timer);
          resolve();
          return;
        }

        intentos += 1;
        if (intentos >= maxIntentos) {
          window.clearInterval(timer);
          reject(new Error('Google Identity Services no cargo a tiempo.'));
        }
      }, 250);
    });
  }
}
