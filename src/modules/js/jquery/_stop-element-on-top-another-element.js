$(document).ready(function() {

  var $targetBlock = $('.mortgage-btn'),
      additionalOffsetTop = 150,
      $stopBlock = $('.footer-contacts');     
  
  $('body').scroll(function() {
      if ( $stopBlock.isInViewport('top') ) {
          $targetBlock.css({
              'top': $stopBlock.offset().top - additionalOffsetTop
          });
      }
  });
    
});