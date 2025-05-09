const languageSelector = document.getElementById('language');
const langBlocks = document.querySelectorAll('.lang-block');

// Mostra/nasconde i blocchi di lingua
function showLanguage(lang) {
    langBlocks.forEach(block => {
        block.classList.toggle('hidden', block.id !== lang);
    });
}

// Al caricamento, default italiano
showLanguage('it');
languageSelector.addEventListener('change', e => showLanguage(e.target.value));

// Costruisce i pulsanti in base all'orario
function getCurrentMenu() {
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();

    const isBreakfast = h >= 7 && (h < 10 || (h === 10 && m <= 29));
    const isNight     = h >= 23 || h < 7;

    const menuIt = document.getElementById('menu-it');
    const menuEn = document.getElementById('menu-en');
    menuIt.innerHTML = menuEn.innerHTML = '';

    if (isBreakfast) {
        // Colazione + Room Service
        menuIt.innerHTML += `<a href="Colazioni_ITA.html" class="menu-button button-colazione">Colazione</a>`;
        menuIt.innerHTML += `<a href="Room_Service_ITA.html" class="menu-button button-room-service">Room Service</a>`;
        menuEn.innerHTML += `<a href="Colazioni_ENG.html" class="menu-button button-colazione">Breakfast</a>`;
        menuEn.innerHTML += `<a href="Room_Service_ENG.html" class="menu-button button-room-service">Room Service</a>`;
    } else if (isNight) {
        // Solo Room Service Notturno
        menuIt.innerHTML += `<a href="Notturno_ITA.html" class="menu-button button-notturno">Room Service Notturno</a>`;
        menuEn.innerHTML += `<a href="Notturno_ENG.html" class="menu-button button-notturno">Night Room Service</a>`;
    } else {
        // Solo Room Service diurno
        menuIt.innerHTML += `<a href="Room_Service_ITA.html" class="menu-button button-room-service">Room Service</a>`;
        menuEn.innerHTML += `<a href="Room_Service_ENG.html" class="menu-button button-room-service">Room Service</a>`;
    }
}

// Al load
getCurrentMenu();
