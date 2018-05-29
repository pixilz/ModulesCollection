SystemJS.config({
  baseURL: '/scripts'
});


window.require = SystemJS.amdRequire;
window.define = SystemJS.amdDefine;

// SystemJS.import('pixilz').then(function(onFulfilled){window.pixilz = onFulfilled;});
require(['pixilz'], function(pixilz){window.pixilz = pixilz});
