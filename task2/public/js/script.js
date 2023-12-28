document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    const signinMessage = document.getElementById('signinMessage');

    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(signinForm);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('https://shoppers-paradise.onrender.com/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.ok) {
                const userData = await response.json();
                signinMessage.textContent = 'Signin successful';
                localStorage.setItem('currentUser', JSON.stringify(userData));
                window.location.href = 'index.html';
            } else {
                const errorMessage = await response.text();
                signinMessage.textContent = errorMessage;
            }
        } catch (error) {
            signinMessage.textContent = 'Error signing in';
        }
    });

    // Display username if available in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('username').textContent = currentUser.username;
    }
});
