<?php
require_once __DIR__ . '/../php/rotinas.php';
/**
 * @author Cezar Augusto <alecezar159@gmail.com>
 */
class Usuario
{
    /**
     * Faz uma consulta SELECT na tabela users e retorna um array com o resultado.
     * @param mysqli $conn Conexão ao servidor MySQL/MariaDB
     * @param int $idUser ID do usuário
     * @return array
     */
    public function getUsers($conn, $idUser = 0)
    {
        $sql = "SELECT u.iduser, u.name, u.username, u.email, u.phone, u.website,
            u.address_street, u.address_suite, u.address_city, u.address_zipcode, u.address_geo_lat, u.address_geo_lng,
            u.company_name, u.company_catchPhrase, u.company_bs
            FROM users AS u ";

        if ($idUser > 0) {
            $sql .= " WHERE u.idUser=$idUser ";
        }

        $result = DB_query($sql, $conn);

        if (DB_num_rows($result) <= 0) {
            return array(
                'status' => false,
                'retorno' => 'Nenhum usuário encontrado',
            );
        }

        while ($row = DB_fetch_assoc($result)) {
            $json[] = array(
                'iduser' => $row['iduser'],
                'coduser' => sprintf('%04s', $row['iduser']),
                'name' => $row['name'],
                'username' => $row['username'],
                'email' => $row['email'],
                'phone' => $row['phone'],
                'website' => $row['website'],
                'address' => array(
                    'street' => $row['address_street'],
                    'suite' => $row['address_suite'],
                    'city' => $row['address_city'],
                    'zipcode' => $row['address_zipcode'],
                    'geo' => array(
                        'lat' => $row['address_geo_lat'],
                        'lng' => $row['address_geo_lng'],
                    ),
                ),
                'company' => array(
                    'name' => $row['company_name'],
                    'catchPhrase' => $row['company_catchPhrase'],
                    'bs' => $row['company_bs'],
                ),
            );
        }

        return array(
            'status' => true,
            'retorno' => $json,
        );
    }

    /**
     * Fazer a inserção ou alteração de um usuário e retorna um array com o resultado.
     * @param mysqli $conn Conexão ao servidor MySQL/MariaDB
     * @param int $idUser ID do usuário
     * @return array
     */
    public function setUser($conn, $dados)
    {
        if ($this->verifyDuplicityUser($conn, $dados)) {
            return array(
                "status" => false,
                "retorno" => "Username e/ou e-mail já cadastrado para outro usuário",
            );
        }

        $sql = " users SET name='" . DB_real_escape_string($dados['name'], $conn) . "',
        username ='" . DB_real_escape_string($dados['username'], $conn) . "',
        email ='" . DB_real_escape_string($dados['email'], $conn) . "',
        phone ='" . DB_real_escape_string($dados['phone'], $conn) . "',
        website ='" . DB_real_escape_string($dados['website'], $conn) . "',
        address_street='" . DB_real_escape_string($dados['address']['street'], $conn) . "',
        address_suite ='" . DB_real_escape_string($dados['address']['suite'], $conn) . "',
        address_city ='" . DB_real_escape_string($dados['address']['city'], $conn) . "',
        address_zipcode ='" . DB_real_escape_string($dados['address']['zipcode'], $conn) . "',
        address_geo_lat ='" . DB_real_escape_string($dados['address']['geo']['lat'], $conn) . "',
        address_geo_lng ='" . DB_real_escape_string($dados['address']['geo']['lng'], $conn) . "',
        company_name='" . DB_real_escape_string($dados['company']['name'], $conn) . "',
        company_catchPhrase ='" . DB_real_escape_string($dados['company']['catchPhrase'], $conn) . "',
        company_bs ='" . DB_real_escape_string($dados['company']['bs'], $conn) . "' ";

        if ($dados['idUser'] > 0) {
            $sql = "UPDATE " . $sql . ", datelastupdate=Now() WHERE idUser=" . $dados['idUser'];
        } else {
            $sql = "INSERT INTO " . $sql . ", dateregister=Now() ";
        }

        DB_query($sql, $conn);

        if (DB_affected_rows($conn) <= 0) {
            return array(
                "status" => false,
                "retorno" => "Problemas ao gravar o usuário",
            );
        }

        $idUser = ($dados['idUser'] > 0 ? $dados['idUser'] : DB_insert_id($conn));

        return array(
            "status" => true,
            "retorno" => array('idUser' => $idUser),
        );

    }

