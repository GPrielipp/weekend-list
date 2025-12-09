<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello from PHP!</h1>
  <div id="result">
    <h2 id="header"></h2>
    <p id="msg"></p>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const header = document.getElementById("header");
      const msg = document.getElementById("msg");

      fetch('/sql.php')
      .then(resp => resp.json())
      .then(json => {
        if('error' in json) {
          header.innerText = "Error";
          msg.innerText = json.error;
        } else {
          header.innerText = "Message";
          msg.innerText = json.message;
        }
      });
    });
  </script>
</body>
</html>