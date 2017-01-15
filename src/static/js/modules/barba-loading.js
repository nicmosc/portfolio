import jQuery from 'jquery';
import Barba from 'barba.js';

module.exports = (function($) {

  var button;

  function init() {

    button = $('.test');

    // Barba.Pjax.start();

    _attachEvents();
  }

  function _attachEvents() {

    button.click(_handleClick);
  }

  function _handleClick() {
    console.log(Barba.HistoryManager.history);
  }

  return {
    init: init,
  }

})(jQuery);
