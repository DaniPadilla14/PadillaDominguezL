import { Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

type PerfilGoogle = {
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle {
  readonly perfil = signal<PerfilGoogle | null>(null);
  readonly autenticado = signal(false);
  readonly inicializado = signal(false);

  constructor(private oauthServ: OAuthService) {
    void this.inicializarLoginGmail();
  }

  async inicializarLoginGmail(): Promise<void> {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '824395350675-n2ut8gm7ulja010fv9o88o1krjubd0p8.apps.googleusercontent.com',
      redirectUri: `${window.location.origin}/login`,
      postLogoutRedirectUri: window.location.origin,
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: false,
    };

    this.oauthServ.configure(config);
    this.oauthServ.events.subscribe(() => this.actualizarEstadoSesion());

    try {
      await this.oauthServ.loadDiscoveryDocumentAndTryLogin();
    } catch (error) {
      console.error('No se pudo completar el login con Google.', error);
    } finally {
      this.inicializado.set(true);
    }

    this.actualizarEstadoSesion();
  }

  login(): void {
    this.oauthServ.initLoginFlow();
  }

  logout(): void {
    this.oauthServ.logOut();
    this.actualizarEstadoSesion();
  }

  getPerfil(): PerfilGoogle | null {
    return this.perfil();
  }

  private actualizarEstadoSesion(): void {
    const claims = this.oauthServ.getIdentityClaims() as PerfilGoogle | null;
    const tieneSesion = this.oauthServ.hasValidIdToken();

    this.autenticado.set(tieneSesion);
    this.perfil.set(tieneSesion ? claims : null);
  }
}
