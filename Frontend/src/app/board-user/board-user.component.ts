import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { TicketsService } from '../_services/tickets.service';
import { BASE_URL } from "../_services/config";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from '@zxing/library';




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
}

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit{


  routes: User[] = []; // Example routes, replace with your own
  stations: User[] = [];
  selectedRoute: string = '';
  selectedBusID: string = '';
  buses: User[] = [];
  selectedBus: string = '';
  selectedStation: string = '';
  selectedPickUp: string = '';
  filteredBuses: User[] = [];
  filteredStations: User[] = [];
  selectedDropPoint: string = '';
  ticketId: string = '';
  ticketTimestamp: string = '';
  totalTickets: number = 1;
  content?: string;
  isLoggedIn = false;
  purchasedTickets: any[] = [];
  totalDistance: number | null=null;
  fare: number | null=null;
  finalfare: number | null=null;
  currentUser: any;
  tickets: any[] = [];
  roles: any;
  showUserBoard=false;
  selectedBusType: string = '';
  qrCodeScannerActive = false;
  verifiedTickets: any[] = [];
  verified: User[]=[];
  verificationResult: string='';
  buseslist: User[] = [];
  filteredTickets: User[] = [];
  allticket: User[] = [];


  constructor( private userService: UserService,private storageService: StorageService,private router:Router, private http: HttpClient,private ticketService: TicketsService) { }

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
    this.getRoutes();
    this.getStation();
    this.onBusSelectList();
    
    }else{
      this.router.navigate(['/login']);
    }
  }

  startQrCodeScanner() {
    this.qrCodeScannerActive = true;
    this.initQrCodeScanner();
  }

  initQrCodeScanner() {
    const codeReader = new BrowserMultiFormatReader();
    const hints = new Map<DecodeHintType, any>();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
  
    const videoElement = document.getElementById('qr-video') as HTMLVideoElement;
  
    if (this.qrCodeScannerActive) {
      codeReader.decodeFromVideoDevice(null, videoElement, (result, error) => {
        if (result) {
          this.verifyTicket(result.getText());
          codeReader.reset();
        }
        if (error) {
          console.error('QR code scanning error:', error);
        }
      });
    }
  }
  

  verifyTicket(qrCodeData: string) {
    this.userService.getTicketDetails(qrCodeData).subscribe(
      (response: any) => {
        console.log('Backend Response:', response); // Log the backend response for debugging
  
        if (response.ticket && response.ticket.valid) {
          this.verifiedTickets.push(response.ticket);
          console.log('Ticket Verified:', response.ticket);
          this.verificationResult = 'success';
          alert('Ticket Verified.');
        } else {
          console.log('Ticket Already Registered !');
          this.verificationResult = 'failure';
          alert('Ticket Already Registered !');
        }
        window.location.reload();
      },
      (error: any) => {
        console.error('Ticket verification error:', error);
        alert('Ticket Verification Error !');
        window.location.reload();
      }
    );
  }

  selectBus(bus: any) {
    // Pass the selected bus to the bus booking page
    this.router.navigate(['/bus-booking', bus.id]);
  }

  bookBus() {
    this.ticketId = uuidv4();
    this.printTicket();
    this.calculateDistanceAndFare();
    this.ticketTimestamp = new Date().toLocaleString();
  
    const ticketCount = this.totalTickets; // Total number of tickets being purchased

  
    const newTicket = {
      
      ticketId: this.ticketId,
      timestamp: this.ticketTimestamp,
      route: this.selectedRoute,
      busId: this.selectedBusID,
      pickUp: this.selectedPickUp,
      dropPoint: this.selectedDropPoint,
      totalseats: ticketCount,
      totalDistance: this.totalDistance,
      finalfare: this.finalfare,
      userId: this.currentUser.id,
      busType: this.selectedBusType,
      verificationStatus: 'Not-verified'
    };
    
  
    this.purchasedTickets.push(newTicket);
    
    this.userService.post<User>('bookticket', newTicket)
      .subscribe(
        response => {
          console.log('Ticket booked successfully');
          // Reset the ticket form or show a success message
          window.location.reload();
        },
        error => {
          console.error('Error booking ticket:', error);
          // Show an error message
        }
      );
    
  }
  
  calculateDistanceAndFare() {
    const ACfarePerKm: number = 10; // AC bus fare per km
    const NONACfarePerKm: number = 5; // NON-AC bus fare per km
    const ticketCount = this.totalTickets;
    if (this.selectedPickUp && this.selectedDropPoint) {
      // Find the selected pick-up and drop stations
      const pickUpStation = this.filteredStations.find(station => station.station === this.selectedPickUp);
      const dropPointStation = this.filteredStations.find(station => station.station === this.selectedDropPoint);
  
      if (pickUpStation && dropPointStation) {
        // Calculate the distance traveled
        const distance = dropPointStation.Km - pickUpStation.Km;
  
        let farePerKm: number;
      if (this.selectedBusType === 'AC') {
        farePerKm = ACfarePerKm;
      } else {
        farePerKm = NONACfarePerKm;
      }

        // Calculate the fare based on the distance
        const fareperticket = distance * farePerKm;
        this.finalfare = fareperticket * ticketCount;
  
        // Set the total distance
        this.totalDistance = distance;
      }
    } else {
      // Reset the values if pick-up or drop point is not selected
      this.totalDistance = null;
      this.fare = null;
    }
  }
  

 
  printTicket() {
    const timestamp = new Date().toLocaleString();
    console.log('User ID: ',this.currentUser.id)
    console.log('Ticket ID:', this.ticketId);
    console.log('Timestamp:', timestamp);
    console.log('Selected Route:', this.selectedRoute);
    console.log('Selected Bus ID:', this.selectedBusID);
    console.log('Selected Pick-Up Point:', this.selectedPickUp);
    console.log('Selected Drop Point:', this.selectedDropPoint);
    console.log('Total tickets:', this.totalTickets);
    console.log('Total Distance: ',this.totalDistance);
    console.log('Bus Type: ',this.selectedBusType);
    console.log('Fare: ',this.finalfare);
  }
  

  getRoutes(): void {
    this.userService.getRequest<User[]>('/routes').subscribe(
      (data: User[]) => {
        this.routes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onRouteChange(): void {
    const url = `/buses?route=${this.selectedRoute}`;
    this.userService.getRequest<User[]>(url).subscribe(
      (data: User[]) => {
        this.buses = data;
        this.filteredBuses = this.buses.filter(bus => bus.busRoute === this.selectedRoute);
        this.filteredStations = this.stations.filter(station => station.routeName === this.selectedRoute);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onBusChange(): void {
    const url = `/seats?id=${this.selectedBusID}`;
    this.userService.getRequest<User[]>(url).subscribe(
      (data: User[]) => {
        this.buses = data;
        this.filteredBuses = this.buses.filter(bus => bus.id.toString() === this.selectedBusID);
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  getStation(): void {
    const url = `/stations?route=${this.selectedPickUp}`;
    this.userService.getRequest<User[]>(url).subscribe(
      (data: User[]) => {
        this.stations = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  getTickets(userId: string): void {
    const url = `${BASE_URL}/users/${userId}/tickets`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`
    });
    this.http.get<User[]>(url, { headers }).subscribe(
      (data: User[]) => {
        this.tickets = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  generateQRCode(ticketId: any, ticketTimestamp: any,  totalSeats: any) {
    const apiEndpoint = 'https://api.qrserver.com/v1/create-qr-code/';
    const queryString = `?size=200x200&data=${encodeURIComponent(ticketId + ' ' + ticketTimestamp + ' '+ totalSeats)}`;
    return apiEndpoint + queryString;
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

}
