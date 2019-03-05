'use strict';

class Question {
  constructor(category, question, answer, score) {
    this.category = category;
    this.question = question;
    this.answer = answer;
    this.score = score;
    this.isDoubleJeopardy = false;
  }
}
