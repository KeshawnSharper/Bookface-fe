import { Component, OnInit, Input  } from '@angular/core';
import { faThumbsUp,faCommentAlt,faImage } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-com',
  templateUrl: './posts-com.component.html',
  styleUrls: ['./posts-com.component.scss']
})
export class PostsComComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faCommentAlt = faCommentAlt
  faImage = faImage
  likes:any
  @Input() posts:[]; 
  
  
    
  constructor(private http:HttpClient,private router:Router) { 
    
  }
  ngOnInit() {

    this.posts = []
  
    this.http.get(`https://bookface-be.herokuapp.com/posts/`).subscribe((res:[]) => {
      this.posts = res.reverse()
      console.log(this.posts)
    }
      ) 
    console.log(this.likes)
    console.log(this.posts)
    this.likes = []
    }
  loadPosts() {
   console.log(this.posts)
   
    }
    link(id){
      console.log(id)
      this.router.navigate([`profile/${id}`])
    }
    comment(id){
      console.log(id)
      this.router.navigate([`posts/${id}`])
    }
    like(x){
      
      this.http.get(`https://bookface-be.herokuapp.com/likes/${x.id}`).subscribe((res:[]) => {
        
        res.map(a => this.likes.push(a.user_id)) 
        if (this.likes.includes(parseInt(localStorage.getItem('id'))))
      {
        this.likes = []
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
