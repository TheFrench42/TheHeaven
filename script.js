const languageSelector = document.getElementById('language');
const langBlocks = document.querySelectorAll('.lang-block');

// Mappa le fasce orarie ai nomi dei fogli
const timeToSheets = [
  { // Colazione (7:00–10:29)
    test: now => {
      const h = now.getHours(), m = now.getMinutes();
      return h >= 7 && (h < 10 || (h === 10 && m <= 29));
    },
    sheets: ['Colazioni', 'Room Service']
  },
  { // Notturno (23:00–6:59)
    test: now => {
      const h = now.getHours();
      return h >= 23 || h < 7;
    },
    sheets: ['Notturno']
  },
  { // Diurno (10:30–22:59)
    test: () => true,  // altrimenti
    sheets: ['Room Service']
  }
];

// Mostra/nasconde i blocchi di lingua
function showLanguage(lang) {
  langBlocks.forEach(block => {
    block.classList.toggle('hidden', block.id !== lang);
  });
}

// Crea i pulsanti per un array di voci
function buildButtons(entries, container, lang) {
  // entries es.: [{ label_it, label_en, url_it, url_en }]
  entries.forEach(item => {
    const a = document.createElement('a');
    a.classList.add('menu-button');
    // classe di sfondo basata sul foglio (assumiamo `item.sheet` presente)
    a.classList.add(`button-${item.sheet.toLowerCase().replace(' ', '-')}`);
    // testo e link secondo lingua
    if (lang === 'it') {
      a.textContent = item.label_it;
      a.href = item.url_it;
    } else {
      a.textContent = item.label_en;
      a.href = item.url_en;
    }
    container.appendChild(a);
  });
}

// Carica il JSON e popola i menu
async function getCurrentMenu() {
  const now = new Date();
  // Trova la fascia oraria corrente
  const slot = timeToSheets.find(s => s.test(now));
  const sheets = slot.sheets;

  // Fetch del JSON (con tutte le sheets)
  let data;
  try {
    const res = await fetch('data.json');
    data = await res.json();
  } catch (err) {
    console.error('Errore nel caricare data.json:', err);
    return;
  }

  // Svuota i contenitori
  const menuIt = document.getElementById('menu-it');
  const menuEn = document.getElementById('menu-en');
  menuIt.innerHTML = '';
  menuEn.innerHTML = '';

  // Per ogni sheet attivo, aggiungi i suoi item
  sheets.forEach(sheetName => {
    const entries = data[sheetName] || [];
    // Aggiungiamo la proprietà sheet per la classe di sfondo
    entries.forEach(e => e.sheet = sheetName);
    buildButtons(entries, menuIt, 'it');
    buildButtons(entries, menuEn, 'en');
  });
}

// Inizializzazione
showLanguage('it');
languageSelector.addEventListener('change', e => showLanguage(e.target.value));
getCurrentMenu();

