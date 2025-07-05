import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BusPageComponent } from './bus-page/bus-page.component';
import { NewbusComponent } from './newbus/newbus.component';
import { BuslistComponent } from './buslist/buslist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddrouteComponent } from './addroute/addroute.component';
import { AddstationComponent } from './addstation/addstation.component';
import { RoutelistComponent } from './routelist/routelist.component';
import { StationlistComponent } from './stationlist/stationlist.component';
import { TranscationlistComponent } from './transcationlist/transcationlist.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LoginhomeComponent } from './loginhome/loginhome.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RefundlistdownloadComponent } from './refundlistdownload/refundlistdownload.component';
import { HelpchatComponent } from './helpchat/helpchat.component';
import { TrackhelpticketComponent } from './trackhelpticket/trackhelpticket.component';
import { AdminhelpchatComponent } from './adminhelpchat/adminhelpchat.component';
import { LocationtrackerComponent } from './locationtracker/locationtracker.component';
import { DisplaybuslocationComponent } from './displaybuslocation/displaybuslocation.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'BusPage', component: BusPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'NewBus', component: NewbusComponent},
  { path: 'Buslist', component: BuslistComponent},
  { path: 'userlist', component: UserlistComponent},
  { path: 'adduser', component: AdduserComponent},
  { path: 'addroute', component: AddrouteComponent},
  { path: 'addstation', component: AddstationComponent},
  { path: 'routelist', component: RoutelistComponent},
  { path: 'stationlist', component: StationlistComponent},
  { path: 'transactionlist', component: TranscationlistComponent},
  { path: 'changepassword', component: ChangepasswordComponent},
  { path: 'loginhome', component: LoginhomeComponent},
  { path: 'bookings', component: BookingsComponent},
  { path: 'paymentgateway', component: PaymentgatewayComponent},
  { path: 'tickets', component: TicketsComponent},
  { path: 'sidebar', component: SidebarComponent},
  { path: 'refundlistdownload', component: RefundlistdownloadComponent},
  { path: 'helpchat', component: HelpchatComponent},
  { path: 'trackhelpticket', component: TrackhelpticketComponent},
  { path: 'adminhelpchat', component: AdminhelpchatComponent},
  { path: 'locationtracker', component:LocationtrackerComponent},
  { path: 'displaybuslocation', component:DisplaybuslocationComponent},
  { path: 'wallet', component:WalletComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }