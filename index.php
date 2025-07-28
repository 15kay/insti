<?php
// index.php

// Get the requested path (e.g. /about, /news)
$path = trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH), '/');

// Default route
if ($path == '' || $path == 'home') {
    include('assets/index.php');
} elseif ($path == 'about') {
    include('assets/about.php');
} elseif ($path == 'news') {
    include('assets/news.php');
} elseif ($path == 'team') {
    include('assets/team.php');
} elseif ($path == 'contact') {
    include('assets/contact.php');
} else {
    http_response_code(404);
    echo "<h1>404 - Page Not Found</h1>";
}
?>
