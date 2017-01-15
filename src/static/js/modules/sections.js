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
  }

  return {
    init: init,
  }

})(jQuery);
