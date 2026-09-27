const ageGate = document.querySelector('#ageGate');
const ageConfirm = document.querySelector('#ageConfirm');
const enterSite = document.querySelector('#enterSite');
const siteShell = document.querySelector('#siteShell');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

const hasAcknowledged = sessionStorage.getItem('sbh-access-acknowledged') === 'true';

function unlockSite() {
  ageGate.classList.add('hidden');
  siteShell.removeAttribute('inert');
  sessionStorage.setItem('sbh-access-acknowledged', 'true');
}

if (hasAcknowledged) {
  unlockSite();
}

ageConfirm?.addEventListener('change', () => {
  enterSite.disabled = !ageConfirm.checked;
});

enterSite?.addEventListener('click', () => {
  if (!ageConfirm.checked) return;
  unlockSite();
  document.querySelector('.brand')?.focus({ preventScroll: true });
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(error => {
      console.warn('SBH service worker registration failed:', error);
    });
  });
}

const installButton = document.querySelector('#installApp');
const installSheet = document.querySelector('#installSheet');
const closeInstall = document.querySelector('#closeInstall');
const closeInstallBackdrop = document.querySelector('#closeInstallBackdrop');
const iosInstall = document.querySelector('#iosInstall');
const genericInstall = document.querySelector('#genericInstall');

let deferredInstallPrompt = null;

const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const ua = navigator.userAgent || '';
const isiOS = /iphone|ipad|ipod/i.test(ua);
const isAndroid = /android/i.test(ua);

function showInstallButton() {
  if (!isStandalone && installButton) installButton.hidden = false;
}

function openInstallSheet(mode = 'generic') {
  if (!installSheet) return;
  installSheet.hidden = false;
  if (iosInstall) iosInstall.hidden = mode !== 'ios';
  if (genericInstall) genericInstall.hidden = mode === 'ios';
  document.body.style.overflow = 'hidden';
}

function closeInstallSheet() {
  if (!installSheet) return;
  installSheet.hidden = true;
  document.body.style.overflow = '';
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  showInstallButton();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  if (installButton) installButton.hidden = true;
  closeInstallSheet();
});

installButton?.addEventListener('click', async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const result = await deferredInstallPrompt.userChoice;
    if (result.outcome === 'accepted') {
      deferredInstallPrompt = null;
      installButton.hidden = true;
    }
    return;
  }

  if (isiOS) {
    openInstallSheet('ios');
    return;
  }

  openInstallSheet('generic');
});

closeInstall?.addEventListener('click', closeInstallSheet);
closeInstallBackdrop?.addEventListener('click', closeInstallSheet);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && installSheet && !installSheet.hidden) {
    closeInstallSheet();
  }
});

if (!isStandalone && (isiOS || isAndroid)) {
  showInstallButton();
}
