import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(): void {
    const ENDPOINT: string = 'http://localhost:8080/google';
    window.location.href = ENDPOINT;
  }
}
