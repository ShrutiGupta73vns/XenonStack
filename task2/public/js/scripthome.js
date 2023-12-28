document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...

    // Display user details on the home page
    const userDetailsDiv = document.getElementById('userDetails');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        userDetailsDiv.innerHTML = `
            <h3>Hi, ${currentUser.username}!</h3>
            <p>Email: ${currentUser.email}</p>
            <!-- Display other user details as needed -->
        `;
    } else {
        userDetailsDiv.innerHTML = '<p>Please sign in</p>';
    }

    const logoutButton = document.getElementById('logoutBtn');

    logoutButton.addEventListener('click', () => {
        // Remove user data from localStorage
        localStorage.removeItem('currentUser');

        // Redirect to the signin page after successful logout
        window.location.href = 'signin.html';
    });
});
