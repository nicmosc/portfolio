import jQuery from 'jquery';

module.exports = (function($) {

  var header;
  var buttons;
  var logo;

  function init() {
    header = $('.Header');
    logo = $('.Header__logoContainer');
    buttons = $('.Header__menuContainer');

    _attachEvents();
  }

  function _attachEvents() {
    logo.click(_handleLogoClicked);
  }

  function _handleLogoClicked() {
    buttons.toggleClass('Header__menuContainer--hidden');
    logo.toggleClass('Header__logoContainer--active');
  }

  return {
    init: init,
  }

})(jQuery);
