import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-newbus',
  templateUrl: './newbus.component.html',
  styleUrls: ['./newbus.component.css']
})
export class NewbusComponent implements OnInit {
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
  editMode: boolean = false;
  editUserId: number | null = null;
  private roles: string[] = [];
  currentUser: any;
  showAdminBoard = false;
  id: any;
  isSidebarOpen: boolean = false;
  busType: string = '';
  available: string = '';
  BusAvailable: string = '';



  constructor(private http: HttpClient,private userService: UserService,private router: Router,private storageService:StorageService,private route: ActivatedRoute){}

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

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const busName = params['busName'];
      const busNumber = params['busNumber'];
      const conductorName = params['conductorName'];
      const conductorNumber = params['conductorNumber'];
      const busRoute = params['busRoute'];
      const totalseat = params['totalseat'];
      const busType = params['busType'];
      const BusAvailable = params['available']
  
      // Use the retrieved values to pre-fill the form fields
      this.busName = busName;
      this.busNumber = busNumber;
      this.conductorName = conductorName;
      this.conductorNumber = conductorNumber;
      this.busRoute = busRoute;
      this.totalseat = totalseat;
      this.id = id;
      this.busType = busType;
      this.BusAvailable = BusAvailable;
    });
  }

  getUsers(): void {
    this.userService.get<User[]>('buspage')
      .subscribe(data => {
        this.users = data;
      });
  }

  onSubmit(form: any): void {
    const user: User = form.value;
    if (this.id) {
      user.id = this.id; // Set the ID of the user being edited
  
      this.updateUser(user);
      this.router.navigate(['/Buslist']);
    } else {
      this.createUser(user);
      this.router.navigate(['/Buslist']);
    }
  
    form.resetForm();
  }
  
  createUser(user: User): void {
    this.userService.post<User>('buspage', user)
      .subscribe(data => {
        this.users.push(data);
      });
  }

  updateUser(user: User): void {
    this.userService.put(`buspage/${user.id}`, user)
      .subscribe(() => {
        const index = this.users.findIndex(u => this.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
        }
      });
    this.editUserId = null; // Set editUserId to null after updating the user
  }

  editUser(user: User): void {
    this.editUserId = user.id;
    this.busName = user.busName;
    this.busNumber = user.busNumber;
    this.conductorName = user.conductorName;
    this.conductorNumber = user.conductorNumber;
    this.busRoute = user.busRoute;
    this.totalseat = user.totalseat;
    this.busType = user.busType;
  }

  deleteUser(user: User): void {
    this.userService.delete(`buspage/${user.id}`)
      .subscribe(() => {
        this.users = this.users.filter(u => u.id !== user.id);
      });
  }

  getRoutes(): void {
    this.userService.get<User[]>('routes')
      .subscribe(data => {
        this.routes = data;
      });
  }

   
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
