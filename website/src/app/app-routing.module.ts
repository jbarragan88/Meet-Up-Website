import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { FollowingComponent } from './following/following.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'create_event',component: CreateComponent },
  { path: 'event/:id',component: EventdetailsComponent },
  { path: 'follwing',component: FollowingComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
