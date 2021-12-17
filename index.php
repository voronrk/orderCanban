<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>График производства</title>
    
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"> -->
    <link rel="stylesheet" href="bulma.min.css">
    <link rel="stylesheet" href="style.css">
    
    <script type="module" src="js/script.js" defer></script>
</head>
<body id="body" class="container py-4">
<nav class="navbar has-background-light">
    <div class="navbar-start">
        <div class="navbar-item">
        <button class="button is-primary has-text-weight-bold is-small <?php echo ($_SESSION['auth'] ? '' : 'is-hidden');?>" id="clear-base">Очистить</button>
        </div>
    </div>
    <div class="navbar-end">
        <div class="navbar-item">
        <form method="POST" action="logout.php" class=<?php echo ($_SESSION['auth'] ? '' : 'is-hidden');?>>
            <div class="field has-addons">
                <div class="has-text-weight-bold mr-4"><?php echo ($_SESSION['username']);?></div>
                <button class="button is-primary has-text-weight-bold is-small" type="submit">Выйти</button>
            </div>
        </form>
        <form method="POST" action="login.php" class=<?php echo ($_SESSION['auth'] ? 'is-hidden' : '');?>>
        <div class="field has-addons">
            <p class="control">
            <input class="input is-small" type="text" placeholder="Логин" name="login">
            </p>
            <p class="control">
            <input class="input is-small" type="password" placeholder="Пароль" name="pass">
            </p>
            <p class="control">
            <button class="button is-primary has-text-weight-bold is-small" type="submit" id="button-login">Войти</button>
            </p>
        </div>
        </form>

        </div>
    </div>
</nav>
<div class="tabs is-boxed is-small">
    <ul id="tabs">
        <li><a data-machine = "horizon1">Горизонт-1</a></li>
        <li><a data-machine = "horizon2">Горизонт-2</a></li>
        <li><a data-machine = "binder">Термоклей</a></li>
        <li><a data-machine = "assembling">Комплектовка</a></li>
    </ul>
</div>
<div class="columns" id="main-wrapper">
    <!-- <div class="column is-1" id="hope-field"></div>
    <div class="column" id="work-field"></div> -->
</div>

</body>