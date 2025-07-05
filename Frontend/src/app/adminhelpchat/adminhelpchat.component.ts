import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { BASE_URL } from '../_services/config';


@Component({
  selector: 'app-adminhelpchat',
  templateUrl: './adminhelpchat.component.html',
  styleUrls: ['./adminhelpchat.component.css']
})
export class AdminhelpchatComponent implements OnInit {
 
  helpTickets: any[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  private roles: string[] = [];
  searchTerm: string = '';
  pagedHelpTickets: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages!: number;
  modalOpen: boolean = false;
  selectedTicket: any;
  newComment: string = '';
  ticketId: number | null = null; // Initialize as null
  comments: any[] = [];
  statusUpdateInProgress = false;

  constructor(private userservice:UserService,private storageService:StorageService,private router:Router,private http:HttpClient) {}

  ngOnInit(): void {
    this.loadHelpTickets();

    this.userservice.getAdminBoard().subscribe({
      next: (data) => {
        this.content = data;
        this.currentUser = this.storageService.getUser();
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      },
      error: (err) => {
        console.log(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      }
    });

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  loadHelpTickets(): void {
    this.userservice.getHelpTickets().subscribe(
      tickets => {
        this.helpTickets = tickets;
        this.totalPages = Math.ceil(this.helpTickets.length / this.pageSize);
        this.updatePagedHelpTickets();
      },
      error => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  updatePagedHelpTickets(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedHelpTickets = this.helpTickets.slice(startIndex, endIndex);
  }

  paginateHelpTickets(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedHelpTickets = this.helpTickets.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateHelpTickets();
      this.updatePagedHelpTickets();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateHelpTickets();
      this.updatePagedHelpTickets();
    }
  }


  searchTickets(): void {
    if (this.helpTickets && this.helpTickets.length > 0) {
      if (this.searchTerm.trim() !== '') {
        const searchTermLowerCase = this.searchTerm.toLowerCase().trim();
        this.pagedHelpTickets = this.helpTickets.filter(ticket =>
          (ticket.issue_type && ticket.issue_type.toLowerCase().includes(searchTermLowerCase)) ||
          (ticket.issue_description && ticket.issue_description.toLowerCase().includes(searchTermLowerCase))
        );
        this.totalPages = Math.ceil(this.pagedHelpTickets.length / this.pageSize);
        this.currentPage = 1; // Reset to the first page when performing a search
      } else {
        this.totalPages = Math.ceil(this.helpTickets.length / this.pageSize);
        this.currentPage = 1; // Reset to the first page when clearing the search
        this.updatePagedHelpTickets();
      }
    }
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
        this.userservice.addComment(this.ticketId.toString(), this.newComment).subscribe(
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
      this.userservice.getComments(this.ticketId.toString()).subscribe(
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

  updateTicketStatus() {
    this.statusUpdateInProgress = true; // Show loading message

    // Assuming you have the selectedTicket object containing ticket details.
    // You can update the status property to "closed."
    this.selectedTicket.status = 'closed';

    // Make an HTTP request to your Node.js server to update the status in the MySQL database.
    this.http.post(`${BASE_URL}/updatehelpticketstatus`, { ticketId: this.ticketId, status: 'Closed' })
      .subscribe(response => {
        // Handle the response as needed.
        this.statusUpdateInProgress = false; // Hide loading message
      }, error => {
        console.error(error);
        this.statusUpdateInProgress = false; // Hide loading message
        // Handle error if the API call fails.
      });
  }
}

