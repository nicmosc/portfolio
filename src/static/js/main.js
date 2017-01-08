import "styles/main";
var $ = require("jquery");

import LoadingLegos from './modules/loading-legos';
import Header from './modules/header';
import SquareSelectors from './modules/square-selectors';

$(document).ready(function() {
  LoadingLegos.init();
  Header.init();
  SquareSelectors.init();
});
