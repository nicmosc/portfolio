import jQuery from 'jquery';

module.exports = (function($) {

  var coverText;
  var coverEffect;

  function init() {

    coverText = $('.Cover__mainText');
    coverEffect = coverText.find('.Cover__effect');

    _attachEvents();
  }

  function _attachEvents() {
    _handleUrl();
    coverEffect.on('unveilClassChange', _handleBeginTextAnimation);
  }

  function _handleUrl() {
    if (document.referrer !== '') {
      _handleBeginTextAnimation();
    }
  }

  function _handleBeginTextAnimation() {
    coverEffect.addClass('Cover__effect--unveil');
    console.log('next step');
  }

  return {
    init: init,
  }

})(jQuery);
