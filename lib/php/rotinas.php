<?php
include_once __DIR__ . '/../util/utils.php';
include_once __DIR__ . '/../../config/config.php';

function getConnection($new = false) {    
    $id = AbreBanco(Config::DB_HOST, Config::DB_USER, Config::DB_PASS, Config::DB_DATABASE, $new);
    DB_set_charset('utf8', $id);    
    return $id;
}