import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../_services/storage.service';
import { BASE_URL } from '../_services/config';

declare var Razorpay: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public amountToAdd: number | undefined;
  modalOpen: boolean = false;
  orderID: string ='';
  isError: boolean = false;
  currentUser: any;
  purchasedTickets: any[] = [];
  transactionId: string = '';
  walletBalance: number | undefined;
  

  constructor(private http: HttpClient, private userService: UserService, private storageService: StorageService) {}
  
  
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.getWalletBalance();
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
      amount: this.amountToAdd + '00',
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
            paymentStatus: 'failed',
            paymentId: "NA",
            orderID: this.orderID,
            transactionId: this.transactionId,
            userID: this.currentUser.id,
            amount: this.amountToAdd
          };
      
          this.userService.post<any>(`userwallet`, paymentStatusData)
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
          paymentStatus: 'successful',
          paymentId: paymentId,
          orderID: this.orderID,
          transactionId: this.transactionId,
          userID: this.currentUser.id,
          amount: this.amountToAdd
        };

        this.userService.post<any>(`wallet`, paymentStatusData)
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
  
        this.userService.post<any>(`userwallet`, paymentStatusData)
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
         window.location.reload();
      }
      
    };
  
    const rzp = new Razorpay(RazorpayOptions);
    rzp.on('payment.failed', (response: any) => {
      const paymentStatusData = {
        paymentStatus: 'failed',
        paymentId: 'NA',
        orderID: this.orderID,
        transactionId: this.transactionId,
        userID: this.currentUser.id,
        amount: this.amountToAdd
      };
  
      this.userService.post<any>(`userwallet`, paymentStatusData)
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

  closeModal(): void {
    this.modalOpen = false;
  }

  createRazorpayOrder(): void {
    this.razorpayorder();
  }

  razorpayorder(){
    const requestBody = { transactionId: this.transactionId};
     // Make the request to the '/razorpayorder' endpoint
     this.userService.post<any>(`walletordercreate`, requestBody).subscribe(
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


  addMoneyToWallet() {
    if (!this.amountToAdd || this.amountToAdd <= 0 || !this.currentUser.id) {
      // Handle validation errors or missing data
      this.isError = true;
      return;
    }

    this.transactionId = uuidv4();
  
    
  
    const newTicket = {
      
      transactionId: this.transactionId,
      finalfare: this.amountToAdd,
      userId: this.currentUser.id,
    };
    
    
    this.purchasedTickets.push(newTicket);
    
    this.userService.post<any>('moneyorder', newTicket)
      .subscribe(
        response => {
          console.log('Money added successfully');
          // Reset the ticket form or show a success message
         
          this.razorpayorder();
          
        },
        error => {
          console.error('Failed to add Money', error);
          // Show an error message
         
        }
      );
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

  
}


