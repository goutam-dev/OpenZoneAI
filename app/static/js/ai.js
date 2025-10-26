// AI Idea Generator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ideaForm');
    const submitButton = document.getElementById('submitButton');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsList = document.getElementById('resultsList');
    const errorContainer = document.getElementById('errorContainer');
    const errorText = document.getElementById('errorText');
    const businessInput = document.getElementById('businessInput');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Hide previous results and errors
        resultsContainer.style.display = 'none';
        errorContainer.style.display = 'none';
        resultsList.innerHTML = '';

        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline-block';

        const businessDescription = businessInput.value.trim();

        try {
            // Send request to backend
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ business: businessDescription })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Display results
            displayResults(data.ideas);

        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'Failed to generate ideas. Please try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.display = 'inline-block';
            buttonLoader.style.display = 'none';
        }
    });

    function displayResults(ideas) {
        if (!ideas || ideas.length === 0) {
            showError('No ideas generated. Please try again.');
            return;
        }

        // Clear previous results
        resultsList.innerHTML = '';

        // Create and append idea items with animation
        ideas.forEach((idea, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'idea-item';
            listItem.style.opacity = '0';
            listItem.style.transform = 'translateY(20px)';
            
            // Display the idea text as-is (without keyword highlighting)
            listItem.textContent = idea;
            
            resultsList.appendChild(listItem);

            // Animate in
            setTimeout(() => {
                listItem.style.transition = 'all 0.5s ease';
                listItem.style.opacity = '1';
                listItem.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Show results container with animation
        resultsContainer.style.display = 'block';
        resultsContainer.style.opacity = '0';
        setTimeout(() => {
            resultsContainer.style.transition = 'opacity 0.5s ease';
            resultsContainer.style.opacity = '1';
        }, 100);

        // Add Contact Us button
        addContactButton();
    }

    function addContactButton() {
        // Remove existing contact button if any
        const existingButton = resultsContainer.querySelector('.contact-us-button');
        if (existingButton) {
            existingButton.remove();
        }

        // Create and add Contact Us button
        const contactButton = document.createElement('div');
        contactButton.className = 'contact-us-button';
        contactButton.style.marginTop = '2rem';
        contactButton.style.textAlign = 'center';
        
        const button = document.createElement('a');
        button.href = '/contact';
        button.className = 'contact-button-link';
        button.innerHTML = '<i class="fas fa-envelope"></i> Contact Us About These Ideas';
        
        contactButton.appendChild(button);
        resultsContainer.appendChild(contactButton);

        // Animate button in
        setTimeout(() => {
            contactButton.style.opacity = '0';
            contactButton.style.transform = 'translateY(10px)';
            contactButton.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                contactButton.style.opacity = '1';
                contactButton.style.transform = 'translateY(0)';
            }, 50);
        }, 100);
    }

    function showError(message) {
        errorText.textContent = message;
        errorContainer.style.display = 'block';
        
        // Animate error in
        errorContainer.style.opacity = '0';
        setTimeout(() => {
            errorContainer.style.transition = 'opacity 0.5s ease';
            errorContainer.style.opacity = '1';
        }, 10);
    }

    function highlightKeywords(text) {
        const keywords = ['AI', 'automation', 'business', 'customer', 'data', 'intelligent', 'smart'];
        let highlightedText = text;

        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            highlightedText = highlightedText.replace(
                regex, 
                '<strong style="color: var(--primary-blue);">$1</strong>'
            );
        });

        return highlightedText;
    }
});
