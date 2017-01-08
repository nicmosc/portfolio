import "styles/main";
var $ = require("jquery");

import LoadingLegos from './modules/loading-legos';

// var LoadingLegos = require("./loading-legos");

$(document).ready(function() {
  LoadingLegos.init();
});
