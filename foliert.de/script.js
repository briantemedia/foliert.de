// START OF FILE script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Live Timer ---
    const liveTimeElement = document.getElementById('live-time');

    function updateLiveTime() {
        const now = new Date();
        // Verwende toLocaleTimeString für eine lokale Zeitformatierung
        // Stelle sicher, dass das Element existiert, bevor darauf zugegriffen wird
        if (liveTimeElement) {
            liveTimeElement.textContent = now.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }

    // Nur starten, wenn das Element gefunden wird
    if (liveTimeElement) {
        updateLiveTime(); // Sofort anzeigen
        setInterval(updateLiveTime, 1000); // Jede Sekunde aktualisieren
    }

    // --- Countdown Timer ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdown-timer');

    // Zieldatum: Aktuelles Datum + 3 Tage, 12 Stunden, 45 Minuten
    const countdownDuration = (3 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000) + (45 * 60 * 1000);
    const targetDate = new Date().getTime() + countdownDuration;

    /*
    // Alternative: Festes Datum (z.B. 1. des nächsten Monats um 00:00)
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const targetDate = nextMonth.getTime();
    */

    let countdownInterval = null; // Deklariere hier, um später darauf zugreifen zu können

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Stelle sicher, dass die Elemente existieren
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownContainer) {
             if(countdownInterval) clearInterval(countdownInterval); // Stoppe Intervall, wenn Elemente fehlen
             return;
        }

        if (distance < 0) {
            countdownContainer.innerHTML = "Aktion läuft oder ist beendet!";
            if(countdownInterval) clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Führende Nullen hinzufügen
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Nur starten, wenn alle Countdown-Elemente vorhanden sind
    if (daysEl && hoursEl && minutesEl && secondsEl && countdownContainer) {
        updateCountdown(); // Sofort ausführen
        countdownInterval = setInterval(updateCountdown, 1000);
    }


    // --- Before/After Slider ---
    const slider = document.getElementById('ba-slider');

    // Nur ausführen, wenn der Slider existiert
    if (slider) {
        const resizableImg = slider.querySelector('.ba-resizable-img');
        const handle = slider.querySelector('.ba-handle');
        let isDragging = false;

        function moveSlider(x) {
            // Nur ausführen, wenn die Elemente existieren
            if (!resizableImg || !handle) return;

            const sliderRect = slider.getBoundingClientRect();
            let position = x - sliderRect.left;

            // Begrenzen der Position innerhalb des Sliders
            if (position < 0) position = 0;
            if (position > sliderRect.width) position = sliderRect.width;

            const percentage = (position / sliderRect.width) * 100;
            resizableImg.style.width = percentage + '%';
            handle.style.left = percentage + '%';
        }

        if (resizableImg && handle) {
            // Mouse Events
            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                slider.style.cursor = 'grabbing'; // Veränderter Cursor beim Ziehen
                moveSlider(e.clientX);
                e.preventDefault(); // Verhindert Textauswahl etc.
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                moveSlider(e.clientX);
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    slider.style.cursor = 'col-resize'; // Zurück zum Standard-Slider-Cursor
                }
            });

            // Touch Events
            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                slider.style.cursor = 'grabbing';
                // Stelle sicher, dass touches existiert
                if (e.touches && e.touches.length > 0) {
                    moveSlider(e.touches[0].clientX);
                }
                e.preventDefault();
            }, { passive: false }); // passive: false ist wichtig für preventDefault

            document.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                 // Stelle sicher, dass touches existiert
                if (e.touches && e.touches.length > 0) {
                    moveSlider(e.touches[0].clientX);
                }
            }, { passive: false });

            document.addEventListener('touchend', () => {
                if (isDragging) {
                    isDragging = false;
                    slider.style.cursor = 'col-resize';
                }
            });
        }
    } // Ende if(slider)


    // --- Footer: Aktuelles Jahr ---
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
// END OF FILE script.js