import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent implements OnInit {
  id : any 
  name: any 
  picture: any 
  close:any
  closeResult = '';
  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.close = true
    this.id = localStorage.getItem('id')
    this.picture = localStorage.getItem('picture')
    this.name = localStorage.getItem('name')
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
}
