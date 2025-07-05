import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import  Chart from 'chart.js/auto';
import { BASE_URL } from '../_services/config';
import { UserService } from '../_services/user.service';

interface TicketData {
  ticketMonth: any;
  ticketDate: string;
  ticketCount: number;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  isLoggedIn = false;
  totalTickets: any;
  totalFare: any;

  constructor(private storageService: StorageService,private router:Router,private http: HttpClient, private userservice: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.loadTickets();
    this.loadTotalFare();

    if (this.isLoggedIn) {
      const userId = this.currentUser.id;
      this.userservice.get<TicketData[]>(`graphtickets/${userId}`).subscribe(
        (data) => {
          // Process the data and extract necessary information for the chart
          const labels = data.map(item => item.ticketMonth); // Use ticketMonth for labels directly
          const ticketCountData = data.map(item => item.ticketCount);
  
          // Render the chart with the retrieved data
          this.renderChart(labels, ticketCountData);
        },
        (error) => {
          console.error(error);
          // Handle error if needed
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  renderChart(labels: string[], ticketCountData: number[]): void {
    // Render the chart with the retrieved data
    new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tickets Count',
          data: ticketCountData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Tickets Count',
              font: {
                weight: 'bold'
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date',
            }
          }
        }
      }
    });
  }

  getInitials(username: string): string {
    return username.split(' ').map(name => name.charAt(0)).join('').slice(0, 2);
  }

  loadTickets() {
    const userId = this.currentUser.id; // Replace with the actual user ID you want to fetch tickets for

    this.userservice.get<any>(`getgraphTickets/${userId}`).subscribe(
      (data) => {
        this.totalTickets = data.totalTickets;
      },
      (error) => {
        console.error('Error fetching tickets: ', error);
      }
    );
  }

  loadTotalFare() {
    const userId = this.currentUser.id;

    this.userservice.get<any>(`getTotalFare/${userId}`).subscribe(
      (data) => {
        this.totalFare = data.totalFare;
      },
      (error) => {
        console.error('Error fetching total fare: ', error);
      }
    );
  }

}