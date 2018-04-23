import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { FollowComponent } from './follow/follow.component';
import { LoginComponent } from './login/login.component';
import { NeweventComponent } from './newevent/newevent.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'new',component: NeweventComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
