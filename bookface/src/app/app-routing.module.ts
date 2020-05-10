import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { MessagesBoxComponent } from './messages-box/messages-box.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { 
  AuthService
} from './auth/auth.service';
import { ProfileFriendComponent } from './profile-friend/profile-friend.component';
import { ProfilePhotosComponent } from './profile-photos/profile-photos.component';
import { RequestsComponent } from './requests/requests.component';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  {path:'' ,component:SignUpComponent },
  {
  path:'home' ,component:HomeComponent,
  canActivate: [AuthGuard]  }
  ,{path:'profile/:id' ,component:ProfileComponent,
  canActivate: [AuthGuard] },
  {path:'profile/:id/friends' ,component:ProfileFriendComponent,
  canActivate: [AuthGuard] },
  {path:'search/:name' ,component:SearchComponent},
  {path:'messages/:id' ,component:MessagesBoxComponent,
  canActivate: [AuthGuard] },
  {path:'profile/:id/photos' ,component:ProfilePhotosComponent,
  canActivate: [AuthGuard] },
  {path:'profile/:id/requests' ,component:RequestsComponent,
  canActivate: [AuthGuard] },
  {path:'posts/:id' ,component:PostComponent,
  canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
