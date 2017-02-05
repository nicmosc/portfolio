import "styles/main";

import LoadingLegos from './modules/loading-legos';
import Header from './modules/header';
import SquareSelectors from './modules/square-selectors';
import Cover from './modules/cover';
import AltSections from './modules/alt-sections';
import Sections from './modules/sections';
import SlickGallery from './modules/slick-gallery';

$(document).ready(function() {
  LoadingLegos.init();
  Header.init();
  SquareSelectors.init();
  Cover.init();
  AltSections.init();
  Sections.init();
  SlickGallery.init();
});
