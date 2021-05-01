import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoint: string = `http://localhost:8080/auth`; // Temp... will move to env file

  constructor(private http: HttpClient) { }

  login(): void {
    window.location.href = `${this.endPoint}/google`;
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
