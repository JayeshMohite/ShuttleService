import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-addroute',
  templateUrl: './addroute.component.html',
  styleUrls: ['./addroute.component.css']
})
export class AddrouteComponent implements OnInit{
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  isSidebarOpen: boolean = false;
  routes: string = '';



  constructor(private authService: AuthService,private router:Router,private storageService: StorageService,private userService: UserService) { }

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

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      this.userService.post<any>('addroute', formData)
        .subscribe(
          (response) => {
            console.log('Form data sent successfully to the server');
            // Additional code or notifications for successful submission
            this.router.navigate(['/routelist']);

          },
          (error) => {
            console.error('Error sending form data to the server:', error);
            // Additional error handling or notifications
          }
        );
    }
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
