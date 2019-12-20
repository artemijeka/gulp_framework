$(function () {

  /**
   * inputSelectors = '#age' - one 
   * inputSelectors = '#age, #phone' - or more
   */
  function typeOnlyNumber(inputsSelectors) {
    $(document).on('keypress', inputsSelectors, function (event) {
      let regex = new RegExp("^[1-9]+$");
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
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
      let regex = new RegExp("^[а-яА-ЯёЁ]+$");
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  }
  
});