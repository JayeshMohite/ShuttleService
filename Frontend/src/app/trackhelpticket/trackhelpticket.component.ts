import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trackhelpticket',
  templateUrl: './trackhelpticket.component.html',
  styleUrls: ['./trackhelpticket.component.css']
})
export class TrackhelpticketComponent {
  ticketId: string = '';
  ticket: any;
  comments: any[] = [];
  commentText: string = '';
  commentsLoaded: boolean = false;
  modalOpen: boolean = false;
  selectedTicket: any;
  newComment: string = '';
  

  constructor(private userService: UserService,private datePipe: DatePipe) {}

  trackTicket() {
    // Call the API to get ticket and comments data
    this.userService.getTicket(this.ticketId).subscribe(
      (response: any) => {
        this.ticket = response;
        this.comments = response.comments;
        this.commentsLoaded = true; // Set the flag to true after loading comments
        this.openTicketModal(this.ticket);
      },
      error => {
        console.error('Error tracking ticket:', error);
        this.ticket = null;
        this.commentsLoaded = false; // Set the flag to false if error occurs
      }
    );
  }
  

  openTicketModal(ticket: any): void {
    this.selectedTicket = ticket;
    this.modalOpen = true;
    this.ticketId = ticket.ticket_id; 
    this.loadComments();
  }

  addComment() {
    if (this.newComment.trim() !== '') {
      const comment = { text: this.newComment };
      
      // Check if ticketId is not null before making the API call
      if (this.ticketId !== null) {
        this.userService.addComment(this.ticketId.toString(), this.newComment).subscribe(
          response => {
            console.log('Comment added successfully');
            this.comments.push(comment); // Add the comment to the local comments array
            this.newComment = ''; // Clear the comment box
          },
          error => {
            console.error('Error adding comment:', error);
          }
        );
      } else {
        console.warn('Ticket ID is null, cannot add comment.');
        // Handle the case where ticketId is null
      }
    }
  }

  loadComments(): void {
    if (this.ticketId !== null) {
      this.userService.getComments(this.ticketId.toString()).subscribe(
        comments => {
          this.comments = comments;
        },
        error => {
          console.error('Error fetching comments:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  
}
