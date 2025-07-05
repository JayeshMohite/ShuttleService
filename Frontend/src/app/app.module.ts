import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BusPageComponent } from './bus-page/bus-page.component';
import { NewbusComponent } from './newbus/newbus.component';
import { BuslistComponent } from './buslist/buslist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { StationlistComponent } from './stationlist/stationlist.component';
import { AddstationComponent } from './addstation/addstation.component';
import { RoutelistComponent } from './routelist/routelist.component';
import { AddrouteComponent } from './addroute/addroute.component';
import { TranscationlistComponent } from './transcationlist/transcationlist.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LoginhomeComponent } from './loginhome/loginhome.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RefundlistdownloadComponent } from './refundlistdownload/refundlistdownload.component';
import { DatePipe } from '@angular/common';
import { HelpchatComponent } from './helpchat/helpchat.component';
import { TrackhelpticketComponent } from './trackhelpticket/trackhelpticket.component';
import { AdminhelpchatComponent } from './adminhelpchat/adminhelpchat.component';
import { LocationtrackerComponent } from './locationtracker/locationtracker.component';
import { DisplaybuslocationComponent } from './displaybuslocation/displaybuslocation.component';
import { WalletComponent } from './wallet/wallet.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    BusPageComponent,
    NewbusComponent,
    BuslistComponent,
    UserlistComponent,
    AdduserComponent,
    StationlistComponent,
    AddstationComponent,
    RoutelistComponent,
    AddrouteComponent,
    TranscationlistComponent,
    ChangepasswordComponent,
    LoginhomeComponent,
    BookingsComponent,
    PaymentgatewayComponent,
    TicketsComponent,
    SidebarComponent,
    RefundlistdownloadComponent,
    HelpchatComponent,
    TrackhelpticketComponent,
    AdminhelpchatComponent,
    LocationtrackerComponent,
    DisplaybuslocationComponent,
    WalletComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [httpInterceptorProviders,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }