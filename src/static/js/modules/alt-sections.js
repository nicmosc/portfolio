import jQuery from 'jquery';

module.exports = (function($) {

  var altSection;
  var sectionTitle;
  var sectionContent;
  var logoBack;

  function init() {

    altSection = $('.AltSection');
    sectionTitle = altSection.find('.AltSection__title');
    sectionContent = altSection.find('.AltSection__content');
    logoBack = altSection.find('.Header');

    _reveal();
    _attachEvents();
  }

  function _attachEvents() {

  }

  function _reveal() {
    sectionTitle.fadeIn(500);
    sectionContent.fadeIn(500);
    logoBack.fadeIn(500);
  }

  return {
    init: init,
  }

})(jQuery);
