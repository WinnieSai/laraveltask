<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    @vite(['resources/css/app2.css', 'resources/js/app2.js'])
    <style>
        .input.error {
            border-color: red;
        }

        #confirm-error {
            color: red;
            font-size: 0.9rem;
        }
    </style>
</head>
<body class="register-body">

    <div class="register-container">
        <h2 class="register-header">
            <span class="brand">TASK MANAGER</span>
            <span class="subheading">| Register</span>
        </h2>

        <form method="POST" action="{{ route('register.submit') }}" id="registerForm" class="register-form">
            @csrf

            {{-- Name --}}
            <div>
                <label for="name" class="label">Name</label>
                <input type="text" name="name" id="name" class="input" required autofocus>
            </div>

            {{-- Email --}}
            <div>
                <label for="email" class="label">Email</label>
                <input type="email" name="email" id="email" class="input" required>
            </div>

            {{-- Password --}}
            <div class="password-group">
                <label for="password" class="label">Password (minimum password length: 8)</label>
                <input type="password" name="password" id="password" class="input" required>
            </div>

            {{-- Confirm Password --}}
            <div class="password-group">
                <label for="password_confirmation" class="label">Confirm Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" class="input" required>
                <span id="confirm-error"></span>
            </div>

            {{-- Submit --}}
            <button type="submit" class="register-button">
                Register
            </button>

            {{-- Link to Login --}}
            <p style="margin-top: 1rem; text-align: center; font-size: 0.9rem;">
                Already have an account?
                <a href="{{ route('login') }}" style="color: #047857; text-decoration: underline;">Login here</a>
            </p>
        </form>
    </div>
</body>
</html>
