<!DOCTYPE html>

<?php 
    // start the session to manage user and CSRF token
    session_start();

    if (isset($_SESSION['user_id']))
    {
        header('Location: index.php');
        exit();
    }

    function generateCSRFToken() {
        if(empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    $csrfToken = generateCSRFToken();
?>

<!-- Main webpage -->
<html lang='en'>
   <!-- Headers for the webpage -->
  <head>
    <!-- Bootstrap CSS and JS files - version 5.3.3 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <title>Login</title>
</head>

<!-- body of the webpage -->
<body>
    <form id="loginForm" onsubmit='return validateLogin(event)'>
        <div class='mb-3 mt-3'>
            <label for="alpha" class="form-label">Alpha</label>
            <input type="text" name="alpha" id="alpha" class="form-control" placeholder="m000000" required>
        </div>
        <button type="submit" class="btn">Log In</button>
    </form>  
    
    <script src="login.js"></script>
  </body>
</html>
