import jQuery from 'jquery';

module.exports = (function($) {

  var squares;
  var $window;

  function init() {
    squares = $('.SquareSelectors__square');
    $window = $(window);

    _setHeight();
    _attachEvents();
  }

  function _setHeight() {
    var width = squares.width();
    squares.height(width);
  }

  function _attachEvents() {
    $window.resize(_handleWindowResize);
  }

  function _handleWindowResize() {
    _setHeight();
  }

  return {
    init: init,
  }

})(jQuery);
