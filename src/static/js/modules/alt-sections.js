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
    logoBack = altSection.find('.Header__altLogoContainer');

    _reveal();
    _attachEvents();
  }

  function _attachEvents() {

  }

  function _reveal() {
    sectionTitle.fadeIn(500);
    sectionContent.fadeIn(500);
    setTimeout(() => logoBack.removeClass('Header__altLogoContainer--hidden'), 1000);
  }

  return {
    init: init,
  }

})(jQuery);
