import jQuery from 'jquery';

module.exports = (function($) {

  var loadingContainer;
  var backgroundContainer;
  var header;
  var lastBrick;

  var previousURL;

  function init() {
    loadingContainer = $('.LegoContainer');
    lastBrick = $('.top-front');
    backgroundContainer = $('.Container');
    header = $('.Header');

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
    });
  }

  function _hideOnBeginLoading() {
    // header.hide();
    // backgroundContainer.hide();
  }

  function _handleUrl() {
    if (document.referrer !== '') {
      loadingContainer.hide();
    }
  }

  return {
    init: init,
  }

})(jQuery);
