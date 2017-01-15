import jQuery from 'jquery';

module.exports = (function($) {

  var coverText;
  var coverEffect;
  var coverMainText;

  function init() {

    coverMainText = $('.Cover__mainText');
    coverText = coverMainText.find('#text');
    coverEffect = coverMainText.find('.Cover__effect');

    _attachEvents();
  }

  function _attachEvents() {
    _handleUrl();
    coverEffect.on('unveilClassChange', _handleBeginTextAnimation);
  }

  function _handleUrl() {
    if (sessionStorage.visited == "true") {
      _handleBeginTextAnimation();
    }
  }

  function _handleBeginTextAnimation() {
    coverEffect.addClass('Cover__effect--unveil').delay( 3000 ).queue(() => coverEffect.addClass('Cover__effect--expand').dequeue());
    setTimeout(_setClassAndNextText, 4500);
  }

  function _setClassAndNextText() {
    coverMainText.addClass('Cover__mainText--hidden').delay(300).queue(() => coverText.html('im nick.').dequeue());

    setTimeout(_lastStep, 1500);
  }

  function _lastStep() {
    coverMainText.removeClass('Cover__mainText--hidden');
    setTimeout(() => coverEffect.removeClass('Cover__effect--expand'), 500);
  }

  return {
    init: init,
  }

})(jQuery);
