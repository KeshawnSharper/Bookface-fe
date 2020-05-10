import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { PostsComponent } from '../posts/posts.component'
import { NotiBarComponent } from '../noti-bar/noti-bar.component';
import { MessagesComponent } from '../messages/messages.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { 
  Router,
  ActivatedRoute,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { faThumbsUp,faCommentAlt,faImage } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-app-post-single',
  templateUrl: './app-post-single.component.html',
  styleUrls: ['./app-post-single.component.scss']
})
export class AppPostSingleComponent implements OnInit {
  post_info : any
  id: any
  posts: []
  newPost: FormGroup
  post_error : boolean
  faThumbsUp = faThumbsUp
  faCommentAlt = faCommentAlt 
  likes: any
  constructor(private http:HttpClient,private router:ActivatedRoute,private _router:Router) { }

  ngOnInit(){
    this.post_error = false
    this.id = parseInt(this.router.snapshot.paramMap.get('id'))
    this.newPost = new FormGroup({
      message: new FormControl('')
    })
    this.http.get(`https://bookface-be.herokuapp.com/comments/${this.id}`).subscribe((res:{}) => {
      this.posts = res
      // this.first_name = res.first_name
      console.log(this.posts)
      })
    
    this.http.get(`https://bookface-be.herokuapp.com/posts/${this.id}`).subscribe((res:{}) => {
      this.post_info = res[0]
      // this.first_name = res.first_name
      console.log(this.post_info)
      })
    
     

  }
  submit(){
    if (this.newPost.value.message.length === 0)
    {
      this.post_error = true
      console.log(this.newPost.value.message)
    }
    else{
      this.http.put(`https://bookface-be.herokuapp.com/likes`,{id:this.post_info.id,comments:this.post_info.comments + 1}).toPromise().then(res => {
    this.http.post(`https://bookface-be.herokuapp.com/comment/${this.post_info.id}`,{message:this.newPost.value.message,user_id:localStorage.getItem('id')}).toPromise().then(res => {
      location.reload();

    }
  )
      })
  
  }
}
  like(x){
    console.log(x)
    this.http.get(`https://bookface-be.herokuapp.com/likes/${x.id}`).subscribe((res:[]) => {
      
      res.map(a => this.likes.push(a.user_id)) 
      if (this.likes.includes(parseInt(localStorage.getItem('id'))))
    {
      this.likes = []
      console.log(this.likes)
    }
    else{
      this.http.put(`https://bookface-be.herokuapp.com/likes`,{id:x.id,likes:x.likes + 1}).toPromise().then(res => {
        this.http.post(`https://bookface-be.herokuapp.com/likes/`,{post_id:x.id,user_id:localStorage.getItem('id')}).toPromise().then(res => {
          location.reload();
      })
      })
    }
      console.log(this.likes)
    })
    
      
   
  }

}
