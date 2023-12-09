import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, map, catchError, of, throwError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //propiedades
  keycloackUrl = environment.keycloackApi;
  angularUrl = environment.angularUrl;
  
  //para keycloack  
  clientId: String = environment.clientId;
  clientSecret: String = environment.clientSecret;
  realmId: String = environment.realmId;
  port: String = environment.port;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  wwwFormUrlOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };
  
  
  constructor(
    private router: Router, 
    private http: HttpClient, 
    private _snackBar: MatSnackBar
  ) { }

  setUserData(token: string, refreshToken: string): void {
    //console.log("guardando set: token:" + token);
    //console.log("guardando refresh: " + refreshToken);

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  setNewToken(token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') ?? ''; // Si es nulo, devuelve una cadena vacía.
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getIdUser(): string | null {
    return localStorage.getItem('id_user');
  }

  isLoggedIn(): Observable<boolean> {

    
    const token = this.getToken();    

    if (!token){
      this._snackBar.open("No ha iniciado Sesión.", "Aceptar");
      return of(false); // Retorna un observable que emite false
    }
    
    if (token) {
      
      const body = new URLSearchParams();
      body.set('token', token);
      body.set('client_secret', this.clientSecret.toString());
      body.set('client_id', this.clientId.toString());
      
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });


      
      return this.http.post(`${this.keycloackUrl}/realms/${this.realmId}/protocol/openid-connect/token/introspect`, body.toString(), { headers })
        .pipe(
          map((response: any) => {
            //console.log('Respuesta logged JSON:', response); // Muestra la respuesta en la consola
            //this.setNewToken(response.token);

            if(response.active == false){
              //mostramos mensaje
              this._snackBar.open("Sesion Expirada.", "Aceptar");
              return false; // Retorna un observable que emite false
            }
            return true; // Retorna un observable que emite false
          }),
          catchError((error) => {
            //console.log('Respuesta ERROR logged JSON:', error); // Muestra la respuesta en la consola
            //return throwError(() => new Error('Failed to login'));
            return of(false); // Retorna un observable que emite false

          })
        );
    }
    
    // Agrega esta línea para devolver un observable de false si no se cumple ninguna de las condiciones anteriores.
    return of(false);
    
  }


  logout() {
    
    //console.log('logout'); 
    
    const refreshToken = this.getRefreshToken();

    //console.log("refresh: " + this.getRefreshToken());
    
    const body = new URLSearchParams();
    body.set('client_id', this.clientId.toString());
    body.set('refresh_token', refreshToken);
    body.set('client_secret', this.clientSecret.toString());
    body.set('grant_type', 'client_credentials');    

    //console.log("body" + body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
         
    this.http.post(`${this.keycloackUrl}/realms/${this.realmId}/protocol/openid-connect/logout`, body.toString(), { headers })
    .pipe(
      tap((response: any) => {
        //console.log('Respuesta JSON:', response); // Muestra la respuesta en la consola
        // Removemos local storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        this._snackBar.open("Sesion Cerrada.", "Aceptar");
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        console.log(error);
        // Removemos local storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this._snackBar.open("Sesion Cerrada.", "Aceptar");
        this.router.navigate(['/']);
        return throwError(() => new Error('Failed to logout'));
      })
    )
    .subscribe(); // Agrega esta línea para suscribirte al observable
 

    
  }

  login(codeKeycloack: String): Observable<any> {

    
    const body = new URLSearchParams();
    body.set('client_id', this.clientId.toString());
    body.set('code', codeKeycloack.toString());
    body.set('client_secret', this.clientSecret.toString());
    body.set('grant_type', 'authorization_code');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
         
    return this.http.post(`${this.keycloackUrl}/realms/${this.realmId}/protocol/openid-connect/token`, body.toString(), { headers })
    .pipe(
        map((response: any) => {
          //console.log('Respuesta JSON:', response); // Muestra la respuesta en la consola
          if(response.access_token != null){
            
            this.setUserData(response.access_token.toString(), response.refresh_token.toString());
            this.router.navigate(['pages']);
          }
          return response;
        }),
        catchError((error) => {
          console.log(error);          
          return throwError(() => new Error('Failed to login'));
        })
      );

  }


}
