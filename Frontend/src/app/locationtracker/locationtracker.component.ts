import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_services/config';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-locationtracker',
  templateUrl: './locationtracker.component.html',
  styleUrls: ['./locationtracker.component.css']
})
export class LocationtrackerComponent implements OnInit {
  latitude: number | undefined;
  longitude: number | undefined;
  locationError: string | undefined;
  username: string | undefined;
  routeName: any;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    
   
    this.getLocationAndSend();

    setInterval(() => {
      this.getLocationAndSend();
      
    }, 10000);

    setInterval(() => {
      window.location.reload();
    }, 30000);
  }

  getLocationAndSend() {
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.latitude = latitude;
          this.longitude = longitude;
          this.locationError = undefined;
          
          // Send the coordinates to update the bus location
          this.sendLocationToBackend(latitude, longitude);
          
          // Send the coordinates to update the station status
          this.updateStationStatus(latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
          this.locationError = 'Error getting location: ' + error.message;
        }
      );
    } else {
      console.error('Geolocation is not available.');
      this.locationError = 'Geolocation is not available.';
    }
  }

  sendLocationToBackend(latitude: number, longitude: number) {
    const authUserJSON = localStorage.getItem('auth-user');
    const authUser = authUserJSON ? JSON.parse(authUserJSON) : null;

    // Extracting email and phone from the authUser object
    const username = authUser.username;

    const locationData = {
      latitude: latitude,
      longitude: longitude,
      username: username,

    }

    this.username = username;

    console.log(locationData);

    // Make a POST request to update the bus location
    this.http.post(`${BASE_URL}/update-location`, locationData)
      .subscribe(response => {
        console.log('Bus location sent and updated successfully');
      }, error => {
        console.error('Error sending bus location:', error);
      });
  }

  
  updateStationStatus(latitude: number, longitude: number) {
    const authUserJSON = localStorage.getItem('auth-user');
    const authUser = authUserJSON ? JSON.parse(authUserJSON) : null;

    // Extracting email and phone from the authUser object
    const username = authUser.username;

    // Make an HTTP GET request to get the route name
    this.http.get(`${BASE_URL}/getRouteNameForBus?busName=${username}`)
      .subscribe((response: any) => {
        const routeName = response.routeName;
        console.log("checking route name"+ routeName);
        const locationData = {
          latitude: this.latitude,
          longitude: this.longitude,
          username: username,
          routeName: routeName // Use the retrieved routeName
        };

        this.username = username;

         
        const authUserJSON = localStorage.getItem('auth-user');
        const authUser = authUserJSON ? JSON.parse(authUserJSON) : null;

        // Extracting email and phone from the authUser object
        const currentBusName = authUser.username;
        this.checkStationStatus(currentBusName, routeName);
        console.log(locationData);

        // Make a POST request to update the station status
        this.http.post(`${BASE_URL}/stationstatusupdate`, locationData)
          .subscribe(response => {
            console.log('Station status updated successfully:', response);
            // You can handle the response from the station status update if needed
          }, error => {
            console.error('Error updating station status:', error);
            // Handle the error if the station status update fails
          });
      }, error => {
        console.error('Error retrieving routeName:', error);
        // Handle the error if routeName retrieval fails
      });
  }


  checkStationStatus(currentBusName: string, routeName: string) {
    this.userService.getStationStatus(currentBusName, routeName).subscribe((data: any) => {
      // Assuming data is an array of station status objects ordered by stationNo
      if (data.length > 0) {
        const latestStationStatus = data[data.length - 1].stationPassed;
        console.log("only latest station"+latestStationStatus);
        // Check if the station status is "passed"
        if (latestStationStatus === "passed") {
          const latestStation = data[data.length - 1].stations;
          const routeName = data[data.length - 1].routeName; // Fetch routeName from the station status data
          const routeNameParts = routeName.split('-');
          const lastPartOfRoute = routeNameParts[routeNameParts.length - 1].trim();
          
          console.log(latestStation, lastPartOfRoute);
          if (lastPartOfRoute === latestStation) {
            console.log('Ready to switch route');
            // Your logic for switching the route
            // Store the current route as the previous route
            const previousRoute = routeName;
            
            // Switch the route and save it as newResetRoute
            const firstPartOfRoute = routeNameParts[0].trim();
            const remainingPartsOfRoute = routeNameParts
              .slice(1) // Remove the first part of the route name
              .reverse() // Reverse the remaining parts of the route
              .join('-'); // Join the reversed parts with a hyphen
  
            // Construct the newResetRoute
            const newResetRoute = `${lastPartOfRoute}-To-${firstPartOfRoute}`;
  
            console.log('Previous Route:', previousRoute);
            console.log('New Reset Route:', newResetRoute);

             // Make an API call to change the route
            this.changeRoute(currentBusName, newResetRoute, previousRoute);
            
            data = [];
          }
        } else {
          console.log('Station status is not "passed", no need to compare.');
          // Handle the case when the station status is not "passed"
        }
      }
    }, error => {
      console.error('Error fetching station status:', error);
    });
  }


  changeRoute(currentBusName: string, newRoute: string, previousRoute: string) {
    // Make an HTTP POST request to the API to change the route
    this.http.post(`${BASE_URL}/resetcurrentroute`, { busName: currentBusName, newRoute, previousRoute })
      .subscribe(response => {
        console.log('Route changed successfully:', response);
        // Handle the response from the API if needed
        this.sendPreviousRoute(currentBusName, previousRoute);
      }, error => {
        console.error('Error changing route:', error);
        // Handle the error if the route change fails
      });
  }


    sendPreviousRoute(currentBusName: string, previousRoute: string) {
      // Make an HTTP POST request to send the previous route
      this.http.post(`${BASE_URL}/sendprevioustroute`, { busName: currentBusName, previousRoute })
        .subscribe(response => {
          console.log('Previous route sent successfully:', response);
          // Handle the response from the API if needed
        }, error => {
          console.error('Error sending previous route:', error);
          // Handle the error if sending the previous route fails
        });
    }
}