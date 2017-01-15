import "styles/main";
var $ = require("jquery");

import LoadingLegos from './modules/loading-legos';
import Header from './modules/header';
import SquareSelectors from './modules/square-selectors';
import Cover from './modules/cover';
import BarbaLoading from './modules/barba-loading';

$(document).ready(function() {
  LoadingLegos.init();
  Header.init();
  SquareSelectors.init();
  Cover.init();
  BarbaLoading.init();
});
