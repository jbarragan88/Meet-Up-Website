import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'create_event',component: CreateComponent },
  { path: 'create_event',component: CreateComponent },
  { path: 'event/:id',component: EventdetailsComponent },
  { path: 'login',component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
