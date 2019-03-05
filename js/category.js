'use strict';

class Category {
  constructor(category) {
    this.category = category;
    this.questions = [];
    this.headerElement = $('<div>')
      .addClass('category')
      .text(this.category);
  }

  render(container) {
    // Header.
    this.headerElement.appendTo(container);

    // Questions
    for (let question of this.questions) {
      question.render(container);
    }

    const self = this;
    container.on('questionSeen', function() {
      self._maybeHide();
    });
  }

  _maybeHide() {
    let shouldHide = true;
    for (let question of this.questions) {
      if (!question.seen) {
        shouldHide = false;
        break;
      }
    }
    if (!shouldHide) return;
    this.headerElement.addClass('hidden');
  }
}
