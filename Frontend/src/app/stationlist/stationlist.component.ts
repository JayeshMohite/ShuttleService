import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';


interface Station {
 station: string;
 routeName: string;
 Km: number;
 latitude: string;
 longitude: string;
 stationNo: string;
}
@Component({
  selector: 'app-stationlist',
  templateUrl: './stationlist.component.html',
  styleUrls: ['./stationlist.component.css']
})
export class StationlistComponent {
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
  stations: Station[] = [];
  pagedStations: Station[] | undefined;
  searchTerm: string = '';


  constructor(private authService: AuthService,private router:Router,private storageService: StorageService,private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
        this.currentUser = this.storageService.getUser();
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.getStations();
      },
      error: err => {
        console.log(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  getStations(): void {
    this.userService.getStation().subscribe(data => {
      this.stations = data;
      this.paginateStations();
      this.totalPages = Math.ceil(this.stations.length / this.pageSize);
      this.updatePagedStations();
    });
  }

  updatePagedStations(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedStations = this.stations.slice(startIndex, endIndex);
  }

  paginateStations(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedStations = this.stations.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateStations();
      this.updatePagedStations();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.stations.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateStations();
      this.updatePagedStations();
    }
  }

  deleteStation(station: Station): void {
    const confirmDelete = confirm(`Are you sure you want to delete station with name "${station.station}"?`);
    if (confirmDelete) {
      this.userService.delete(`deletestation/${station.station}`)
        .subscribe(() => {
          this.stations = this.stations.filter(s => s.station !== station.station);
        });
      window.location.reload();
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  searchStations() {
    if (this.searchTerm.trim() !== '') {
      const searchTermLowerCase = this.searchTerm.toLowerCase().trim();
      this.pagedStations = this.stations.filter(station =>
        station.station.toLowerCase().includes(searchTermLowerCase)
      );
    } else {
      this.pagedStations = this.stations;
    }
  }

}


