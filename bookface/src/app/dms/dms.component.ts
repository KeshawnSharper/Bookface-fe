import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormBuilder,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-dms',
  templateUrl: './dms.component.html',
  styleUrls: ['./dms.component.scss']
})
export class DmsComponent implements OnInit {
  messages:any
  my_id:any
  id:any
  info:any
  newMessage:FormGroup;
  lastMessage:any
  post_error:boolean
  constructor(private http:HttpClient,private router:ActivatedRoute,private _router:Router) { }

  ngOnInit(){
    this.post_error = false
    this.id = parseInt(this.router.snapshot.paramMap.get('id'))
    this.my_id = parseInt(localStorage.getItem('id'))
    
    

 
  this.http.get(`https://bookface-be.herokuapp.com/info/${this.id}`).subscribe((res:{}) => {
    this.info = res[0]
    // this.first_name = res.first_name
    console.log(this.info)
    })
    this.http.get(`https://bookface-be.herokuapp.com/${this.id}/messages/${this.my_id}`).subscribe((res:[]) => {
      this.messages = res
      this.lastMessage = res[res.length - 1]
      console.log(this.messages)
      console.log(this.lastMessage)
      if (this.lastMessage.receiver_id === this.my_id && this.lastMessage.read === false ){
        this.http.put(`https://bookface-be.herokuapp.com/messages/${this.lastMessage.id}`,{ id:this.lastMessage.id,read:true}
        ).toPromise().then(data => {
          console.log(data)}) 
      }
    })

    this.newMessage = new FormGroup({
      message: new FormControl(''),
      sender_id:new FormControl(''),
      receiver_id:new FormControl('')
    }) 


}
send(){
  
  if (this.newMessage.value.message.length < 3){
    this.post_error = true
    
  }else{
    console.log(this.newMessage.value.message)
    console.log(this.my_id)
  this.http.post(`https://bookface-be.herokuapp.com/message`,{message:this.newMessage.value.message,sender_id:this.my_id,receiver_id:this.id}).toPromise().then(res => {

    console.log(res)
    location.reload();
   
  })}
}
  }


