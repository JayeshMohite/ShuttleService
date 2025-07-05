import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BASE_URL } from "../_services/config";


interface User {
  id: number;
  busName: string;
  busNumber: string;
  conductorName: string;
  conductorNumber: string;
  busRoute: string;
  totalseat: string;
  station: string;
  route: string;
  routeName: string;
  selectedBusID: number;
  distance: number;
  Km: number;
  busType: string;
  TicketID: string;
  Timestamp: string;
  TotalSeats: string;
  SelectedBusID: string;
  created_at: string;
}
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
  
  searchTerm: string = '';
  currentUser: any;
  isLoggedIn = false;
  content: any;
  roles: any;
  showUserBoard: any;
  tickets: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // You can set the number of items per page here
  pagedTickets: any[] | undefined;
  totalPages: number | undefined;
  
  constructor( private userService: UserService,private storageService: StorageService,private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
        this.getTickets(this.currentUser.id);
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.showUserBoard = this.roles.includes('ROLE_USER');
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });


    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
    
    }else{
      this.router.navigate(['/login']);
    }
  }

  
  getTickets(userId: string): void {
    const url = `users/${userId}/tickets`;
    this.userService.get<User[]>(url).subscribe(
      (data: User[]) => {
        this.tickets = data;
        this.tickets.sort((a: User, b: User) => {
          // Sort by the Timestamp property in descending order
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        this.totalPages = Math.ceil(this.tickets.length / this.pageSize);
        this.updatePagedTickets();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  
  updatePagedTickets(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedTickets = this.tickets.slice(startIndex, endIndex);
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedTickets();
    }
  }
  
  nextPage(): void {
    const totalPages = Math.ceil(this.tickets.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagedTickets();
    }
  }

  generateQRCode(ticketId: any, ticketTimestamp: any,  totalSeats: any) {
    const apiEndpoint = 'https://api.qrserver.com/v1/create-qr-code/';
    const queryString = `?size=200x200&data=${encodeURIComponent(ticketId + ' ' + ticketTimestamp + ' '+ totalSeats)}`;
    return apiEndpoint + queryString;
  }

}
