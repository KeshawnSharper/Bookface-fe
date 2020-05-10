import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  title = 'bookface';
  loginName = localStorage.getItem('email');
  login: FormGroup;
  signUp: FormGroup;
  signUpGender = localStorage.getItem('gender');
  days:any
  router:any
  years:any
  constructor(private http:HttpClient,private _router:Router)  
{
  
  this.days = [...Array(31).keys()]
  this.years=  Array.from({length:50},(v,k)=>k+1970)
}

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.signUp = new FormGroup({
      first_name: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      month: new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      day:new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      birthday:new FormControl('',Validators.required)
    })


}

loginSubmit() {
  
  this.loginName = this.login.value.username;
  this.http.post('https://bookface-be.herokuapp.com/login',this.login.value).toPromise().then(res => {
    
  console.log(res)
  localStorage.setItem('id',res.id)
  localStorage.setItem('token',res.token)
  localStorage.setItem('name',res.name)
  localStorage.setItem('picture',res.picture)
  this._router.navigate(['/home'])
}
  )

}
signupSubmit() {
  if (this.signUp.value.day  <= 9) {
    this.signUp.value.day = "0" + this.signUp.value.day
  }
  this.signUp.value.birthday = this.signUp.value.month + '/' + this.signUp.value.day +  '/' +  this.signUp.value.year
  localStorage.setItem('gender',this.signUp.value.gender);  
  this.signUpGender = this.signUp.value.gender;
  console.log(this.signUp.value)
  
  this.http.post('https://bookface-be.herokuapp.com/register',{
    first_name:this.signUp.value.first_name,
    last_name:this.signUp.value.last_name,
    email:this.signUp.value.email,
    password:this.signUp.value.password,
    gender:this.signUp.value.gender,
    birthday:this.signUp.value.birthday
}
  ).toPromise().then(data => {
    this._router.navigate(['/home'])
    console.log(data)})

    this.http.post('https://bookface-be.herokuapp.com/login',{ email:this.signUp.value.email,
    password:this.signUp.value.password,}).toPromise().then(res => {
    
  console.log(res)
  localStorage.setItem('id',res.id)
  localStorage.setItem('token',res.token)
  localStorage.setItem('name',res.name)
  localStorage.setItem('picture',res.picture)
  this.http.post(`https://bookface-be.herokuapp.com/message`,{message:'Welcome to Bookface',sender_id:1,receiver_id:localStorage.getItem('id')}).toPromise().then(res => {
  
      
    this.http.post('https://bookface-be.herokuapp.com/requests',{
      user_id : localStorage.getItem('id'),
      request_id : 1
  }
    ).toPromise().then(data => {
      this._router.navigate(['/home'])
   
  })
}
  )
 
})
}
}
// "email": "kshrsdfeder@studentmba.org",
// "password": "Keyboys1",
