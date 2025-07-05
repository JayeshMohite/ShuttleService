import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { TicketsService } from '../_services/tickets.service';
import { BASE_URL } from "../_services/config";
import { concatMap } from 'rxjs/operators';

declare var Razorpay: any;
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
  stationPassed: string;
  stations:string;
  stationName: string;
 
}
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit{
  @ViewChild('payButton') payButton!: ElementRef;

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
  finalfare: number;
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
  isError: boolean = false;
  bookButtonClicked: boolean = false;
  ticketBookedSuccessfully: boolean = false;
  orderID: String = '';
  filteredDropStations: User[] = [];
  modalOpen: boolean = false;
  walletBalance: number | undefined = 0;
  confirmationModalOpen = false;
  purchasedticketcount : number | undefined;

  constructor( private userService: UserService,private storageService: StorageService,private router:Router, private http: HttpClient,private ticketService: TicketsService) {
    this.finalfare = 0;
   }

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
    this.getWalletBalance();
   
    
    }else{
      this.router.navigate(['/login']);
    }
  }

  loadRazorpayScript() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      this.initRazorpay();
      console.log('Razorpay script loaded'); 
    };
    document.body.appendChild(script);
  }
  initRazorpay() {

    const authUserJSON = localStorage.getItem('auth-user');
    const authUser = authUserJSON ? JSON.parse(authUserJSON) : null;
    
    // Extracting email and phone from the authUser object
    const email = authUser.email;
    const phone = authUser.phone;
    
    
    const RazorpayOptions = {
      description: 'RazorpayGateway',
      currency: 'INR', 
      amount: this.finalfare + '00',
      name: 'Shuttle.com',
      key: 'rzp_test_396sVNGGUfkuAL',
      order_id: this.orderID,
      prefill: {
        email: email,
        contact: phone,
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal dismissed.');
          // Handle the case when the user closes the payment form without completing the transaction
          // You can show an appropriate message to the user or take any necessary action
          const paymentStatusData = {
            ticketId: this.ticketId,
            paymentStatus: 'failed',
            refundStatus: 'not-applicable',
            paymentId: "NA"
          };
      
          this.userService.post<any>(`updatePaymentStatus`, paymentStatusData)
            .subscribe(
              response => {
                console.log('Payment status updated as failed in the backend.');
                // Here you can show an error message to the user if needed
              },
              error => {
                console.error('Error updating payment status:', error);
                // Handle the error if the payment status update fails
                // You might want to show an error message to the user or handle retries
              }
            );
            
            this.closeModal();
            window.location.reload();
        }
        
      },
      handler: (response: any) => {
        const paymentId = response.razorpay_payment_id;
        const paymentStatusData = {
          ticketId: this.ticketId,
          paymentStatus: 'successful',
          refundStatus: 'applicable',
          paymentId: paymentId
        };
  
        this.userService.post<any>(`updatePaymentStatus`, paymentStatusData)
          .subscribe(
            response => {
              console.log('Payment status updated as successful in the backend.');
              // Here you can show a success message to the user if needed
            },
            error => {
              console.error('Error updating payment status:', error);
              // Handle the error if the payment status update fails
              // You might want to show an error message to the user or handle retries
            }
          );
          // Show an alert indicating payment success
         alert('Payment is successfull');

         // Redirect to another page (change 'other-page-url' to the URL of the desired page)
         window.location.href = 'tickets';
      }
      
    };
  
    const rzp = new Razorpay(RazorpayOptions);
    rzp.on('payment.failed', (response: any) => {
      const paymentStatusData = {
        ticketId: this.ticketId,
        paymentStatus: 'failed',
        refundStatus: 'not-applicable',
        paymentId: 'NA'
      };
  
      this.userService.post<any>(`updatePaymentStatus`, paymentStatusData)
        .subscribe(
          response => {
            console.log('Payment status updated as failed in the backend.');
            // Here you can show an error message to the user if needed
          },
          error => {
            console.error('Error updating payment status:', error);
            // Handle the error if the payment status update fails
            // You might want to show an error message to the user or handle retries
          }
        );
        rzp.close();
        this.closeModal();
        // Show an alert indicating payment failure
         alert('Payment is failed. Please try again.');

        
        window.location.reload();
    });
  
    // Trigger the Razorpay payment modal only when the ticket is booked successfully
    console.log('Opening Razorpay payment modal...');
    rzp.open();
  }
  
  selectBus(bus: any) {
    // Pass the selected bus to the bus booking page
    this.router.navigate(['/bus-booking', bus.id]);
  }
  

  bookBus() {
    
    this.bookButtonClicked = true;
    if (!this.selectedRoute || !this.selectedBusID || !this.selectedPickUp || !this.selectedDropPoint || !this.selectedBusType || !this.totalTickets) {
      this.isError = true;
      return;
    }

    this.ticketId = uuidv4();
    this.printTicket();
    this.calculateDistanceAndFare();
    this.ticketTimestamp = new Date().toLocaleDateString();
  
    let ticketCount = this.totalTickets; // Total number of tickets being purchased

   

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
      verificationStatus: 'Not-verified',
      PaymentType: 'Online',
    
    };
    
    
    this.purchasedTickets.push(newTicket);
    
    this.userService.post<User>('bookticket', newTicket)
      .subscribe(
        response => {
          console.log('Ticket booked successfully');
          // Reset the ticket form or show a success message
          this.ticketBookedSuccessfully = true;
          this.razorpayorder();
          
        },
        error => {
          console.error('Error booking ticket:', error);
          // Show an error message
          this.ticketBookedSuccessfully = false;
        }
      );
  }

  razorpayorder(){
    const requestBody = { ticketId: this.ticketId };
     // Make the request to the '/razorpayorder' endpoint
     this.userService.post<any>(`razorpayorder`, requestBody).subscribe(
      orderResponse => {
        // Handle the response from the '/razorpayorder' API
        console.log('Razorpay order created:', orderResponse);
        this.orderID = orderResponse.orderId;
        console.log(this.orderID);
        // Do any further processing with the orderResponse if needed
        this.loadRazorpayScript();
      },
      error => {
        console.error('Error creating Razorpay order:', error);
        // Handle any errors that occur during the API call
      }
    );
  }


    // Function to check if a field is not selected
    isFieldNotSelected(fieldValue: any): boolean {
      return fieldValue === '' || fieldValue === null || fieldValue === undefined;
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
    this.selectedBusType = '';
    const url = `/buses?route=${this.selectedRoute}&available=true`;
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

  filterBusesByType(busType: string): void {
    this.filteredBuses = this.buses.filter(bus => bus.busType === busType);
  }

  onPickUpChange(): void {
    if (this.selectedPickUp) {
      // Find the selected pick-up station
      const selectedPickUpStation = this.filteredStations.find(station => station.station === this.selectedPickUp);
  
      if (selectedPickUpStation) {
        const selectedPickUpKm = selectedPickUpStation.Km;
        
        // Filter the stations for the drop-down based on km
        this.filteredDropStations = this.stations.filter(station => station.routeName === this.selectedRoute && station.Km > selectedPickUpKm);
      }
    }
  }

  onBusChange(): void {
    if (this.selectedBusID) {
      // Find the selected bus object based on its id
      const selectedBus = this.filteredBuses.find(bus => bus.id.toString() === this.selectedBusID);
    
      // Check if a bus with the selected id was found
      if (selectedBus) {
        // Extract the busName from the selected bus
        const busName = selectedBus.busName;
    
        // Create a copy of the previous filteredStations for logging
        const previousFilteredStations = [...this.filteredStations];
    
        // Continue with the rest of your code...
        const url = `/seats?id=${this.selectedBusID}`;
        this.userService.getRequest<User[]>(url).subscribe(
          (data: User[]) => {
            this.buses = data;
            this.filteredBuses = this.buses.filter(bus => bus.id.toString() === this.selectedBusID);
    
            // Make the API call to get the station status for the selected bus
            const stationStatusUrl = `/getfilterstationstatus?busName=${busName}&route=${this.selectedRoute}`;
            this.userService.getRequest<User[]>(stationStatusUrl).subscribe(
              (stationData: User[]) => {
                console.log("stationData:", stationData); // Log stationData
    
                // Convert station names to lowercase for case-insensitive comparison
                const stationNamesLowerCase = stationData
                  .filter(data => data.stationPassed === 'passed') // Filter only 'notPassed' stations
                  .map(data => data.stations ? data.stations.toLowerCase() : '');
    
                console.log(stationNamesLowerCase);
    
                // Find the last 'passed' station dynamically
                let lastPassedStation = '';
                for (let i = stationData.length - 1; i >= 0; i--) {
                  if (stationData[i].stationPassed === 'passed') {
                    lastPassedStation = stationData[i].stations;
                    break;
                  }
                }
    
                // Filter the stations based on the stationPassed status and include the last 'passed' station
                this.filteredStations = this.stations.filter(station => {
                  const stationNameLowerCase = station.station ? station.station.toLowerCase() : ''; // Use 'station' property
                  const isStationPassed = stationNamesLowerCase.includes(stationNameLowerCase);
    
                  // Include the station if it's in the selectedRoute and stationPassed is 'notPassed'
                  return (
                    station.routeName === this.selectedRoute &&
                    (!isStationPassed || station.station === lastPassedStation)
                  );
                });
    
                // Log both previous and new filtered stations
                console.log("Previous filteredStations:", previousFilteredStations);
                console.log("New filteredStations:", this.filteredStations);
              },
              (error) => {
                console.error(error);
              }
            );
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        // Handle the case where the selected bus was not found
        console.error("Selected bus not found in filteredBuses.");
      }
    }    
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

  openTicketModal(): void {
    this.modalOpen = true;
    this.calculateDistanceAndFare();
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  getWalletBalance() {
    const userID = this.currentUser.id;
    this.http.get<any>(`${BASE_URL}/walletbalance/${userID}`).subscribe(
      (response) => {
        if (response && response.balance !== undefined) {
          this.walletBalance = response.balance;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Failed to fetch wallet balance:', error);
      }
    );
  }

  payViaWallet() {
    if (this.finalfare !== undefined && this.walletBalance !== undefined && this.finalfare <= this.walletBalance) {
      const newBalance = (this.walletBalance ?? 0) - (this.finalfare ?? 0);
      this.updateWalletBalance(newBalance); this.ticketId = uuidv4();
      this.printTicket();
      this.calculateDistanceAndFare();
      this.ticketTimestamp = new Date().toLocaleDateString();
    
      
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
        verificationStatus: 'Not-verified',
        PaymentType: 'Wallet',
        
      };
      
      
      
      this.purchasedTickets.push(newTicket);
      
      this.userService.post<User>('bookticket', newTicket)
        .subscribe(
          response => {
            console.log('Ticket booked successfully');
            // Reset the ticket form or show a success message
            this.ticketBookedSuccessfully = true;
            this.ticketwalletstatus();
            
          },
          error => {
            console.error('Error booking ticket:', error);
            // Show an error message
            this.ticketBookedSuccessfully = false;
          }
        );
    } else {
      console.error('Invalid payment amount or insufficient wallet balance');
      // You can display an error message to the user or take appropriate action
    }
  }


  ticketwalletstatus() {
    // Create an object with the data you want to update in MySQL
    const updateData = {
      ticketId: this.ticketId,
      PaymentStatus: 'successful',
      RefundStatus: 'applicable',
      PaymentId: 'Wallet' // Assuming PaymentId should be set to 'Wallet'
    };
  
    // Make an API call to update the payment status directly
    this.userService.post<User>('updateticketwallet', updateData)
      .subscribe(
        () => {
          console.log('Ticket status updated successfully');
        },
        (error) => {
          console.error('Error updating ticket status:', error);
        }
      );
  }


  updateWalletBalance(newBalance: number) {
    const userID = this.currentUser.id;
    
    // Make a GET request to fetch the current wallet balance
    this.http.get<any>(`${BASE_URL}/walletbalance/${userID}`).subscribe(
      (response) => {
        if (response && response.balance !== undefined) {
          const currentBalance = response.balance;
  
          // Ensure that the current balance is sufficient for the payment
          if (currentBalance >= this.finalfare) {
            // Calculate the new wallet balance after the payment
            const updatedBalance = currentBalance - this.finalfare;
  
            // Make a PUT request to update the wallet balance
            this.http.put<any>(`${BASE_URL}/updatewallet/${userID}`, { newBalance: updatedBalance }).subscribe(
              (updateResponse) => {
                if (updateResponse && updateResponse.message === 'Wallet balance updated successfully') {
                  this.walletBalance = updatedBalance; // Update the wallet balance in the component
                  console.log('Payment via wallet successful');
                  // You can add further logic here, such as updating payment status
                } else {
                  console.error('Invalid response format:', updateResponse);
                }
              },
              (updateError) => {
                console.error('Failed to update wallet balance:', updateError);
              }
            );
          } else {
            console.error('Insufficient wallet balance for payment');
            // Handle insufficient balance error
          }
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Failed to fetch wallet balance:', error);
      }
    );
  }

  openConfirmationModal() {
    this.confirmationModalOpen = true;
  }
  
  closeConfirmationModal() {
    this.confirmationModalOpen = false;
  }
  
  confirmPayment() {
    // Implement your payment logic here
    // If payment is successful, close the confirmation modal
    this.payViaWallet();
    this.closeConfirmationModal();
    alert('Payment successful');

    this.router.navigate(['/tickets']).then(() => {
      window.location.reload(); // Reload the page
    });

  }
}
