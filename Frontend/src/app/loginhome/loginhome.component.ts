import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginhome',
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.css']
})
export class LoginhomeComponent {

  constructor(private router: Router) {}

  redirectToBookings() {
    // Check if the user is logged in (you need to implement this logic based on your authentication system)
    const isLoggedIn = true; // Replace this with the actual login status check logic

    if (isLoggedIn) {
      // User is logged in, redirect to the bookings page
      this.router.navigate(['/bookings']);
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/login']);
    }
  }
}
