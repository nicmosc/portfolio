import jQuery from 'jquery';

module.exports = (function($) {

  var sections;

  function init() {

    sections = $('.Section');
    sections.hide();

    _reveal();
    _attachEvents();
  }

  function _attachEvents() {
  }

  function _reveal() {
    sections.fadeIn(1000);
    setTimeout(history.pushState("", document.title, window.location.pathname), 50);
  }

  return {
    init: init,
  }

})(jQuery);
