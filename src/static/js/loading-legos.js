var jQuery = require('jquery');

module.exports = (function($) {

  var loadingContainer;
  var lastBrick;

  function init() {
    loadingContainer = $('.LegoContainer');
    lastBrick = $('.top-front');


    console.log(loadingContainer, lastBrick);
    _attachEvents();
  }

  function _attachEvents() {
    _hideOnEndLoading();
  }

  function _hideOnEndLoading() {

    lastBrick.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
      console.log('animation finished');
      loadingContainer.fadeOut('slow');
    });
  }

  return {
    init: init,
  }

})(jQuery);

// module.exports = {
//   LoadingLegos: LoadingLegos
// }
