function maxWidth(maxPx) {
  if ((window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth) <= maxPx) {
    return true;
  } else {
    return false;
  }
}

function minWidth(minPx) {
  if ((window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth) >= minPx) {
    return true;
  } else {
    return false;
  }
}


/****************************************************************************************************
*********************************** Dependencies: jQuery ********************************************
*****************************************************************************************************/
$(function () {

  /*
  * Раздельные галереи на одной странице.  
  */
  $('.gallery').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });

});/* $(function(){}) */