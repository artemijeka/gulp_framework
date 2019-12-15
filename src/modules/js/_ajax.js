var xhr;

if (window.XMLHttpRequest) {
// Chrome, Mozilla, Opera, Safari
  xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { 
// Internet Explorer
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}