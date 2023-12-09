import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {


  //para keycloack
  clientId: String = environment.clientId;
  realmId: String = environment.realmId;
  port: String = environment.port;


}
