import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_services/config';


interface User {
  id: number;
  busName: string;
  busNumber: string;
  conductorName: string;
  conductorNumber: string;
  busRoute: string;
  totalseat: string;
  routeName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{
  form: any = {
    username: null,
    email: null,
    password: null,
    phone: null,
    roles: []
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  isSidebarOpen: boolean = false;
  token: string = '';


  constructor(private authService: AuthService,private router:Router,private storageService: StorageService,private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
    this.currentUser = this.storageService.getUser();
    const user = this.storageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }else{
      this.router.navigate(['/login']);
    }
  }

  toggleRoleSelection(role: string): void {
    const index = this.form.roles.indexOf(role);
    if (index > -1) {
      // Role already exists, remove it from the array
      this.form.roles.splice(index, 1);
    } else {
      // Role doesn't exist, add it to the array
      this.form.roles.push(role);
    }
  }

  onSubmit(): void {
    const { username, email, password,phone,roles } = this.form;
    this.authService.registerwithrole(username, email, password,phone, roles).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/userlist']).then(() => {
          window.location.reload(); // Reload the page
        });
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}