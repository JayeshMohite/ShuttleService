import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';




interface User {
  id: number;
  busName: string;
  busNumber: string;
  conductorName: string;
  conductorNumber: string;
  busRoute: string;
  totalseat: string;
  routeName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserlistComponent implements OnInit{
  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  users: User[] = [];
  username: string='';
  createdAt: string='';
  updatedAt: string='';
  currentPage: number = 1;
  pageSize: number = 8;
  pagedUsers: User[] | undefined;
  totalPages: number | undefined;
  isSidebarOpen: boolean = false;
  searchTerm: string='';



  constructor(private userService: UserService,private storageService: StorageService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
        this.currentUser = this.storageService.getUser();
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.getUsers();
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
  

  getUsers(): void {
    this.userService.get<User[]>('userlist')
      .subscribe(data => {
        this.users = data;
        this.paginateUsers();
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.updatePagedUsers();
      });
  }

  updatePagedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  editUser(user : User){

  }

  deleteUser(user: User): void {
    const confirmDelete = confirm(`Are you sure you want to delete user "${user.username}"?`);
    if (confirmDelete) {
      this.userService.deleteUser(user.id)
        .subscribe(() => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.totalPages = Math.ceil(this.users.length / this.pageSize);
          this.updatePagedUsers();
        });
    }
  }
  paginateUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
      this.updatePagedUsers();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.users.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateUsers();
      this.updatePagedUsers();
    }
  }

  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  searchTickets() {
    if (this.searchTerm.trim() !== '') {
      const searchTermLowerCase = this.searchTerm.toLowerCase().trim();
      this.pagedUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(searchTermLowerCase)
      );
    } else {
      this.pagedUsers = this.users;
    }
  }
}
