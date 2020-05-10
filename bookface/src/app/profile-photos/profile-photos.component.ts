import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { faThumbsUp,faCommentAlt,faImage } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.css'],
  directives: [ NavbarComponent ]
})
export class ProfilePhotosComponent implements OnInit {
  info:any
  photos:any
  faThumbsUp = faThumbsUp;
  friends:any
  names:any
  results:any
  requests:any
  requested:any
  my_id:any
  close:any
  edit:FormGroup

  constructor(private http:HttpClient,private router:ActivatedRoute,private _router:Router) { }

  ngOnInit(){
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
      this.http.get(`https://bookface-be.herokuapp.com/${localStorage.getItem('id')}/friends`).subscribe((res:[]) => {

    console.log(res)
    this.friends = res
    console.log(this.friends)
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
  friendsRoute(id){
    this._router.navigate([`/profile/${id}`])}
    like(id){
      this._router.navigate([`/profile/${id}`])}
      request(){
        this.http.post('https://bookface-be.herokuapp.com/requests',{
          user_id : this.info.id,
          request_id : localStorage.getItem('id')
      }
        ).toPromise().then(data => {
          console.log(data)})
          location.reload();
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
