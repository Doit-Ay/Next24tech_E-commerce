document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Handle form submission, e.g., send the data to a server
        alert(`Thank you, ${name}! Your message has been sent.`);
        
        // Clear the form
        contactForm.reset();
    });
});
