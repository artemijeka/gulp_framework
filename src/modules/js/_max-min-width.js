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