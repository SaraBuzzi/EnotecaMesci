/* =========================================================
   1) CAMBIO LINGUA IT / EN
   Ogni testo traducibile ha data-en="..." nell'HTML.
   Il testo dentro il tag è l'italiano, data-en è l'inglese.
   ========================================================= */

// Salva il testo italiano di partenza
document.querySelectorAll('[data-en]').forEach(function (el) {
  el.dataset.it = el.innerHTML;
});

function cambiaLingua(lingua) {
  document.querySelectorAll('[data-en]').forEach(function (el) {
    el.innerHTML = (lingua === 'en') ? el.dataset.en : el.dataset.it;
  });
  document.documentElement.lang = lingua;

  var btnIt = document.getElementById('btn-it');
  var btnEn = document.getElementById('btn-en');
  if (btnIt) btnIt.classList.toggle('attiva', lingua === 'it');
  if (btnEn) btnEn.classList.toggle('attiva', lingua === 'en');

  // Ricorda la scelta anche sulle altre pagine
  try { localStorage.setItem('lingua', lingua); } catch (e) {}
}

// All'apertura della pagina, riapplica la lingua scelta prima
try {
  var salvata = localStorage.getItem('lingua');
  if (salvata === 'en') cambiaLingua('en');
} catch (e) {}


/* =========================================================
   2) PANNELLO LEGENDA (pulsante in basso a destra)
   ========================================================= */
function apriChiudiLegenda() {
  var pannello = document.getElementById('pannello-legenda');
  var bottone = document.getElementById('bottone-legenda');
  if (!pannello) return;
  var aperto = !pannello.hidden;
  pannello.hidden = aperto;
  bottone.setAttribute('aria-expanded', String(!aperto));
}

// Chiude il pannello cliccando fuori o premendo Esc
document.addEventListener('click', function (e) {
  var pannello = document.getElementById('pannello-legenda');
  var bottone = document.getElementById('bottone-legenda');
  if (!pannello || pannello.hidden) return;
  if (!pannello.contains(e.target) && !bottone.contains(e.target)) {
    pannello.hidden = true;
    bottone.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    var pannello = document.getElementById('pannello-legenda');
    if (pannello && !pannello.hidden) apriChiudiLegenda();
  }
});
