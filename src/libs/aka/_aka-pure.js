function AKA() {
  return {
    maxWidth(maxPx) {
      if ( (window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth) <= maxPx) {
      return true;
      } else {
      return false;
      }
    }
  };
}