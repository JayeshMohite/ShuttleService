import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';


interface Route {
  routeName: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrls: ['./routelist.component.css']
})
export class RoutelistComponent {
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
  routes: Route[] = [];
  pagedRoutes: Route[] | undefined;
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
        this.gettotalRoutes();
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

  gettotalRoutes(): void {
    this.userService.gettotalRoutes().subscribe((data: any) => {
      this.routes = data;
      this.paginateRoutes();
      this.totalPages = Math.ceil(this.routes.length / this.pageSize);
      this.updatePagedRoutes();
    });
  }

  updatePagedRoutes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedRoutes = this.routes.slice(startIndex, endIndex);
  }

  paginateRoutes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedRoutes = this.routes.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRoutes();
      this.updatePagedRoutes();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.routes.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateRoutes();
      this.updatePagedRoutes();
    }
  }

  deleteRoute(route: Route): void {
    const confirmDelete = confirm(`Are you sure you want to delete Route with name "${route.routeName}"?`);
    if (confirmDelete) {
      this.userService.delete(`deleteroute/${route.routeName}`)
        .subscribe(() => {
          this.routes = this.routes.filter(s => s.routeName !== route.routeName);
        });
      window.location.reload();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  
  searchTickets() {
    if (this.searchTerm.trim() !== '') {
      const searchTermLowerCase = this.searchTerm.toLowerCase().trim();
      this.pagedRoutes = this.routes.filter(route =>
        route.routeName.toLowerCase().includes(searchTermLowerCase)
      );
    } else {
      this.pagedRoutes = this.routes;
    }
  }
}
