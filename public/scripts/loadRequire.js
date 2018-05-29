requirejs.config({
  baseUrl: 'scripts'
});

requirejs(['pixilz'], function(pixilz) {
  window.pixilz = pixilz;
});
