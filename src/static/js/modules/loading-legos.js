import jQuery from 'jquery';


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
    logoContainer = $('.Header__logoContainer#main');
    coverEffect = $('.Cover__effect');

    _attachEvents();
  }

  function _attachEvents() {
    _hideOnBeginLoading();
    _hideOnEndLoading();

    _handleUrl();
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

    if (document.referrer !== '') {
      sessionStorage.clear();
      sessionStorage.visited = true;
    }

    console.log(sessionStorage);

    if (sessionStorage.visited == "true") {
      setTimeout(() => logoContainer.removeClass('Header__logoContainer--hidden'), 1000);
      loadingContainer.hide();
    }
  }

  return {
    init: init,
  }

})(jQuery);
