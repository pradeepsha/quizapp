import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  question :any=[];
  constructor() { }

  ngOnInit(): void {
    // console.log(localStorage.getItem("finalAnswer"));
    this.question = localStorage.getItem("finalAnswer");
    this.question =JSON.parse(this.question)

  }

}
