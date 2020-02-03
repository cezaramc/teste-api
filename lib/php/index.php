<?php

//error_reporting(E_ERROR);

require_once __DIR__ . '/rotinas.php';

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'Pesquisar':
            echo json_encode(getUsers());
            break;

        case 'getPosts':
            echo json_encode(getPosts());
            break;

        case 'getUser':
            echo json_encode(getUsers($_POST['idUser']));
            break;

        case 'setUser':
            echo json_encode(setUser(json_decode($_POST['dados'], true)));
            break;

        case 'delUser':
            echo json_encode(delUser($_POST['idUser']));
            break;

        case 'getUserPosts':
            echo json_encode(getUserPosts($_POST['idUser']));
            break;

        case 'verificarServidor':
            echo json_encode(verifyServer());
            break;
    }
}

function getUsers($idUser = 0)
{
    require_once __DIR__ . '/../classes/usuario.php';

    $conn = getConnection();

    $user = new Usuario;
    return $user->getUsers($conn);
}

function setUser($dados, $conn = false)
{
    if (!$conn) {
        $conn = getConnection();
    }

    require_once __DIR__ . '/../classes/usuario.php';

    $user = new Usuario;
    return $user->setUser($conn, $dados);
}

function setPost($dados, $conn = false)
{
    if (!$conn) {
        $conn = getConnection();
    }

    require_once __DIR__ . '/../classes/usuario.php';

    $user = new Usuario;
    return $user->setPost($conn, $dados);

}

function delUser($idUser)
{
    $conn = getConnection();

    require_once __DIR__ . '/../classes/usuario.php';

    $user = new Usuario;
    return $user->delUser($conn, $idUser);
}

function getUserPosts($idUser = 0)
{
    require_once __DIR__ . '/../classes/usuario.php';

    $conn = getConnection();

    $user = new Usuario;
    return $user->getUserPosts($conn, $idUser);

}

function verifyServer()
{
    $conn = getConnection();

    if (!is_object($conn)) {
        return array(
            'status' => false,
            'retorno' => 'Sem conexão com o servidor de banco de dados. Verificar host, user e pass (config/config.php)',
        );
    }

    //TEM CONEXÃO, VERIFICA SE TEM O BANCO DE DADOS
    $sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" . Config::DB_DATABASE . "'";
    $result = DB_query($sql, $conn);

    if (DB_num_rows($result) <= 0) {
        //CRIA O BANCO DE DADOS
        $sql = "CREATE DATABASE " . Config::DB_DATABASE . " CHARACTER SET latin1 COLLATE latin1_swedish_ci";
        DB_query($sql, $conn);

        DB_select_db(Config::DB_DATABASE, $conn);
    }

    //VERIFICA SE TEM AS TABELAS NO BANCO DE DADOS
    //TABELA users
    $sql = "SHOW TABLES LIKE 'users'";
    $res = DB_query($sql, $conn);

    if (DB_num_rows($result) <= 0) {
        //CRIA A TABELA users
        $sql = "CREATE TABLE users
        (
          iduser int(10) unsigned NOT NULL AUTO_INCREMENT,
          name varchar(120) NOT NULL DEFAULT '',
          username varchar(60) NOT NULL DEFAULT '',
          email varchar(150) NOT NULL DEFAULT '',
          phone varchar(40) NOT NULL DEFAULT '',
          website varchar(80) NOT NULL DEFAULT '',
          address_street varchar(120) NOT NULL DEFAULT '',
          address_suite varchar(40) NOT NULL DEFAULT '',
          address_city varchar(40) NOT NULL DEFAULT '',
          address_zipcode varchar(40) NOT NULL DEFAULT '',
          address_geo_lat varchar(20) NOT NULL DEFAULT '',
          address_geo_lng varchar(20) NOT NULL DEFAULT '',
          company_name varchar(100) NOT NULL DEFAULT '',
          company_catchPhrase varchar(80) NOT NULL DEFAULT '',
          company_bs varchar(80) NOT NULL DEFAULT '',
          dateregister datetime NOT NULL,
          datelastupdate datetime DEFAULT NULL,
          PRIMARY KEY (iduser)
        ) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";

        DB_query($sql, $conn);

        importUsers($conn);
    }

    $sql = "SHOW TABLES LIKE 'posts'";
    $res = DB_query($sql, $conn);

    if (DB_num_rows($result) <= 0) {
        //CRIA A TABELA users
        $sql = "CREATE TABLE posts
        (
            idpost int(10) unsigned NOT NULL AUTO_INCREMENT,
            iduser int(10) unsigned NOT NULL DEFAULT '0',
            title varchar(120) NOT NULL DEFAULT '',
            body text NOT NULL,
            dateregister datetime NOT NULL,
            PRIMARY KEY (idpost)
          ) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";

        DB_query($sql, $conn);

        $sql = "ALTER TABLE posts ADD CONSTRAINT fk_iduser FOREIGN KEY (iduser) REFERENCES users (iduser)";
        DB_query($sql, $conn);

        importPosts($conn);
    }

    return array(
        'status' => true,
        'retorno' => 'Conexão OK',
    );
}

function importUsers($conn)
{
    $json = json_decode(file_get_contents("http://jsonplaceholder.typicode.com/users"), true);

    foreach ($json as $dados) {
        setUser($dados, $conn);
    }
}

function importPosts($conn)
{
    $json = json_decode(file_get_contents("http://jsonplaceholder.typicode.com/posts"), true);

    foreach ($json as $dados) {
        setPost($dados, $conn);
    }
}
