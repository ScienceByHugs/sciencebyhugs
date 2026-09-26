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
