/* Registers the service worker and shows a small "update available" banner
   when a new version has been installed — so returning/installed users aren't
   stuck on a cached page after a deploy. Self-contained (inline styles). */
(function () {
  if (!('serviceWorker' in navigator)) return;

  function showUpdateBanner() {
    if (document.getElementById('sw-update')) return;
    var b = document.createElement('div');
    b.id = 'sw-update';
    b.setAttribute('style',
      'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:99999;' +
      'display:flex;align-items:center;gap:12px;padding:11px 12px 11px 16px;border-radius:999px;' +
      'background:#0f1c16;color:#eaf3ee;border:1px solid rgba(79,224,138,.5);' +
      'box-shadow:0 12px 34px rgba(0,0,0,.45);' +
      'font:600 13.5px/1 Manrope,-apple-system,BlinkMacSystemFont,system-ui,sans-serif;');
    b.innerHTML =
      '<span style="white-space:nowrap">✦ New version available</span>' +
      '<button type="button" style="padding:7px 14px;border-radius:999px;border:0;background:#4fe08a;' +
      'color:#06250f;font:700 13px/1 Manrope,-apple-system,system-ui,sans-serif;cursor:pointer">Reload</button>';
    b.querySelector('button').addEventListener('click', function () { location.reload(); });
    document.body.appendChild(b);
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('service-worker.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', function () {
          // A new worker finished installing AND a controller already exists → it's an update, not first install.
          if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdateBanner();
        });
      });
    }).catch(function () {});
  });
})();
