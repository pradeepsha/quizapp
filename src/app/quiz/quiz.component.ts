import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
question :any={};
options :any=[];
answerArray :any=[];
selectedHero:any={};
name:any=[];

  constructor(private router: Router, public quizService: QuizService) { }

  ngOnInit() {
    
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          this.question = data.questions[0];
          console.log(this.question.id,">>>>>>>>>>")
          this.options = data.questions[0].option;
          this.startTimer();
        }
      );
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(qID:any, choice:any) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

  onSelect(name:any): void {
    this.selectedHero = name;
  }

  nextButton() {
  
  if(this.selectedHero.optionid == this.question.answerid){
    this.question.isAnswer = true;
    this.answerArray.push(this.question);
  }else{
    this.answerArray.push(this.question);
  }
  if (this.question.id == 10) {
    localStorage.setItem('finalAnswer', JSON.stringify(this.answerArray));
    clearInterval(this.quizService.timer);
    this.router.navigate(['/result']);
    return;
  }

    this.quizService.getQuestions().subscribe(
      (data: any) => {
        this.question = data.questions[this.question.id];
        this.options = this.question.option;
      }
    );

  }

  preButton() {
    this.answerArray.pop();
    this.quizService.getQuestions().subscribe(
      (data: any) => {
        this.question = data.questions[this.question.id-2];
        this.options = this.question.option;
      }
    );

  }

}
