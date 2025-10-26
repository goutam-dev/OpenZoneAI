// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    const successMessage = document.getElementById('contactSuccess');
    const errorMessage = document.getElementById('contactError');
    const errorText = document.getElementById('contactErrorText');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            showError('Please fill in all required fields.');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline-block';

        try {
            // Send request to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Show success message
            showSuccess();
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'Failed to send message. Please try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.display = 'inline-block';
            buttonLoader.style.display = 'none';
        }
    });

    function showSuccess() {
        successMessage.style.display = 'flex';
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            successMessage.style.opacity = '1';
        }, 10);
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        errorMessage.style.opacity = '0';
        errorMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            errorMessage.style.opacity = '1';
        }, 10);
    }
});
