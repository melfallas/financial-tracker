document.addEventListener('DOMContentLoaded', () => {

    // --- Variables de Configuración ---
    const offerExpirationDate = '2025-12-31';
    const ratesCRC = [5, 5.5, 6, 7, 8];
    const ratesUSD = [2.0, 2.2, 2.5, 2.8, 3.0];
    const terms = [1, 2, 3, 4, 5];

    let currentCurrency = 'CRC';

    // --- Elementos del DOM ---
    const btnColones = document.getElementById('btnColones');
    const btnDolares = document.getElementById('btnDolares');
    const amountInput = document.getElementById('amount');
    const currencySymbol = document.getElementById('currencySymbol');
    const depositTitle = document.getElementById('depositTitle');
    const offerValidityElement = document.getElementById('offerValidity');
    const yieldTableBody = document.getElementById('yieldTable').querySelector('tbody');
    const projectionTableBody = document.getElementById('projectionTable').querySelector('tbody');

    // --- Funciones de Formato ---

    const formatterCRC = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const formatterUSD = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
    /**
     * Parsea un valor de input formateado a un número.
     * @param {string} value - El valor del input (ej. "100,000.00").
     * @returns {number} El número parseado.
     */
    const parseFormattedNumber = (value) => {
        return parseFloat(value.replace(/,/g, '')) || 0;
    };
    
    /**
     * Formatea el valor del input de monto con separadores de miles.
     */
    const formatAmountInput = () => {
        const value = parseFormattedNumber(amountInput.value);
        const formatter = currentCurrency === 'CRC' ? formatterCRC : formatterUSD;
        amountInput.value = formatter.format(value);
    };

    /**
     * Formatea una fecha a YYYY-MM-DD.
     * @param {string} dateString - La fecha.
     * @returns {string} La fecha formateada.
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // --- Funciones Principales ---

    /**
     * Llena las tablas con los datos calculados.
     */
    const populateTables = () => {
        const rates = currentCurrency === 'CRC' ? ratesCRC : ratesUSD;
        const principal = parseFormattedNumber(amountInput.value);
        const numberFormatter = currentCurrency === 'CRC' ? formatterCRC : formatterUSD;
        const yieldFormatter = new Intl.NumberFormat('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        yieldTableBody.innerHTML = '';
        projectionTableBody.innerHTML = '';

        terms.forEach((term, index) => {
            const rate = rates[index];
            if (rate === undefined) return;

            // Fila de la tabla de rendimiento
            const yieldRow = yieldTableBody.insertRow();
            yieldRow.insertCell().textContent = `${term} año${term > 1 ? 's' : ''}`;
            const yieldCell = yieldRow.insertCell();
            yieldCell.textContent = `${yieldFormatter.format(rate)} %`;
            yieldCell.classList.add('highlight-yield');

            // Calcular valor futuro (interés compuesto)
            const annualRate = rate / 100;
            const futureValue = principal * Math.pow((1 + annualRate), term);

            // Fila de la tabla de proyección
            const projectionRow = projectionTableBody.insertRow();
            projectionRow.insertCell().textContent = numberFormatter.format(principal);
            projectionRow.insertCell().textContent = `${term} año${term > 1 ? 's' : ''}`;
            const totalCell = projectionRow.insertCell();
            totalCell.textContent = numberFormatter.format(futureValue);
            totalCell.classList.add('highlight-total');
        });
    };

    /**
     * Actualiza la UI cuando cambia la moneda.
     * @param {string} newCurrency - La nueva moneda ('CRC' o 'USD').
     */
    const switchCurrency = (newCurrency) => {
        currentCurrency = newCurrency;
        
        if (currentCurrency === 'CRC') {
            btnColones.classList.add('active');
            btnDolares.classList.remove('active');
            amountInput.value = formatterCRC.format(100000);
        } else {
            btnDolares.classList.add('active');
            btnColones.classList.remove('active');
            amountInput.value = formatterUSD.format(1000);
        }

        currencySymbol.textContent = currentCurrency;
        depositTitle.textContent = `Depósitos a Plazo ${currentCurrency === 'CRC' ? 'Colones' : 'Dólares'} (${currentCurrency})`;
        
        populateTables();
    };

    // --- Event Listeners ---
    btnColones.addEventListener('click', () => switchCurrency('CRC'));
    btnDolares.addEventListener('click', () => switchCurrency('USD'));
    amountInput.addEventListener('blur', formatAmountInput); // Formatear cuando el usuario sale del campo

    // Actualizar tablas en tiempo real mientras se escribe
    amountInput.addEventListener('input', () => {
        // Para evitar problemas con el cursor, solo recalculamos
        populateTables();
    });

    // --- Inicialización ---
    const initializeApp = () => {
        offerValidityElement.textContent = `Válido hasta el ${formatDate(offerExpirationDate)}`;
        switchCurrency('CRC'); // Iniciar con Colones por defecto
    };

    initializeApp();
});
