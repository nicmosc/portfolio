import jQuery from 'jquery';

module.exports = (function($) {

  var coverText;
  var coverEffect;

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
