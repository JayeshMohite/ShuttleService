import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';



interface User {
  id: number;
  busName: string;
  busNumber: string;
  conductorName: string;
  conductorNumber: string;
  busRoute: string;
  totalseat: string;
  routeName: string;
  busType: string;
}

@Component({
  selector: 'app-buslist',
  templateUrl: './buslist.component.html',
  styleUrls: ['./buslist.component.css']
})
export class BuslistComponent implements OnInit{
  routes: User[] = [];
  busName: string = '';
  busNumber: string = '';
  conductorName: string = '';
  conductorNumber: string = '';
  busRoute: string = '';
  routeName: string = '';
  totalseat: string = '';
  isLoggedIn=false;
  users: User[] = [];
  nextId: number = 1;
  buses: User[] = [];
  editMode: boolean = false;
  editUserId: number | null = null;
  submenuState: { [key: string]: boolean } = {};
  private roles: string[] = [];
  currentUser: any;
  showAdminBoard = false;
  currentPage: number = 1;
  pageSize: number = 8;
  pagedUsers: User[] | undefined;
  totalPages: number | undefined;
  isSidebarOpen: boolean = false;
  searchTerm: string='';
  
  constructor(private http: HttpClient,private userService: UserService,private router: Router,private storageService:StorageService){}

  ngOnInit(): void {
    
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
    this.getUsers();
    this.getRoutes();
    this.currentUser = this.storageService.getUser();
    const user = this.storageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  getUsers(): void {
    this.userService.get<User[]>('buspage').subscribe((data) => {
      this.users = data;
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.updatePagedUsers();
    });
  }

  updatePagedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedUsers();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.users.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagedUsers();
    }
  }

  getRoutes(): void {
    this.userService.get<User[]>('routes')
      .subscribe(data => {
        this.routes = data;
      });
  }

  editUser(user: User): void {
    this.router.navigate(['/NewBus'], {
      queryParams: {
        id: user.id,
        busName: user.busName,
        busNumber: user.busNumber,
        conductorName: user.conductorName,
        conductorNumber: user.conductorNumber,
        busRoute: user.busRoute,
        totalseat: user.totalseat
      },
      queryParamsHandling: 'merge' // Merge the new query parameters with existing ones
    });
  }

  deleteBus(bus: User): void {
    const confirmDelete = confirm(`Are you sure you want to delete bus with name "${bus.busName}"?`);
    if (confirmDelete) {
      this.userService.delete(`buspage/${bus.id}`)
        .subscribe(() => {
          this.users = this.users.filter(b => b.id !== bus.id);
          
        });
        window.location.reload();
    }
  }

  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  searchBuses() {
    if (this.searchTerm.trim() !== '') {
      const searchTermLowerCase = this.searchTerm.toLowerCase().trim();
      this.pagedUsers = this.users.filter(bus =>
        bus.busName.toLowerCase().includes(searchTermLowerCase)
      );
    } else {
      this.pagedUsers = this.users;
    }
  }
}
