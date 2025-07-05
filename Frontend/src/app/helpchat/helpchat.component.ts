import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_services/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helpchat',
  templateUrl: './helpchat.component.html',
  styleUrls: ['./helpchat.component.css']
})
export class HelpchatComponent {
  name: string = '';
  email: string = '';
  issueDescription: string = '';
  ticketId: string = '';
  issueType: string = '';

  constructor(private http: HttpClient,private router: Router) { }

  trackTicket() {
    // Navigate to the desired page when the button is clicked
    this.router.navigate(['/trackhelpticket']);
  }

  submitTicket() {
    const ticketData = {
      name: this.name,
      email: this.email,
      issue_type: this.issueType,
      issue_description: this.issueDescription
    };

    this.http.post<any>(`${BASE_URL}/helpticketuser`, ticketData).subscribe(
      response => {
        this.ticketId = response.ticketId;
      },
      error => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }
}