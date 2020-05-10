import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  friends: []
  constructor(private http:HttpClient) { 
    
  }

  ngOnInit(){
    this.http.get(`https://bookface-be.herokuapp.com/${localStorage.getItem('id')}/friends`).subscribe((res:[]) => {
      
    this.friends = res
    console.log(this.friends)
  }) }

}
