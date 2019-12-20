/**
 * Плавный скролл до элемента с id на текущей странице. 
 */
$(document).ready(function() {
  $(document).on('click', 'a', function(e){
      e.preventDefault();//не переходим по ссылке
      var headerHeight = $('header').height();//высота шапка сайта (на случай если шапка фиксированная)
      var idTargetSection = String( e.currentTarget.hash ); //получаем значение хеша из url
      location.hash = ''; //очищаем хеш или не очищаем
      var elementOffsetOfTop = document.querySelector(idTargetSection).offsetTop - headerHeight - 25;//25 еще запас на отступ
      $('html, body').animate({scrollTop: elementOffsetOfTop}, 1000); //скроллим
  });
});