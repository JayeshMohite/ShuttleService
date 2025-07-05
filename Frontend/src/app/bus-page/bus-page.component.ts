import { Component, OnInit,Injectable } from '@angular/core';
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
}


@Component({
  selector: 'app-bus-page',
  templateUrl: './bus-page.component.html',
  styleUrls: ['./bus-page.component.css']
})


export class BusPageComponent implements OnInit {

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
  available: string = '';

  constructor(private http: HttpClient,private userService: UserService,private router: Router,private storageService:StorageService) {}

  ngOnInit(): void {
    
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
    this.getUsers();
    this.getRoutes();
    }else{
      this.router.navigate(['/login']);
    }
  }

  getUsers(): void {
    this.userService.get<User[]>('buspage')
      .subscribe(data => {
        this.users = data;
      });
  }

  onSubmit(form: any): void {
    if (this.editUserId) {
      this.updateUser(form.value);
      window.location.reload();
    } else {
      this.createUser(form.value);
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
    this.userService.put(`buspage/${this.editUserId}`, user)
      .subscribe(() => {
        const index = this.users.findIndex(u => u.id === this.editUserId);
        if (index !== -1) {
          this.users[index] = user;
        }
      });
    this.editUserId = 0;
  }

  editUser(user: User): void {
    this.editUserId = user.id;
    this.busName = user.busName;
    this.busNumber = user.busNumber;
    this.conductorName = user.conductorName;
    this.conductorNumber = user.conductorNumber;
    this.busRoute = user.busRoute;
    this.totalseat = user.totalseat;
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
}

