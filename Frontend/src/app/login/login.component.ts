import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HttpHeaders,HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoading = false;


  constructor(private authService: AuthService, private storageService: StorageService,private router: Router,private http: HttpClient ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/loginhome']);
      this.roles = this.storageService.getUser().roles;
    }
  }

  
  
  onSubmit(): void {
    this.isLoading = true;
    const { username, password } = this.form; // Destructure the username and password from the form
  
    const credentials = { username, password }; // Use the destructured variables
  
    this.authService.login(credentials.username, credentials.password).subscribe(
      (response) => {
        // Save the token in local storage
        localStorage.setItem('token', response.accessToken);
        console.log(response); 
  
        // Redirect to the home page or perform any other action
        // ...
        this.storageService.saveUser(response);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
        this.isLoading = false; 
      },
      (error) => {
        console.error(error);
        this.errorMessage =error.error.message;
        this.isLoading = false;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}