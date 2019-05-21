'use strict';

class Question {
  constructor(category, question, answer, score) {
    this.category = category;
    this.question = question;
    this.answer = answer;
    this.score = score;
    this.isDoubleJeopardy = false;
    this.seen = false;
  }

  render(container) {
    const self = this;
    const popup = $('<div>').addClass('popup');

    const extension = this.question.substr(this.question.length - 4);
    if (extension === '.png' || extension === '.jpg') {
      $('<img>')
        .attr('src', `data/${this.question}`)
        .width(500)
        .appendTo(popup);
    } else {
      $('<p>')
        .text(this.question)
        .appendTo(popup);
    }
    const answer = $('<p>')
      .addClass('hidden')
      .text(this.answer)
      .appendTo(popup);

    const element = $('<div>')
      .addClass('question')
      .text(this.score)
      .appendTo(container)
      .click(function() {
        popup.appendTo($('body'));
      });

    const popupButton = $('<button>')
      .text('Reveal answer')
      .appendTo(popup)
      .click(function() {
        if ($(this).text() === 'Close') {
          popup.remove();
          element.addClass('hidden');
          self.seen = true;
          container.trigger('questionSeen');
          return;
        }
        answer.removeClass('hidden');
        $(this).text('Close');
      });
  }
}
