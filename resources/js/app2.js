document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirm = document.getElementById('password_confirmation');

    // Create error message element dynamically if not present
    let errorMsg = document.getElementById('confirm-error');
    if (!errorMsg && confirm) {
        errorMsg = document.createElement('div');
        errorMsg.id = 'confirm-error';
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '0.875rem';
        confirm.parentNode.appendChild(errorMsg);
    }

    // Password match checker
    const validateMatch = () => {
        if (confirm.value.length > 0 && confirm.value !== password.value) {
            confirm.classList.add('error');
            errorMsg.textContent = 'Passwords do not match';
            return false;
        } else {
            confirm.classList.remove('error');
            errorMsg.textContent = '';
            return true;
        }
    };

    // Add input listeners
    if (password && confirm) {
        password.addEventListener('input', validateMatch);
        confirm.addEventListener('input', validateMatch);
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateMatch()) {
                alert('Please make sure the passwords match.');
                return;
            }

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error('Validation error:', data.errors || data);
                    let message = 'Registration failed.';

                    if (data && typeof data === 'object' && data.errors) {
                        const messages = Object.values(data.errors).flat();
                        message = messages.join('\n');
                    } else if (data.message) {
                        message = data.message;
                    }

                    alert(message);
                    return;
                }

                alert(data.message || "Registered successfully");
                window.location.href = data.redirect || "/dashboard";
            } catch (err) {
                console.error('Error:', err);
                alert("An error occurred during registration.");
            }
        });
    }
});
