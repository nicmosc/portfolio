import jQuery from 'jquery';

module.exports = (function($) {

  var header;
  var buttons;
  var logo;
  var menuContainer;

  function init() {
    header = $('.Header');
    logo = header.find('.Header__logoContainer');
    menuContainer = header.find('.Header__menuContainer');
    buttons = header.find('.Header__button');

    console.log(buttons);

    _attachEvents();
  }

  function _attachEvents() {
    logo.click(_handleClickLogo);
    buttons.click(_handleClickButton);
  }

  function _handleClickLogo() {
    menuContainer.toggleClass('Header__menuContainer--hidden');
    header.toggleClass('Header--hidden');
    logo.toggleClass('Header__logoContainer--active');
  }

  function _handleClickButton() {
    console.log(header.height());
    var targetId = $(this).data('scroll-to');
    var target = $('#'+targetId);
    $('html,body').animate({
      scrollTop: (target.offset().top - header.outerHeight())
    }, 1000);
    return false;
  }

  return {
    init: init,
  }

})(jQuery);
