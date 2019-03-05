'use strict';

class Category {
  constructor(category) {
    this.category = category;
    this.questions = [];
  }

  render(container) {
    // Header.
    $('<div>').addClass('category').text(this.category).appendTo(container);

    // Questions
    for (let question of this.questions) {
      question.render(container);
    }
  }
}
