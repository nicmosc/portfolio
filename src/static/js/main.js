import "styles/main";
var $ = require("jquery");

import LoadingLegos from './modules/loading-legos';
import Header from './modules/header';

$(document).ready(function() {
  LoadingLegos.init();
  Header.init();
});
