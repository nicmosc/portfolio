import jQuery from 'jquery';

module.exports = (function($) {

  var squares;

  function init() {
    squares = $('.SquareSelectors__square');

    _setHeight();
    _attachEvents();
  }

  function _setHeight() {
    var width = squares.width();
    squares.height(width);
  }

  function _attachEvents() {
  }

  return {
    init: init,
  }

})(jQuery);
