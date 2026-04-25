import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGoogle } from '../../servicios/auth-google';

@Component({
  selector: 'app-sesion-iniciada',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sesion-iniciada.html',
  styleUrl: './sesion-iniciada.css',
})
export class SesionIniciada {
  constructor(protected authGoogle: AuthGoogle) {}
}
