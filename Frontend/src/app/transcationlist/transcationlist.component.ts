import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';



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
  verificationStatus: string;
  createdAt: string;
}
@Component({
  selector: 'app-transcationlist',
  templateUrl: './transcationlist.component.html',
  styleUrls: ['./transcationlist.component.css']
})
export class TranscationlistComponent implements OnInit{
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  isSidebarOpen: boolean = false;
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number | undefined;
  selectedBusID: any;
  allticket: User[]=[];
  buseslist: User[]=[];
  filteredTickets: User[] = [];
  pagedtickets: User[] = [];
  searchTerm: string = '';
  

  constructor(private authService: AuthService,private router:Router,private storageService: StorageService,private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
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
    this.allticketlist();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  onBusSelectList() {
    const url = `/ticketbuslist`;
    const selectedBusId = this.selectedBusID;
    this.userService.getRequest<User[]>(url).subscribe(
      (data: User[]) => {
        this.buseslist = data;
  
        if (this.selectedBusID) {
          this.filteredTickets = this.allticket.filter(ticket => ticket.SelectedBusID.toString() === selectedBusId.toString());
        } else {
          this.filteredTickets = this.allticket;
        }
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(this.filteredTickets);
  }

  
  allticketlist(){
    const url = `/allticketlist`;
      this.userService.getRequest<User[]>(url).subscribe(
        (data: User[]) => {
          this.allticket = data;
          this.totalPages = Math.ceil(this.allticket.length / this.pageSize);
          this.updatePagedRoutes();
        },
        (error) => {
          console.error(error);
        }
      );

  }
  
  updatePagedRoutes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedtickets = this.allticket.slice(startIndex, endIndex);
  }

  paginateRoutes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedtickets = this.allticket.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRoutes();
      this.updatePagedRoutes();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.allticket.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateRoutes();
      this.updatePagedRoutes();
    }
  }

  toggleSidebar() {
     this.isSidebarOpen = !this.isSidebarOpen;
  }

  verifyTicketManual(ticketID: any) {
    const confirmDelete = confirm(`Are you sure you want to Verify Ticket with ID "${ticketID}"?`);
    if (confirmDelete) {
      this.userService.put(`verifyticketsManual/${ticketID}`, { verificationStatus: 'Verified' })
        .subscribe(
          (response) => {
            // Update the verificationStatus property of the ticket in the frontend
            ticketID.verificationStatus = 'Verified';
           
          },
          (error) => {
            console.error('Error occurred while verifying the ticket:', error);
          }
          
        );
        window.location.reload(); // Reload the page
    }
  }

  
searchTickets() {
  if (this.searchTerm.trim() !== '') {
    const searchTermLowerCase = this.searchTerm.toLowerCase().trim();
    this.pagedtickets = this.allticket.filter(ticket =>
      ticket.TicketID.toLowerCase().includes(searchTermLowerCase)
    );
  } else {
    this.pagedtickets = this.allticket;
  }
}
}
