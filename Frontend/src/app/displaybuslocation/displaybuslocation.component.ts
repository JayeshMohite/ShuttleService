import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';

declare var google: any;

@Component({
  selector: 'app-displaybuslocation',
  templateUrl: './displaybuslocation.component.html',
  styleUrls: ['./displaybuslocation.component.css']
})
export class DisplaybuslocationComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  busLocations: any[] = [];
  private map: any;
  searchedBus: string = '';
  searchedBusLocation: any = null;
  markers: any[] = [];
  private currentZoomLevel: number = 10;
  private polyline: any;
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadGoogleMapsScript();

    // Update the bus location every 30 seconds
    setInterval(() => {
      if (this.searchedBus) {
        this.searchBusLocation(); // Update only the searched bus location
      } else {
        const previousZoom = this.currentZoomLevel; // Store the current zoom level
        this.loadBusLocations(); // Update all bus locations
        this.map.setZoom(previousZoom); // Set the zoom level back
      }
    }, 10000); // 10 seconds in milliseconds
  }
  

  searchBusLocation() {
    this.userService.getBusLocation(this.searchedBus).subscribe(
      (location) => {
        this.searchedBusLocation = location;
        if (this.searchedBusLocation && this.map) {
          this.map.setCenter({
            lat: this.searchedBusLocation.latitude,
            lng: this.searchedBusLocation.longitude
          });
           
          // Clear existing markers
          this.clearMarkers();
          
          // Add a marker for the searched bus location
          this.addMarkerToMap(this.searchedBusLocation);

          // Fetch the route name using the bus name
        this.userService.getRouteByBusName(this.searchedBus).subscribe(
          (routeName) => {
            // Retrieve the route stations for the fetched route name
            this.userService.getRouteStations(routeName).subscribe(
              (stations) => {
                // Extract coordinates (latitude and longitude) from the stations data
                const routeCoordinates = stations.map((station) => ({
                  lat: station.latitude,
                  lng: station.longitude
                }));

                // Draw the bus route on the map
                this.drawBusRoute(routeCoordinates);
              },
              (error) => {
                console.error('Error fetching bus route:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching route by bus name:', error);
          }
        );
      } else if (!this.map) {
        console.error('Map is not initialized yet.');
      } else {
        console.error('Bus not found');
      }
    },
    (error) => {
      console.error('Error fetching bus location:', error);
    }
  );
}
  loadGoogleMapsScript(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=8`; // Replace with your actual API key
    script.onload = () => this.initMapAndLoadBusLocations();
    document.body.appendChild(script);
    
  }

  initMapAndLoadBusLocations(): void {
    this.initMap();
    this.loadBusLocations();
  }

  initMap(): void {
    this.map = new (<any>window).google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 19.076090, lng: 72.877426 }, // Set your initial center
      zoom: this.currentZoomLevel // Set your initial zoom level
    });

      // Listen for zoom changes and update the currentZoomLevel
    this.map.addListener('zoom_changed', () => {
      this.currentZoomLevel = this.map.getZoom();
    });
  }

  loadBusLocations(): void {
    this.userService.getBusLocations().subscribe(
      (data) => {
        this.busLocations = data;
        this.clearMarkers();
        this.addMarkersToMap();
      },
      (error) => {
        console.error('Error fetching bus locations:', error);
      }
    );
  }

  clearMarkers(): void {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }

  addMarkerToMap(location: any): void {
    const marker = new (<any>window).google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map: this.map,
      icon: 'assets/bus.png',
      title: location.username,
      
    });
     // Create an InfoWindow for the marker
  const infoWindow = new (<any>window).google.maps.InfoWindow({
    content: `
      <div>
        <h4>${location.username}</h4>
      </div>
    `,
  });

    // Apply a CSS class for the move animation
    marker.set('class', 'marker move-animation');

    // Add a click event listener to open the InfoWindow when the marker is clicked
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });

    // Add a mouseover event listener to open the InfoWindow when hovering over the marker
    marker.addListener('mouseover', () => {
      infoWindow.open(this.map, marker);
    });

    // Add a mouseout event listener to close the InfoWindow when not hovering over the marker
    marker.addListener('mouseout', () => {
      infoWindow.close();
    });

    this.markers.push(marker);
  }

  addMarkersToMap(): void {
    for (const location of this.busLocations) {
      this.addMarkerToMap(location);
    }
  }


  drawBusRoute(routeCoordinates: any[]): void {
    if (routeCoordinates.length < 2) {
      console.error('Not enough coordinates to draw a route.');
      return;
    }

    const waypoints = routeCoordinates.slice(1, -1).map((coord) => ({
      location: new (<any>window).google.maps.LatLng(coord.lat, coord.lng),
      stopover: true,
    }));

    const request = {
      origin: new (<any>window).google.maps.LatLng(routeCoordinates[0].lat, routeCoordinates[0].lng),
      destination: new (<any>window).google.maps.LatLng(
        routeCoordinates[routeCoordinates.length - 1].lat,
        routeCoordinates[routeCoordinates.length - 1].lng
      ),
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING, // You can change this to your desired travel mode
    };

    const directionsService = new google.maps.DirectionsService();

    // Use the DirectionsService to calculate the route
    directionsService.route(request, (response: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        if (this.polyline) {
          this.polyline.setMap(null);
        }
        this.polyline = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        this.polyline.setMap(this.map);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  }
}