module.exports = (function($) {

  var slickGallery;

  function init() {

    slickGallery = $('.SlickGallery');

    // slickGallery.slick({
    //   dots: true,
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 1,
    //   centerMode: true,
    //   variableWidth: true
    // });
  }

  function _attachEvents() {

  }

  return {
    init: init,
  }

})(jQuery);
