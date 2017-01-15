import jQuery from 'jquery';

module.exports = (function($) {

  var header;
  var buttons;
  var logo;
  var menuContainer;
  var altLogo;
  var container;

  function init() {
    header = $('.Header');
    logo = header.find('.Header__logoContainer#main');
    altLogo = header.find('.Header__altLogoContainer');
    menuContainer = header.find('.Header__menuContainer');
    buttons = header.find('.Header__button');
    container = $('.Container');

    _attachEvents();
  }

  function _attachEvents() {
    altLogo.click(_handleClickAltLogo);
    logo.click(_handleClickLogo);
    buttons.click(_handleClickButton);
    container.click(_handleClickContainer);
  }

  function _handleClickLogo() {
    menuContainer.toggleClass('Header__menuContainer--hidden');
    header.toggleClass('Header--hidden');
    logo.toggleClass('Header__logoContainer--active');
  }

  function _handleClickButton() {
    var targetId = $(this).data('scroll-to');
    var target = $('#'+targetId);
    $('html,body').animate({
      scrollTop: (target.offset().top - header.outerHeight())
    }, 300);
    return false;
  }

  function _handleClickContainer(e) {
    menuContainer.addClass('Header__menuContainer--hidden');
    header.addClass('Header--hidden');
    logo.removeClass('Header__logoContainer--active');
  }

  function _handleClickAltLogo(e) {
    e.preventDefault();
    var href = this.href;



    setTimeout(() => window.location = href, 1000);
  }

  return {
    init: init,
  }

})(jQuery);
