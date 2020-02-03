<?php

date_default_timezone_set('America/Sao_Paulo');

include_once 'vendor/autoload.php';
include_once __DIR__ . '/../lib/php/index.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->response()->header('Content-Type', 'application/json;charset=utf-8');

$app->post('/', function () {
    $json = array(
        'status' => false,
        'descricao' => 'Usar GET',
        'retorno' => null,
    );

    echo json_encode($json);
});

$app->get('/', function () {
    $json = array(
        'status' => false,
        'descricao' => 'Nenhum serviço solicitado',
        'retorno' => null,
    );

    echo json_encode($json);
});

//BUSCA OS USUÁRIOS CADASTRADOS
$app->get('/users', function () use ($app) {
    try {                
        echo json_encode(getUsers(), JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        $json = array(
            'status' => false,
            'descricao' => 'Erro: ' . $e->getMessage() . ' - ' . $e->getLine(),
            'retorno' => null,
        );

        echo json_encode($json);
    }
});

//BUSCA UM USUÁRIO
$app->get('/users/:id', function ($id) use ($app) {
    try {                
        echo json_encode(getUsers($id), JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        $json = array(
            'status' => false,
            'descricao' => 'Erro: ' . $e->getMessage() . ' - ' . $e->getLine(),
            'retorno' => null,
        );

        echo json_encode($json);
    }
});

//BUSCA OS POSTS DE UM USUÁRIO
$app->get('/users/:id/posts', function ($id) use ($app) {
    try {                
        echo json_encode(getUserPosts($id), JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        $json = array(
            'status' => false,
            'descricao' => 'Erro: ' . $e->getMessage() . ' - ' . $e->getLine(),
            'retorno' => null,
        );

        echo json_encode($json);
    }
});

$app->run();