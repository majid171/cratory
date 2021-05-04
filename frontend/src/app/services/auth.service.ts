import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoint: string = `http://localhost:8080/auth`; // Temp... will move to env file

  constructor(private http: HttpClient) { }

  loginWithGoogle(): void {
    window.location.href = `${this.endPoint}/google`;
  }

  loginWithFacebook(): void {
    window.location.href = `${this.endPoint}/facebook`;
  }

  logout(): Observable<any> {

    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      "Access-Control-Allow-Origin": "true"
    });

    return this.http.get<any>(`${this.endPoint}/logout`, {
      headers: headers,
      withCredentials: true
    });
  }
}
