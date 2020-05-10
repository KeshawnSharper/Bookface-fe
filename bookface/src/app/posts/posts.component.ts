import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { PostsComComponent } from '../posts-com/posts-com.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  directives: [ PostsComComponent]
})
export class PostsComponent implements OnInit {
  posts:any;
  newPost: FormGroup;
  post_error : boolean
  show: boolean
  ids:[]
  constructor(private http:HttpClient,private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(){
    this.http.get(`https://bookface-be.herokuapp.com/posts/`).subscribe((res:[]) => this.posts = res.reverse()) 
    console.log(this.posts)
    this.newPost = new FormGroup({
      message: new FormControl(''),
      picture: new FormControl(''),
      video: new FormControl(null)
    })
    this.post_error = false
  }

    
    post(){
      console.log(this.newPost.value)
      if (this.newPost.value.message.length < 10){
        this.post_error = true
        
      }else{
      this.http.post(`https://bookface-be.herokuapp.com/post/${localStorage.getItem('id')}`,this.newPost.value).toPromise().then(res => {
    
        console.log(res)
        location.reload();
       
      })}
    }
    showthis(){
      this.show = true
    }

}
