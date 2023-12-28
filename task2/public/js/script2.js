document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupform');
    const signupMessage = document.getElementById('signupMessage');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(signupForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        if (data.password !== data.confirmPassword) {
            signupMessage.textContent = 'Passwords do not match';
            return;
        }

        try {
            const response = await fetch('https://localhost:10000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.ok) {
                signupMessage.textContent = 'Signup successful';
                window.location.href = 'signin.html'; // Redirect to signin page
            } else {
                const errorMessage = await response.text();
                signupMessage.textContent = errorMessage;
            }
        } catch (error) {
            signupMessage.textContent = 'Error signing up';
        }
    });

    // Display username if available in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('username').textContent = currentUser.username;
    }
});
