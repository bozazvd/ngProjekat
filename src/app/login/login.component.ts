import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserCredentials } from './user/user.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: IUserCredentials = { username: '', password: '' };
  rememberMe: boolean = false; // Dodali smo "Remember Me" opciju

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedUser = localStorage.getItem('user'); 
    if (savedUser) {
      this.router.navigate(['/home']); // Ako je korisnik već ulogovan, preusmeri ga
    }
  }

  onSubmit() {
    const username = this.credentials.username.trim().toLowerCase();  
    const password = this.credentials.password.trim().toLowerCase();  
  
    if (username === 'test' && password === 'test123') {
      console.log(' home...');
      localStorage.setItem('user', username);  // Čuvanje korisnika u localStorage
      this.router.navigateByUrl('/home');  // Preusmeravanje na home stranicu
    } else {
      alert('Pogrešan username ili password!');
    }
  }
  
}
