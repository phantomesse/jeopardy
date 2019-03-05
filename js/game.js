'use strict';

class Game {
  constructor() {
    const self = this;
    Game._loadQuestions().then(function(questions) {
      const categories = Game._sortQuestionsIntoCategories(questions);
      const container = $('main')
      .css({'grid-template-rows' : `repeat(${categories.length}, 1fr)`});
      for (let category of categories) {
        category.render(container);
      }
    });
  }

  // Loads questions from a TSV file.
  static async _loadQuestions() {
    // Load TSV.
    const questionsTsv = await $.get('/data/questions.tsv');

    // Parse into Question objects.
    const rows = questionsTsv.split('\n');
    const headers = rows[0].split('\t');
    const questions = [];
    for (let i = 1; i < rows.length; i++) {
      const question = Game._parseQuestion(rows[i], headers);
      questions.push(question);
    }

    // Pick one question for double Jeopardy.
    const randomIndex = Math.floor(Math.random() * questions.length);
    questions[randomIndex].isDoubleJeopardy = true;

    return questions;
  }

  // Returns a question object.
  static _parseQuestion(tsvRow, headers) {
    const values = tsvRow.split('\t');
    let category, question, answer, score;
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      switch (headers[i]) {
        case 'Category':
          category = value;
          break;
        case 'Question':
          question = value;
          break;
        case 'Answer':
          answer = value;
          break;
        default:
          score = parseInt(value);
          break;
      }
    }
    return new Question(category, question, answer, score);
  }

  // Sort questions into categories.
  static _sortQuestionsIntoCategories(questions) {
    const nameToCategoryMap = {};
    
    for (let question of questions) {
      const category = question.category;
      if (!(category in nameToCategoryMap)) {
        nameToCategoryMap[category] = new Category(category);
      }
      question.category = category;
      nameToCategoryMap[category].questions.push(question);
    }

    return Object.values(nameToCategoryMap);
  }
}
