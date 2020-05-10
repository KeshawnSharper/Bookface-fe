import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotiBarComponent } from './noti-bar/noti-bar.component';
import { MessagesComponent } from './messages/messages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PostsComComponent } from './posts-com/posts-com.component';
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
import { DmsComponent } from './dms/dms.component';
import { PostComponent } from './post/post.component';
import { AppPostSingleComponent } from './app-post-single/app-post-single.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    PostsComponent,
    NotiBarComponent,
    MessagesComponent,
    NavbarComponent,
    SignUpComponent,
    PostsComComponent,
    ProfileComponent,
    SearchComponent,
    MessagesBoxComponent,
    ProfileFriendComponent,
    ProfilePhotosComponent,
    RequestsComponent,
    DmsComponent,
    PostComponent,
    AppPostSingleComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
 
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}