document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action$="/login"]');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);

            try {
                const response = await fetch(loginForm.action, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error('Login error:', data);
                    let message = 'Login failed.';

                    if (data && typeof data === 'object' && data.errors) {
                        const messages = Object.values(data.errors).flat();
                        message = messages.join('\n');
                    } else if (data.message) {
                        message = data.message;
                    }

                    alert(message);
                    return;
                }

                window.location.href = data.redirect || "/dashboard";
            } catch (err) {
                console.error('Error:', err);
                alert("An error occurred during login.");
            }
        });
    }
});