    /**
     * Verifica se já existe um usuário na base com o mesmo username e/ou e-mail.
     * @param mysqli $conn Conexão ao servidor MySQL/MariaDB
     * @param array $dados Array associativo com os dados do usuário
     * @return boolean
     */
    public function verifyDuplicityUser($conn, $dados)
    {
        $sql = "SELECT 1
        FROM users
        WHERE (username='" . DB_real_escape_string($dados['username'], $conn) . "'
            OR email ='" . DB_real_escape_string($dados['email'], $conn) . "') ";

        if ($dados['idUser'] > 0) {
            $sql .= " AND iduser<>" . $dados['idUser'];
        }

        $result = DB_query($sql, $conn);

        if (DB_num_rows($result) > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Fazer a inserção de um post e retorna um array com o resultado.
     * @param mysqli $conn Conexão ao servidor MySQL/MariaDB
     * @param array $dados Array associativo com os dados do post
     * @return array
     */
    public function setPost($conn, $dados)
    {
        $sql = " posts SET iduser='" . DB_real_escape_string($dados['userId'], $conn) . "',
            title ='" . DB_real_escape_string($dados['title'], $conn) . "',
            body ='" . DB_real_escape_string($dados['body'], $conn) . "' ";

        if ($dados['idPost'] > 0) {
            $sql = "UPDATE " . $sql . ", WHERE idPost=" . $dados['idPost'];
        } else {
            $sql = "INSERT INTO " . $sql . ", dateregister=Now() ";
        }

        DB_query($sql, $conn);

        if (DB_affected_rows($conn) <= 0) {
            return array(
                "status" => false,
                "retorno" => "Problemas ao gravar o post do usuário",
            );
        }

        $idPost = ($dados['idPost'] > 0 ? $dados['idPost'] : DB_insert_id($conn));

        return array(
            "status" => true,
            "retorno" => array('idPost' => $idPost),
        );

    }

    /**
     * Deleta um usuário e os posts da base de dados e retorna um array com o resultado.
     * @param mysqli $conn Conexão ao servidor MySQL/MariaDB
     * @param int $idUser ID do usuário
     * @return array
     */
    public function delUser($conn, $idUser)
    {
        $sql = "DELETE FROM posts WHERE idUser=" . $idUser;
        DB_query($sql, $conn);

        $sql = "DELETE FROM users WHERE idUser=" . $idUser;
        DB_query($sql, $conn);

        if (DB_affected_rows($conn) <= 0) {
            return array(
                "status" => false,
                "retorno" => "Problemas ao excluir o usuário",
            );
        }

        return array(
            "status" => true,
            "retorno" => 'Usuário excluído',
        );
    }

    /**
     * Faz uma consulta SELECT na tabela posts e retorna um array com o resultado.
     * @param mysqli $conn Conexão ao servidor MySQL/MariaDB
     * @param int $idUser ID do usuário
     * @return array
     */
    public function getUserPosts($conn, $idUser = 0)
    {
        $sql = "SELECT p.idpost, p.title, p.body, p.iduser
            FROM posts AS p WHERE p.idUser=$idUser
            ORDER BY p.idpost DESC";

        $result = DB_query($sql, $conn);

        if (DB_num_rows($result) <= 0) {
            return array(
                'status' => false, 'retorno' => 'Nenhum post encontrado',
            );
        }

        while ($row = DB_fetch_assoc($result)) {
            $json[] = array(
                'iduser' => $row['iduser'],
                'idpost' => $row['idpost'],
                'codpost' => sprintf('%04s', $row['idpost']),
                'title' => $row['title'],
                'body' => $row['body'],
            );
        }

        return array(
            'status' => true, 'retorno' => $json,
        );
    }
}
