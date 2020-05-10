import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup,Validators} from '@angular/forms';
import { DmsComponent } from '../dms/dms.component';
import { PostsComponent } from '../posts/posts.component'
import { NotiBarComponent } from '../noti-bar/noti-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.scss'],
  directives: [NavbarComponent]
})
export class MessagesBoxComponent implements OnInit {
  
  constructor (private http:HttpClient) {

   }

  ngOnInit() {

  }
  
  }


