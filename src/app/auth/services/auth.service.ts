import { AuthResponse, Usuario } from './../interfaces/auth.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _usuario!: Usuario;



  get usuario() {
    return { ...this._usuario }
  }
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/`;
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(
          res => {

            localStorage.setItem('token', res.token!);
            if (res.ok) {
            }
          }
        ),
        map(resp => resp.ok
        ),
        catchError(err => of(err.error.msg))
      )
  }


  registro(name:string, email:string, password:string):Observable<AuthResponse>{

    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password}
    return this.http.post<AuthResponse>(url,  body)
    .pipe(
      tap(
        res => {

          localStorage.setItem('token', res.token!);
        }
      ),
      map(resp => resp
      ),
      catchError(err => of(err.error))
    )

  }


  validarToken(): Observable<boolean> | any{
    const url = `${this.baseUrl}/auth/reloadToken`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(
          resp =>{

            localStorage.setItem('token', resp.token!);
            if (resp.ok) {

              console.log(resp.token)
              this._usuario = {
                name: resp.name!,
                uid: resp.uid!,
                email:resp.email!
              }
            }
            return resp.ok
          }
        ),
        catchError(err => of(false))
      )

  }


  logout(){
    localStorage.clear();
  }

}
