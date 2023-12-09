import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService
    ) { }

  ngOnInit() {
    // Obtén el valor del parámetro "code" de la URL
    const codeParam = this.route.snapshot.queryParamMap.get('code');
    
    //no existe param code.
    if (!codeParam) {
      this.router.navigate(['/']);
      //mostramos mensaje
      this._snackBar.open("Error al obtener Codigo Verificacion de Keycloack.", "Aceptar");
      return;
    }
    
    
    
    
    this.authService.login(codeParam.toString()).subscribe({
      next: (result) => {
        //console.log("result login:" +result);
        
        if(result.access_token == null){
          //iteramos los errores
          //const errorMessage = result.errors.map((error: { mensaje: any; }) => error.mensaje).join(', ');

          //mostramos mensaje
          this._snackBar.open("No se obtuvo JWT.", "Aceptar");

          //this._snackBar.open(result.errors[0].mensaje, "Aceptar");

        }else {
          this._snackBar.open("Sesión Iniciada.", "Aceptar");
        }
        //this.router.navigate(['/pages']);
      },
      error: (err: Error) => {        
        alert(err.message);          
      }
    });
  }

  
}
