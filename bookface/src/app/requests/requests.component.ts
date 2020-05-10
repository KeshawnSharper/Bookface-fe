import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  directives: [ NavbarComponent ]
})
export class RequestsComponent implements OnInit {
  friends:any
  names:any
  results:any
  requests:any
  requested:any
  my_id:any
  info:any
  photos:any
  my_friends:any
  close:any
  edit:FormGroup
  
  constructor(private http:HttpClient,private _router:Router,private router:ActivatedRoute) { }

  ngOnInit() {
    this.close = true
    this.my_id = parseInt(localStorage.getItem('id'))
    let id = this.router.snapshot.paramMap.get('id')
    this.http.get(`https://bookface-be.herokuapp.com/info/${id}`).subscribe((res:{}) => {
      this.info = res[0]
      // this.first_name = res.first_name
      console.log(this.info)
      })
      this.http.get(`https://bookface-be.herokuapp.com/photos/${id}`).subscribe((res:{}) => {
        this.photos = res
        // this.first_name = res.first_name
        console.log(this.photos)
        })
        this.http.get(`https://bookface-be.herokuapp.com/${id}/friends`).subscribe((res:{}) => {
      this.friends = res
      // this.first_name = res.first_name
      console.log(this.friends)
      })
      this.http.get(`https://bookface-be.herokuapp.com/${localStorage.getItem('id')}/friends`).subscribe((res:[]) => {

    console.log(res)
    this.my_friends = res
    console.log(this.my_friends)
    this.names = []
    this.my_friends.map(a => this.names.push(a.first_name))
    console.log(this.names)
      }) 
      this.http.get(`https://bookface-be.herokuapp.com/requests/${id}`).subscribe((res:{}) => {
        this.requests = res
        this.requested = []
        this.requests.map(a => this.requested.push(a.request_id))
        console.log(this.my_id)
        console.log(this.requested)
        console.log(this.requested.includes(this.my_id))
        console.log(this.requests)
        })   
        this.edit = new FormGroup({
          bio: new FormControl('',Validators.required),
          occupation: new FormControl('',Validators.required),
          birth_place: new FormControl('',Validators.required),
          current_location: new FormControl('',Validators.required),
          picture: new FormControl('',Validators.required)
        })   

  }
  friendsLink(){
    this._router.navigate([`/profile/${this.info.id}/friends`])  
  }
  homeLink(){
    this._router.navigate([`/profile/${this.info.id}`])  
  }
  requestLink(){
    this._router.navigate([`/profile/${this.info.id}/requests`])  
  }
  photosLink(){
    this._router.navigate([`/profile/${this.info.id}/photos`])
  }
  friendsRoute(id){
    this._router.navigate([`/profile/${id}`])}
    del_friend(id){
      
      this.http.post('https://bookface-be.herokuapp.com/del_requests',{
        request_id:id,
      user_id:this.info.id
    }
      ).toPromise().then(data => {
        location.reload();
      })
    }
    add_friend(id){

      this.http.post('https://bookface-be.herokuapp.com/friends/',{
        friend_id:id,
      user_id:this.info.id
    }
      ).toPromise().then(data => {
        this.del_friend(id)
    })
   
  }
  submit(){
   
    // this.edit.value.id = localStorage.getItem('id')
    console.log(this.edit.value)
    this.http.put(`https://bookface-be.herokuapp.com/info/${this.my_id}`,this.edit.value
    ).toPromise().then(data => {
      console.log(data)})
  }

  closeWindow(){
    this.close = true
  }
  openWindow(){
    this.close = false
  }
    
}
