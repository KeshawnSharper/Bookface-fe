import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { PostsComponent } from '../posts/posts.component'
import { NotiBarComponent } from '../noti-bar/noti-bar.component';
import { MessagesComponent } from '../messages/messages.component';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  selector: 'app-home',
  directives: [ SidebarComponent ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
}
