import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { PostsComponent } from '../posts/posts.component'
import { NotiBarComponent } from '../noti-bar/noti-bar.component';
import { MessagesComponent } from '../messages/messages.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  directives: [ SidebarComponent ]
})
export class SearchComponent implements OnInit {
  posts:any
  results:any
  name:any
  names:any
  friends:any
  requests:any
  requested:any
  my_id:any

  constructor(private http:HttpClient,private router:ActivatedRoute) { }

  ngOnInit() {
    this.my_id = parseInt(localStorage.getItem('id'))
    this.name = this.router.snapshot.paramMap.get('name')
    var values = this.name.split(' ').filter(function(v){return v!==''});
    console.log(values)
    this.http.get(`https://bookface-be.herokuapp.com/users`).subscribe((res:[]) => {
      console.log(res)
      this.results = res
      this.results = this.results.filter(post => post.id != localStorage.getItem('id'))
      if (values.length === 2){
        this.results = this.results.filter(post => post.first_name === values[0] && post.last_name === values[1])
      }
      else{
      this.results = this.results.filter(post => post.first_name === this.name)
      } 
  }) 
  this.http.get(`https://bookface-be.herokuapp.com/${localStorage.getItem('id')}/friends`).subscribe((res:[]) => {

    console.log(res)
    this.friends = res
    console.log(this.friends)
    console.log(this.results)
    this.names = []
    this.friends.map(a => this.names.push(a.first_name))
    console.log(this.names)
})
this.http.get(`https://bookface-be.herokuapp.com/requests/${id}`).subscribe((res:{}) => {
  this.requests = res
  this.requested = []
  this.requests.map(a => this.requested.push(a.request_id))
  console.log(this.my_id)
  console.log(this.requested)
  console.log(this.requested.includes(this.my_id))
  })   


  }
  pon() {
    console.log(this.name)
  }
  request(id){
    this.http.post('https://bookface-be.herokuapp.com/requests',{
      user_id : id,
      request_id : localStorage.getItem('id')
  }
    ).toPromise().then(data => {
      console.log(data)})
      location.reload();
  }
}
