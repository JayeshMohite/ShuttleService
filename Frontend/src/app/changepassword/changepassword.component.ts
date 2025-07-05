import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit{

  changePasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    userId: ''
  };
  currentUser: any;
  message: string = ''; 
  passwordVisibility: { [key: string]: boolean } = {  // Add the index signature here
    newPassword: false,
    confirmPassword: false,
  };

  constructor(private userService: UserService, private storageService: StorageService,private router:Router) {}
  ngOnInit(): void {
    
  }

  toggleViewPassword(inputName: string) {
    this.passwordVisibility[inputName] = !this.passwordVisibility[inputName];
  }

  changePasswordFormSubmit() {
    this.currentUser = this.storageService.getUser();
    const userId = this.currentUser.id; // Retrieve user ID from localStorage
    
    if (userId) {
      // Include the user ID in the data payload
      this.changePasswordData.userId = userId; 
  
      this.userService.changePassword(this.changePasswordData).subscribe(
        response => {
          // Handle successful response
          console.log('Password changed successfully');
          alert("Password Changed successfully. Please login again !");
            this.router.navigate(['/profile']);

           // Log out the user and redirect to the login page
           this.storageService.clean(); // Clear the user data from localStorage
           this.router.navigate(['/login']); // Redirect to the login page  
        },
        error => {
          // Handle error
          console.error('Error:', error);
          this.message = 'Error: ' + error.error.message;
        }
      );
    } else {
      console.error('User ID is not available');
      this.message = 'User ID is not available';
    }
  }
}


