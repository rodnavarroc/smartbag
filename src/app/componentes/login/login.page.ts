import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	email: string;
	password: string;

  constructor( private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin()
  {
  	this.authService.login(this.email, this.password).then(res =>{
  		this.router.navigate(['/home']);
  	}).catch(err => alert('Los datos ingresados son incorrectos o el usuario no existe.'));
  }

}
