import { Component, OnInit } from '@angular/core';
import { AppPostSingleComponent } from '../app-post-single/app-post-single.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  directives: [ AppPostSingleComponent]
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
