import jQuery from 'jquery';
import Barba from 'barba.js';

module.exports = (function($) {

  var loadingContainer;
  var backgroundContainer;
  var logoContainer;
  var lastBrick;
  var coverEffect;

  function init() {
    loadingContainer = $('.LegoContainer');
    lastBrick = $('.top-front');
    backgroundContainer = $('.Container');
    logoContainer = $('.Header__logoContainer');
    coverEffect = $('.Cover__effect');

    _attachEvents();
  }

  function _attachEvents() {
    _hideOnBeginLoading();
    _hideOnEndLoading();

    _handleUrl();
    // Barba.Dispatcher.on('linkClicked', _handleUrl);
  }

  function _hideOnEndLoading() {
    lastBrick.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
      console.log('animation finished');
      loadingContainer.fadeOut('slow');
      coverEffect.trigger('unveilClassChange');

      setTimeout(() => logoContainer.removeClass('Header__logoContainer--hidden'), 500);
    });
  }

  function _hideOnBeginLoading() {
    logoContainer.addClass('Header__logoContainer--hidden');
  }

  function _handleUrl() {
    // console.log(Barba.HistoryManager.history.filter((e) => e.namespace === 'index').length > 0);
    console.log(document.referrer);
    if (document.referrer !== '' /*|| Barba.HistoryManager.history.filter((e) => e.namespace === 'index').length > 0*/) {
      logoContainer.removeClass('Header__logoContainer--hidden');
      loadingContainer.hide();
    }
  }

  return {
    init: init,
  }

})(jQuery);
