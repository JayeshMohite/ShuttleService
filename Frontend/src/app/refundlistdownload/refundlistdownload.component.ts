import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_services/config';
import { DatePipe } from '@angular/common';


interface RefundResult {
  paymentId: string;
  refundId: string;
  status: string;
}
@Component({
  selector: 'app-refundlistdownload',
  templateUrl: './refundlistdownload.component.html',
  styleUrls: ['./refundlistdownload.component.css']
})
export class RefundlistdownloadComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  isSidebarOpen: boolean = false;
  selectedDate: Date = new Date(); 
  data: any[] | undefined;
  selectedFile: File | undefined;
  
  constructor( private datePipe: DatePipe,private http: HttpClient,private authService: AuthService,private router:Router,private storageService: StorageService,private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
    this.currentUser = this.storageService.getUser();
    const user = this.storageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }else{
      this.router.navigate(['/login']);
    }
  }

  downloadRefundList() {
    if (!this.selectedDate) {
      console.log('Please select a date');
      return;
    }
    const formattedDate = this.datePipe.transform(this.selectedDate, 'MMddyyyy');
    console.log(formattedDate);
    const url = `${BASE_URL}/export-excel?date=${formattedDate}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'refund_list.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(event: Event) {
    event.preventDefault();
    
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${BASE_URL}/uploadExcel`, formData).subscribe(
      (response: any) => {
        console.log(response); // Handle the response from the server
        
        if (Array.isArray(response.refundResults)) {
          const successRefunds = response.refundResults.filter((result: RefundResult) => result.status === 'successfull');
          if (successRefunds.length > 0) {
            alert('File uploaded successfully with successful refunds');
          } else {
            alert('File uploaded successfully, but no successful refunds found');
          }
        } else {
          alert('File uploaded, but response format is unexpected');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}



