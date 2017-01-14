import jQuery from 'jquery';

module.exports = (function($) {

  coverText;
  coverEffect;

  function init() {

    coverText = $('.Cover__text');
    coverEffect = coverText.find('.Cover__effect');

    _attachEvents();
  }

  function _attachEvents() {
  }

  return {
    init: init,
  }

})(jQuery);
