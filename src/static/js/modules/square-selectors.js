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
    squares.click(_handleClickLinks);
  }

  function _handleWindowResize() {
    _setHeight();
  }

  function _handleClickLinks(e) {
    e.preventDefault();
    var href = this.href;

    $(this).find('.SquareSelectors__squareText').fadeOut(300);
    $(this).css('z-index', '9999');
    $(this).css('transition', 'transform 0.8s 0.3s ease-out');
    $(this).css('transform', 'scale(10)');

    setTimeout(() => window.location = href, 1000);
  }

  return {
    init: init,
  }

})(jQuery);
