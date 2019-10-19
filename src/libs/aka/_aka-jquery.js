/**
 * dependencies: jQuery 
 */
$(function () {

  /**
   * inputSelectors = '#age' - one 
   * inputSelectors = '#age, #phone' - or more
   */
  function typeOnlyNumber(inputsSelectors) {
    $(document).on('keypress', inputsSelectors, function (event) {
      var regex = new RegExp("^[1-9]+$");
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  }
  /* 
  * inputSelectors = '#name' - one 
  * inputSelectors = '#name, #city' - or mores
  */
  function typeOnlyText(inputsSelectors) {
    $(document).on('keypress', inputsSelectors, function (event) {
      var regex = new RegExp("^[а-яА-ЯёЁ]+$");
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  }

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