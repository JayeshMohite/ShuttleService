import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';


interface User {
  id: number;
  busName: string;
  busNumber: string;
  conductorName: string;
  conductorNumber: string;
  busRoute: string;
  totalseat: string;
  routeName: string;
}
@Component({
  selector: 'app-addstation',
  templateUrl: './addstation.component.html',
  styleUrls: ['./addstation.component.css']
})
export class AddstationComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  isSidebarOpen: boolean = false;
  busRoute: string = '';
  routes: User[]=[];
  stationname: string = '';
  totalKm: number | null=null;  
  latitude: string = '';
  longitude: string = '';
  stationNo: string = '';


  constructor(private userService: UserService,private authService: AuthService,private router:Router,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
    this.currentUser = this.storageService.getUser();
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    this.getRoutes();

    }else{
      this.router.navigate(['/login']);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      formData.latitude = this.latitude;
      formData.longitude = this.longitude;
      formData.stationNo = this.stationNo;
      this.userService.post<any>('addstation', formData)
        .subscribe(
          (response) => {
            console.log('Form data sent successfully to the server');
            // Additional code or notifications for successful submission
            this.router.navigate(['/stationlist']);
          },
          (error) => {
            console.error('Error sending form data to the server:', error);
            // Additional error handling or notifications
          }
        );
    }
  }

  getRoutes(): void {
    this.userService.get<User[]>('routes')
      .subscribe(data => {
        this.routes = data;
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
