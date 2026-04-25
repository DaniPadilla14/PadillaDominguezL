import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  type Auth,
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

type FirebaseConfig = typeof environment.firebase;

const firebaseConfig = environment.firebase;

function esCadenaConValor(valor: string): boolean {
  return valor.trim().length > 0;
}

function firebaseConfigurado(config: FirebaseConfig): boolean {
  return [config.apiKey, config.authDomain, config.projectId, config.appId].every(esCadenaConValor);
}

let appInstancia: FirebaseApp | null = null;

export function firebaseDisponible(): boolean {
  return firebaseConfigurado(firebaseConfig);
}

export function obtenerFirebaseApp(): FirebaseApp | null {
  if (!firebaseDisponible()) {
    return null;
  }

  if (appInstancia) {
    return appInstancia;
  }

  appInstancia = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return appInstancia;
}

export function obtenerAuth(): Auth | null {
  const app = obtenerFirebaseApp();
  return app ? getAuth(app) : null;
}

export function obtenerFirestore(): Firestore | null {
  const app = obtenerFirebaseApp();
  return app ? getFirestore(app) : null;
}

export const proveedorGoogle = new GoogleAuthProvider();
proveedorGoogle.setCustomParameters({ prompt: 'select_account' });

export async function configurarPersistencia(recordar: boolean): Promise<void> {
  const auth = obtenerAuth();

  if (!auth) {
    return;
  }

  await setPersistence(
    auth,
    recordar ? browserLocalPersistence : browserSessionPersistence
  );
}
