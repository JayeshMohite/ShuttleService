import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import  Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_services/config';



interface TicketStats {
  verifiedTickets: number;
  failedTickets: number;
  refundedTickets: number;
}
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  currentUser: any;
  showAdminBoard = false;
  totalUsers: number | undefined;
  totalBus: any;
  totalRoute: any;
  totalStation: any;
  ticketStats: TicketStats | undefined;
 

  isSidebarOpen: boolean = false;

  constructor(private http: HttpClient,private userService: UserService,private storageService: StorageService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
        this.currentUser = this.storageService.getUser();
        const user = this.storageService.getUser();
        this.roles = user.roles;
        const userId = this.currentUser.id;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        
        this.userService.getCountsUser().subscribe(
          (data: any) => {
            this.totalUsers = data.totalCount;
          },
          (error) => {
            console.log(error);
          }
        );
        this.userService.getCountsBus().subscribe(
          (data: any) => {
            this.totalBus = data.totalCount;
          },
          (error) => {
            console.log(error);
          }
        );
        this.userService.getCountsRoute().subscribe(
          (data: any) => {
            this.totalRoute = data.totalCount;
          },
          (error) => {
            console.log(error);
          }
        );
        this.userService.getCountsStation().subscribe(
          (data: any) => {
            this.totalStation = data.totalCount;
          },
          (error) => {
            console.log(error);
          }
        );
        this.http.get<TicketStats[]>(`${BASE_URL}/getTicketStats`).subscribe(
          (data) => {
            if (data.length > 0) {
              this.ticketStats = data[0];
              this.renderPieChart(data[0]);
            } else {
              console.error('No ticket stats data received.');
            }
          },
          (error) => {
            console.error('Error fetching ticket stats: ', error);
          }
        );
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



  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


renderPieChart(ticketStats: TicketStats): void {
  const chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  // @ts-ignore: Bypass TypeScript type checking for the options object
  new Chart('pieChart', {
    type: 'pie',
    data: {
      labels: ['Verified', 'Failed', 'Refunded'],
      datasets: [{
        data: [ticketStats.verifiedTickets, ticketStats.failedTickets, ticketStats.refundedTickets],
        backgroundColor: ['#36A2EB', '#eb3636', '#FFCE56'],
        borderWidth: 1
      }]
    },
    options: chartOptions
  });
}

}