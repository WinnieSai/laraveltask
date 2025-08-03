<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="login-body">

    <div class="login-container">
        <h2 class="login-header">
            <span class="brand">TASK MANAGER</span>
            <span class="subheading">| Log In</span>
        </h2>

        <form method="POST" action="{{ route('login.submit') }}" class="login-form">

            @csrf

            {{-- Name --}}
            <div>
                <label for="name" class="label">Name</label>
                <input type="text" name="name" id="name" class="input" required autofocus>
            </div>

            {{-- Password --}}
            <div class="password-group">
                <label for="password" class="label">Password</label>
                <input type="password" name="password" id="password" class="input" required>
            </div>

            {{-- Submit --}}
            <button type="submit" class="login-button">
                Log in
            </button>

            <!-- Register Link -->
            <p style="text-align: center; margin-top: 1rem; font-size: 0.9rem;">
                Don’t have an account?
                <a href="{{ route('register') }}" style="color: #047857; text-decoration: underline;">
                    Register
                </a>
            </p>
        </form>
    </div>

</body>
</html>

