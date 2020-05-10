import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroup,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  my_id:any
  friend_requests:any
  requested
  close: boolean
  searchForm: FormGroup;
  requests: boolean
  newMessages: boolean
  more: boolean
  messages:any
  constructor(private _router:Router,private http:HttpClient) {

   }


  ngOnInit() {
    this.my_id = localStorage.getItem('id')
    this.close = true
    this.requests = false
    this.newMessages = false
    this.more = false
    this.searchForm = new FormGroup({
      name: new FormControl('',Validators.required)
    })
    this.http.get(`https://bookface-be.herokuapp.com/requests/${this.my_id}`).subscribe((res:{}) => {
      this.friend_requests = res
      this.requested = []
      this.friend_requests.map(a => this.requested.push(a.request_id))
      console.log(this.my_id)
      console.log(this.requested)
      console.log(this.requested.includes(this.my_id))
      console.log(this.friend_requests)
      })
      this.http.get(`https://bookface-be.herokuapp.com/newMessages/${this.my_id}`).subscribe((res:{}) => {
        this.messages = res  
        console.log(this.messages)
        })   
  }
  search() { 
    this._router.navigate([`/search/${this.searchForm.value.name}`])
  }
  home() { 
    this._router.navigate([`/home`])
  }
  requestsToggle() { 
    this.requests = !this.requests
    if (this.newMessages === true || this.more === true) { 
      this.newMessages = false
      this.more = false
    }
  }
  messagesToggle(){ 
    this.newMessages = !this.newMessages
    if (this.requests === true  || this.more === true) { 
      this.requests = false
      this.more = false
    }
  }
  moreToggle(){ 
    this.more = !this.more
    if (this.requests === true  || this.newMessages === true) { 
      this.requests = false
      this.newMessages = false
    }
  }
  closeWindow(){
    this.close = true
  }
  openWindow(){
    this.close = false
  }
  logOut(){
    this.close = false
    localStorage.removeItem("token")
    this._router.navigate([`/`])  
  }
  del_friend(id){
      
    this.http.post('https://bookface-be.herokuapp.com/del_requests',{
      request_id:id,
    user_id:this.my_id
  }
    ).toPromise().then(data => {
      location.reload();
    })
  }
  add_friend(id){

    this.http.post('https://bookface-be.herokuapp.com/friends/',{
      friend_id:id,
    user_id:this.my_id
  }
    ).toPromise().then(data => {
      this.del_friend(id)
  })
 
}
  
}
