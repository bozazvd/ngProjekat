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

  username = 'test';
  password = 'test123';

  constructor(private router: Router) {} 
  onSubmit() {
    const username = this.credentials.username.trim().toLowerCase();  
    const password = this.credentials.password.trim().toLowerCase();  

    if (username === 'test' && password === 'test123') {
      console.log(' home...');
      this.router.navigateByUrl('/home');  
    } else {
      alert('Pogrešan username ili password!');
    }
  }
}
