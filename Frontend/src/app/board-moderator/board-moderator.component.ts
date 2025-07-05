import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from '@zxing/library';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit{

  content?: string;
  isLoggedIn = false;
  currentUser: any;
  qrCodeScannerActive = false;
  verifiedTickets: any[] = [];
  verificationResult: string='';

  constructor(private userService: UserService,private storageService: StorageService,private router:Router,private http: HttpClient) { }

  ngOnInit(): void {
    
    this.userService.getModeratorBoard().subscribe({
      next: data => {
        this.content = data;
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
  
}
