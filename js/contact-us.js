document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact-form');
    const subjectSelect = document.querySelector('#subject');

    // Check for a 'subject' parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const subjectFromUrl = urlParams.get('subject');

    // If a subject is found in the URL, select it in the dropdown
    if (subjectFromUrl && subjectSelect) {
        // Find the option that matches the URL parameter and select it
        const optionToSelect = Array.from(subjectSelect.options).find(option => option.value === subjectFromUrl);
        if (optionToSelect) {
            optionToSelect.selected = true;
        }
    }
});