document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Clear previous messages
            loginMessage.innerHTML = '';
            loginMessage.className = 'mt-3'; // Reset classes

            // Basic client-side validation
            if (email === '' || password === '') {
                loginMessage.textContent = 'Please fill in both email/username and password.';
                loginMessage.classList.add('alert', 'alert-danger');
                return;
            }

            // Simulate API call
            loginMessage.textContent = 'Attempting to log in...';
            loginMessage.classList.add('alert', 'alert-info');

            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                // --- IMPORTANT ---
                // The following is a MOCKUP of backend response handling.
                // In a real application, the backend would perform authentication
                // (check credentials against a database, hash passwords, etc.)
                // and return a meaningful response.
                // For this example, we'll simulate based on a dummy condition.

                if (email === "user@example.com" && password === "password123") { // Dummy credentials for simulation
                    // Simulate successful login
                    loginMessage.textContent = 'Login successful! Redirecting...';
                    loginMessage.classList.remove('alert-info', 'alert-danger');
                    loginMessage.classList.add('alert', 'alert-success');

                    // Redirect to homepage or dashboard after a short delay
                    setTimeout(() => {
                        window.location.href = 'index.html'; // Or a dashboard page
                    }, 1500);

                } else if (response.ok) {
                    // This block would be reached if the dummy /api/login endpoint actually existed
                    // and returned a 2xx status. For this simulation, it's less likely to be hit
                    // unless you have a mock server responding.
                    const data = await response.json(); // Assuming backend sends JSON response
                    loginMessage.textContent = data.message || 'Login successful! Redirecting...';
                    loginMessage.classList.remove('alert-info', 'alert-danger');
                    loginMessage.classList.add('alert', 'alert-success');

                    setTimeout(() => {
                        window.location.href = data.redirectTo || 'index.html';
                    }, 1500);

                } else {
                    // Simulate failed login (e.g., wrong credentials, server error)
                    // In a real app, you'd get error details from `response.json()` if available
                    loginMessage.textContent = 'Login failed. Please check your credentials or try again later.';
                    loginMessage.classList.remove('alert-info', 'alert-success');
                    loginMessage.classList.add('alert', 'alert-danger');
                }

            } catch (error) {
                // Handle network errors or other issues with the fetch call
                console.error('Login API call failed:', error);
                loginMessage.textContent = 'An error occurred. Please try again later.';
                loginMessage.classList.remove('alert-info', 'alert-success');
                loginMessage.classList.add('alert', 'alert-danger');
            }
        });
    }
});
