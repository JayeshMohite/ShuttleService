import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { BASE_URL } from '../_services/config';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  token: any;

  constructor(private authService: AuthService,private router:Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password,phone } = this.form;

    this.authService.register(username, email, password, phone).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
        this.router.navigate(['/login']).then(() => {
          window.location.reload(); // Reload the page
        });

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}