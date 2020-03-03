$.fn.isInViewport = function(listenTopOrBottomOfElement) {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  if (listenTopOrBottomOfElement === 'all') {
      return elementBottom > viewportTop && elementTop < viewportBottom;
  } else if (listenTopOrBottomOfElement === 'top') {
      return elementTop < viewportBottom;
  } else if (listenTopOrBottomOfElement === 'bottom') {
      return elementBottom > viewportTop
  } else {
      return 'Некорректный аргумент';
  }
}