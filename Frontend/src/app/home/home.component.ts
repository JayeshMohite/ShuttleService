import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = false;

  constructor(private userService: UserService,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  
  redirectToBookings() {
    // Check if the user is logged in (you need to implement this logic based on your authentication system)
    const isLoggedIn = false; // Replace this with the actual login status check logic

    if (isLoggedIn) {
      // User is logged in, redirect to the bookings page
      this.router.navigate(['/bookings']);
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/login']);
    }
  }

}