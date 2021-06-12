import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {

  readonly rootUrl = 'http://localhost:2690';
  qns: any[]=[];
  seconds:any;
  timer :any ;
  qnProgress: any;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient) {

   }
   displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }
  insertParticipant(name: string, email: string) {
    var body = {
      Name: name,
      Email: email
    }
    return body;
  }

  getQuestions() {
    return this.http.get("./assets/mydata.json");
  }
}
