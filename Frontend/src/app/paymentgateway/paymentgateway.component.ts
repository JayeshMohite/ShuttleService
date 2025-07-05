import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';


declare var Razorpay: any;
@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.css']
})


export class PaymentgatewayComponent implements OnInit{

  @ViewChild('payButton') payButton!: ElementRef;

  ngOnInit() {
    this.loadRazorpayScript();
  }

  loadRazorpayScript() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      this.initRazorpay();
    };
    document.body.appendChild(script);
  }

  initRazorpay() {
    const RazorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100000,
      name: 'Sai',
      key: 'rzp_test_2tIn5F5m1QoKNl',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'sai kumar',
        email: 'sai@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    };

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
      // Handle successful payment here
      // You can update your database, show a success message, etc.
    };

    const failureCallback = (e: any) => {
      console.log(e);
      // Handle payment failure here
      // You can show an error message to the user, handle retries, etc.
    };

    this.payButton.nativeElement.addEventListener('click', () => {
      Razorpay.open(RazorpayOptions, successCallback, failureCallback);
    });
  }
}


  