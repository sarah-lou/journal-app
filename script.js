document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save-button');
    const entryTextarea = document.getElementById('entry');
    const entriesList = document.getElementById('entries');

    // Load entries from localStorage
    const loadEntries = () => {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entriesList.innerHTML = '';
        entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort entries by timestamp

        entries.forEach(entry => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${entry.timestamp}</strong>: ${entry.text}`;
            entriesList.appendChild(li);
        });
    };

    // Save a new entry to localStorage
    const saveEntry = () => {
        const text = entryTextarea.value.trim();
        if (text) {
            const timestamp = new Date().toLocaleString();
            const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            entries.push({ text, timestamp });
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            loadEntries();
            entryTextarea.value = '';
        }
    };

    saveButton.addEventListener('click', saveEntry);
    loadEntries();
});
