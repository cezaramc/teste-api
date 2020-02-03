<?php

function SoNumeros($str)
{
    return preg_replace("/[^0-9]/", "", $str);
}

function FormatData($data, $hora = true)
{
    if (!isDate($data)) {
        return '';
    }

    if (strlen($data) <= 10 || !$hora) {
        return substr($data, 8, 2) . "/" . substr($data, 5, 2) . "/" . substr($data, 0, 4);
    } else {
        return substr($data, 8, 2) . "/" . substr($data, 5, 2) . "/" . substr($data, 0, 4) .
        " " . substr($data, 11, 8);
    }

}

function TextoSSql($ArqT, $texto)
{
    return DB_real_escape_string($texto, $ArqT);
}

function PrimeiroNome($texto)
{
    $aux = explode(' ', $texto);
    return $aux[0];
}

function NomeCurto($texto)
{

    if (trim($texto) == '') {
        return '';
    } else {
        $aux = explode(' ', $texto);

        $nome = $aux[0] . ' ' . $aux[1];

        if (count_chars($aux[1]) <= 3) {
            $nome .= $aux[2];
        }

        return $nome;
    }
}

function strposa($haystack, $needles = array(), $offset = 0)
{
    $chr = array();
    foreach ($needles as $needle) {
        if (strpos($haystack, $needle, $offset)) {
            $chr[] = strpos($haystack, $needle, $offset);
        }

        //echo strpos($haystack,$needle,$offset);
    }
    if (empty($chr)) {
        return false;
    }

    return min($chr);
}

function DataSSql($data, $hora = false)
{
    $temp = substr($data, 6, 4) . "-" . substr($data, 3, 2) . "-" . substr($data, 0, 2);

    if ($hora) {
        $temp .= ' ' . substr($data, 11, 2) . ':' . substr($data, 14, 2) . ':' . substr($data, 17, 2);
    }

    return $temp;
}

function DateAdd($givendate, $day = 0, $mth = 0, $yr = 0)
{
    $cd = strtotime($givendate);

    $dia = number_format_complete(date('d', $cd) + $day, '0', 2);
    $mes = date('m', $cd);
    $ano = date('Y', $cd) + $yr;

    if ($mth > 0) {
        for ($i = 0; $i < $mth; $i++) {
            $mes++;

            if ($mes > 12) {
                $ano++;
                $mes = 1;
            }
        }
    }

    $mes = number_format_complete($mes, '0', 2);
    $ano = number_format_complete($ano, '0', 4);

    $newdate = $ano . '-' . $mes . '-' . $dia;

    while (!isDate($newdate)) {
        $dia--;
        $newdate = $ano . '-' . $mes . '-' . $dia;
    }

    $newdate = date('Y-m-d h:i:s', mktime(date('h', $cd), date('i', $cd), date('s', $cd), $mes, $dia, $ano));

    return $newdate;
}

function isDate($data)
{
    $ano = substr($data, 0, 4) * 1;
    $mes = substr($data, 5, 2) * 1;
    $dia = substr($data, 8, 2) * 1;

    return checkdate($mes, $dia, $ano);
}

function isTime($t)
{

    if (strlen($t) == 5) {
        if (substr($t, 0, 2) < 24) {
            if (substr($t, 3, 2) < 60) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

    } else {
        return false;
    }

}

function dataExtended($diaSemana, $data)
{
    $ano = substr($data, 0, 4);
    $mes = substr($data, 5, 2);
    $dia = substr($data, 8, 2);

    $meses = array('', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro');
    $dias = array('Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo');

    $temp = $dias[$diaSemana] . ', ' . $dia . ' de ' . $meses[intval($mes)] . ' de ' . $ano;

    return $temp;
}

function dataExtended2($diaSemana, $data)
{
    $ano = substr($data, 0, 4);
    $mes = substr($data, 5, 2);
    $dia = substr($data, 8, 2);

    $meses = array('', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro');
    $dias = array('', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo');

    $temp = $dias[$diaSemana] . ', ' . $dia . ' de ' . $meses[intval($mes)] . ' de ' . $ano;

    return $temp;
}

function dataExtenso($data)
{
    $ano = substr($data, 0, 4);
    $mes = substr($data, 5, 2);
    $dia = substr($data, 8, 2);

    $meses = array('', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro');

    $temp = $dia . ' de ' . $meses[intval($mes)] . ' de ' . $ano;

    return $temp;
}

function ValorE($valor)
{
    $valor = ' ' . $valor;

    if ($valor == '') {
        return 0;
    }
    if (trim($valor) == ',' || trim($valor) == '.') {
        return 0;
    }

    $vpos = strrpos($valor, ',');
    if ($vpos === false) {
        return trim($valor) * 1;
    }

    $ppos = strrpos($valor, '.');
    if ($ppos === false) {
        $ppos = -1;
    }

    if ($vpos > $ppos) {
        //virgula é ponto decimal
        $temp = str_replace('.', '', $valor);
        $temp = str_replace(',', '.', $temp);
    } else {
        //ponto é ponto decimal
        $temp = str_replace(',', '', $valor);
    }
    return trim($temp) * 1;
}

function FormatValor($valor)
{

    if ($valor == '') {
        return 0;
    }
    $temp = str_replace('.', ',', $valor);

    return $temp;
}

function FormatInteiro($numero, $formato)
{
    return substr(trim($formato) . trim($numero), -1 * strlen($formato));
}

function AbreBanco($host, $user, $pass, $database = '', $new = false)
{

    $id = DB_connect($host, $user, $pass, $new);

    if ($database != '') {
        DB_select_db($database, $id);
    }

    return $id;
}

function ConsultaSQL($SSql, $ArqT)
{
    return DB_query($SSql, $ArqT);
}

function getIdConsultaSQL($SSql, $ArqT)
{
    /*
     * Executa a consulta e retorna o last_insert_id
     * Retorna 0 se deu erro
     */
    if (DB_query($SSql, $ArqT)) {
        return DB_insert_id($ArqT);
    } else {
        return 0;
    }
}

function setCombo($strCombo, $Valor)
{
    if ($strCombo == $Valor) {
        return "selected";
    } else {
        return "";
    }

}

function FillComboSQL($SSql, $ArqT, $selecionado)
{
    $Tb = ConsultaSQL($SSql, $ArqT);
    while ($row = DB_fetch_assoc($Tb)) {
        if ($selecionado == $row['codigo']) {
            $sel = " selected ";
        } else {
            $sel = "";
        }

        echo "\n<option value=\"" . $row['codigo'] . "\"" . $sel . ">" . htmlentities($row['nome']) . "</option>";
    }
    return true;
}

function PreencherSelectJSON($id, $sql)
{
    $tb = DB_query($sql, $id);
    $txt = '';

    while ($row = DB_fetch_assoc($tb)) {
        if ($txt != '') {
            $txt .= ', ';
        }

        $txt .= '{"id":"' . $row['id'] . '", "nome":"' . $row['nome'] . '"}';
    }

    $txt = '[' . $txt . ']';
    return $txt;
}

function UltimoRegistroInserido($id)
{
    return DB_insert_id($id);
}

function RegistroAnterior($ArqT, $tabela, $atual, $campoCodigo = 'codigo', $consideraDeletados = true, $criterios = '')
{
    $sql = "SELECT IFNULL(MAX(" . $campoCodigo . "), 0) FROM " . $tabela . " WHERE " . $campoCodigo . " < '" . $atual . "' ";

    if ($consideraDeletados) {
        $sql = $sql . " AND del = 0";
    }

    if ($criterios != '') {
        $sql = $sql . " AND " . $criterios;
    }

    $Tb = DB_query($sql, $ArqT);
    return DB_result($Tb, 0, 0);
}

function RegistroProximo($ArqT, $tabela, $atual, $campoCodigo = 'codigo', $consideraDeletados = true, $criterios = '')
{
    $sql = "SELECT IFNULL(MIN(" . $campoCodigo . "), 0) FROM " . $tabela . " WHERE " . $campoCodigo . " > '" . $atual . "' ";

    if ($consideraDeletados) {
        $sql = $sql . " AND del = 0";
    }

    if ($criterios != '') {
        $sql = $sql . " AND " . $criterios;
    }

    $Tb = DB_query($sql, $ArqT);
    return DB_result($Tb, 0, 0);
}

function RegistroPrimeiro($ArqT, $tabela, $campoCodigo = 'codigo', $consideraDeletados = true, $criterios = '')
{
    $sql = "SELECT IFNULL(MIN(" . $campoCodigo . "), 0) FROM " . $tabela . " WHERE TRUE ";

    if ($consideraDeletados) {
        $sql .= " AND del = 0 ";
    }

    if ($criterios != '') {
        $sql .= " AND " . $criterios;
    }

    $Tb = DB_query($sql, $ArqT);
    return DB_result($Tb, 0, 0);
}

function RegistroUltimo($ArqT, $tabela, $campoCodigo = 'codigo', $consideraDeletados = true, $criterios = '')
{
    $sql = "SELECT IFNULL(MAX(" . $campoCodigo . "), 0) FROM " . $tabela . " WHERE TRUE ";

    if ($consideraDeletados) {
        $sql .= " AND del = 0 ";
    }

    if ($criterios != '') {
        $sql .= " AND " . $criterios;
    }

    $Tb = DB_query($sql, $ArqT);
    return DB_result($Tb, 0, 0);
}

function format_bytes($size)
{
    $units = array(' B', ' KB', ' MB', ' GB', ' TB');
    for ($i = 0; $size >= 1024 && $i < 4; $i++) {
        $size /= 1024;
    }

    return round($size, 2) . $units[$i];
}

function getServerHora()
{

    $data = getdate();
    $hora = number_format_complete($data['hours'], '0', 2) . ':' . number_format_complete($data['minutes'], '0', 2) . ':' . number_format_complete($data['seconds'], '0', 2);
    return $hora;
}

function getServerData($hours)
{
    // RETORNA A DATA NO FORMATO SQL

    $data = getdate();

    $temp = $data['year'] . '-' . number_format_complete($data['mon'], '0', 2) . '-' . number_format_complete($data['mday'], '0', 2);

    if ($hours) {
        $temp .= ' ' . number_format_complete($data['hours'], '0', 2) . ':' . number_format_complete($data['minutes'], '0', 2) . ':' . number_format_complete($data['seconds'], '0', 2);
    }

    return $temp;
}

function add_date($givendate, $day = 0, $mth = 0, $yr = 0, $hour = true)
{
    $cd = strtotime($givendate);

    if ($hour) {
        $newdate = date('Y-m-d h:i:s', mktime(date('h', $cd), date('i', $cd), date('s', $cd), date('m', $cd) + $mth, date('d', $cd) + $day, date('Y', $cd) + $yr));
    } else {
        $newdate = date('Y-m-d', mktime(date('h', $cd), date('i', $cd), date('s', $cd), date('m', $cd) + $mth, date('d', $cd) + $day, date('Y', $cd) + $yr));
    }

    return $newdate;
}

function is_valid_email($email)
{

    $result = true;

    if (!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$", $email)) {

        $result = false;
    }

    return $result;
}

function FormatMoeda($valor, $casas = 2)
{
    $valor = round($valor, $casas);
    if ($valor == '') {
        return '0,00';
    }

    if ($valor < 0) {
        $neg = true;
        $valor = $valor * -1;
    } else {
        $neg = false;
    }

    $temp = str_replace('.', ',', $valor);

    if (substr($temp, strlen($temp) - 3, 1) == ',') {
        $temp;
    } elseif (substr($temp, strlen($temp) - 2, 1) == ',') {
        $temp .= '0';
    } elseif (substr($temp, strlen($temp) - 1, 1) == ',') {
        $temp .= '00';
    } else {
        $temp .= ',00';
    }

    $Total = strlen(intval($temp));
    $TotalLen = strlen(intval($temp)) / 3;
    $TotalLenX = intval(strlen(intval($temp)) / 3);
    $Texto = substr($temp, strlen($temp) - 3, 3);
    $Contar = 0;
    if ($TotalLenX > 0) {

        $vetor = str_split($temp, 1);
        for ($x = count($vetor) - 4; $x >= 0; $x--) {
            $Contar++;
            $Texto = $vetor[$x] . $Texto;

            if ($Contar == 3 && $x != 0) {
                $Contar = 0;
                $Texto = '.' . $Texto;
            }
        }
    } else {
        if ($neg) {
            return '-' . $temp;
        } else {
            return $temp;
        }

    }

    //return 'Total sem quebrados = ' . $Total . ', TotalDividido por 3 = ' . $TotalLen . ', TotalArr= ' . $TotalLenX;
    if ($neg) {
        return '-' . $Texto;
    } else {
        return $Texto;
    }

}

function FormatMoedaFull($valor)
{
    $valorDuasCasas = substr($valor, 0, strlen($valor) - 2);
    $valorResto = substr($valor, strlen($valor) - 2, 2);

    $valorDuasCasas = FormatMoeda($valorDuasCasas);

    return $valorDuasCasas . $valorResto;
}

function FormatMoeda3casas($valor)
{
    $valorDuasCasas = substr($valor, 0, strlen($valor) - 3);
    $valorResto = substr($valor, strlen($valor) - 3, 3);

    $valorDuasCasas = substr(FormatMoeda($valorDuasCasas), 0, strlen(FormatMoeda($valorDuasCasas)) - 3);

    return $valorDuasCasas . "," . $valorResto;
}

function FormatMoeda4casas($valor)
{
    $valorDuasCasas = substr($valor, 0, strlen($valor) - 4);
    $valorResto = substr($valor, strlen($valor) - 4, 4);

    $valorDuasCasas = substr(FormatMoeda($valorDuasCasas), 0, strlen(FormatMoeda($valorDuasCasas)) - 4);

    return $valorDuasCasas . "," . $valorResto;
}

function number_format_complete($valor, $caracter, $qtde, $esquerda = true)
{
    if ($esquerda) {
        return sprintf('%' . $caracter . $qtde . 's', $valor);
    } else {
        return sprintf('%' . $caracter . '-' . $qtde . 's', $valor);
    }

}

function renomeia_miniatura($filename)
{

    $aux = explode("/", $filename);
    $x = explode(".", $aux[count($aux) - 1]);
    $newname = 'mini_' . $x[0];
    $extensao = $x[1];
    $size = sizeof($aux) - 1;

    for ($i = 0; $i < $size; $i++) {
        $novoarquivo .= $aux[$i] . "/";
    }

    $novoarquivo .= $newname . "." . $extensao;
    return $novoarquivo;
}

function verifica_miniatura($filename)
{

    $aux = explode("/", $filename);
    $x = explode(".", $aux[count($aux) - 1]);
    $newname = 'mini_' . $x[0];
    $extensao = $x[1];
    $size = sizeof($aux) - 1;

    for ($i = 0; $i < $size; $i++) {
        $novoarquivo .= $aux[$i] . "/";
    }

    $novoarquivo .= $newname . "." . $extensao;

    if (file_exists($novoarquivo)) {

        return true;
    } else {
        return false;
    }
}

function Redimensionar($filename, $new_width, $new_height, $complemento, $quality = 50)
{

    $aux = explode("/", $filename);

    $x = explode(".", $aux[count($aux) - 1]);

    if ($complemento == "") {
        $newname = 'mini_' . $x[0];
    } else {
        $newname = $complemento . $x[0];
    }

    $extensao = $x[1];

    if ($extensao == "gif" || $extensao == "png" || $extensao == "bmp") {
        return;
    }

    $size = sizeof($aux) - 1;

    for ($i = 0; $i < $size; $i++) {
        $novoarquivo .= $aux[$i] . "/";
    }

    $novoarquivo .= $newname . "." . $extensao;

    #pegando as dimensoes reais da imagem, largura e altura
    list($width, $height) = getimagesize($filename);

    if ($width > $height) {
        $new_height = ($height / $width) * $new_width;
    } else {
        $new_width = ($width / $height) * $new_height;
    }

    #gerando a a miniatura da imagem
    $image_p = imagecreatetruecolor($new_width, $new_height);

    //if ($extensao == ("jpg" || "jpeg")) {
    $image = imagecreatefromjpeg($filename);
    imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    imagejpeg($image_p, $novoarquivo, $quality);
    //}

    imagedestroy($image_p);
}

function rezise_image($filename, $new_width, $new_height, $quality = 50)
{

    $aux = explode("/", $filename);

    $x = explode(".", $aux[count($aux) - 1]);

    $newname = 'mini_' . $x[0];
    $extensao = $x[1];

    if ($extensao == "gif" || $extensao == "png" || $extensao == "bmp") {
        return;
    }

    $size = sizeof($aux) - 1;

    for ($i = 0; $i < $size; $i++) {
        $novoarquivo .= $aux[$i] . "/";
    }

    $novoarquivo .= $newname . "." . $extensao;

    #pegando as dimensoes reais da imagem, largura e altura
    list($width, $height) = getimagesize($filename);

    if ($width > $height) {
        $new_height = ($height / $width) * $new_width;
    } else {
        $new_width = ($width / $height) * $new_height;
    }

    #gerando a a miniatura da imagem
    $image_p = imagecreatetruecolor($new_width, $new_height);

    //if ($extensao == ("jpg" || "jpeg")) {
    $image = imagecreatefromjpeg($filename);
    imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    imagejpeg($image_p, $novoarquivo, $quality);
    //}

    imagedestroy($image_p);
}

function get_path_miniatura($filename)
{
    $aux = explode("/", $filename);
    $x = explode(".", $aux[count($aux) - 1]);
    $newname = 'mini_' . $x[0];
    $extensao = $x[1];
    $size = sizeof($aux) - 1;

    for ($i = 0; $i < $size; $i++) {
        $novoarquivo .= $aux[$i] . "/";
    }

    $novoarquivo .= $newname . "." . $extensao;

    return $novoarquivo;
}

function get_extensao($filename)
{
    $aux = explode("/", $filename);

    $x = explode(".", $aux[count($aux) - 1]);

    return $x[1];
}

function getURLSite()
{
    $protocolo = (strpos(strtolower($_SERVER['SERVER_PROTOCOL']), 'https') === false) ? 'http' : 'https'; // PEGA O PROTOCOLO
    $host = $_SERVER['HTTP_HOST']; //NOME SERVIDOR (NOME OU IP)
    $script = $_SERVER['SCRIPT_NAME']; //CAMINHO DO ARQUIVO
    $url = explode('/', $script); //SEPARA E PEGA APENAS O DIRETORIO ONDE ESTA O SITE

    $UrlSite = $protocolo . '://' . $host . '/' . ($url[1] == '' ? '' : $url[1] . '/'); //MONTA A URL

    return $UrlSite; // RETORNA
}

function semAcentos($frase)
{

    $frase = str_replace('�', '%', $frase);
    $frase = str_replace('�', '%', $frase);
    $frase = str_replace('`', '%', $frase);
    $frase = str_replace('~', '%', $frase);
    $frase = str_replace('^', '%', $frase);
    $frase = str_replace('�', 'a', $frase);
    $frase = str_replace('�', 'a', $frase);
    $frase = str_replace('�', 'a', $frase);
    $frase = str_replace('�', 'a', $frase);
    $frase = str_replace('�', 'o', $frase);
    $frase = str_replace('�', 'o', $frase);
    $frase = str_replace('�', 'o', $frase);
    $frase = str_replace('�', 'a', $frase);
    $frase = str_replace('�', 'e', $frase);
    $frase = str_replace('�', 'e', $frase);
    $frase = str_replace('�', 'a', $frase);
    $frase = str_replace('�', 'i', $frase);
    $frase = str_replace('�', 'i', $frase);
    $frase = str_replace('�', 'u', $frase);
    $frase = str_replace('�', 'u', $frase);
    $frase = str_replace('�', 'u', $frase);
    $frase = str_replace('�', 'c', $frase);

    return strtolower($frase);
}

function getBrowser($versao = true)
{
    $useragent = $_SERVER['HTTP_USER_AGENT'];

    if (preg_match('|MSIE ([0-9].[0-9]{1,2})|', $useragent, $matched)) {
        $browser_version = $matched[1];
        $browser = 'IE';
    } elseif (preg_match('|Opera/([0-9].[0-9]{1,2})|', $useragent, $matched)) {
        $browser_version = $matched[1];
        $browser = 'Opera';
    } elseif (preg_match('|Firefox/([0-9\.]+)|', $useragent, $matched)) {
        $browser_version = $matched[1];
        $browser = 'Firefox';
    } elseif (preg_match('|Chrome/([0-9\.]+)|', $useragent, $matched)) {
        $browser_version = $matched[1];
        $browser = 'Chrome';
    } elseif (preg_match('|Safari/([0-9\.]+)|', $useragent, $matched)) {
        $browser_version = $matched[1];
        $browser = 'Safari';
    } else {
        // browser not recognized!
        $browser_version = 0;
        $browser = 'Outros [' . $useragent . ']';
    }
    return $browser . ($versao ? ' ' . $browser_version : '');
}

function valorPorExtenso($valor = 0, $complemento = true)
{

    $singular = array("centavo", "real", "mil", "milhão", "bilhão", "trilhão", "quatrilhão");
    $plural = array("centavos", "reais", "mil", "milhões", "bilhões", "trilhões", "quatrilhões");

    $c = array("", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos");
    $d = array("", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa");
    $d10 = array("dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove");
    $u = array("", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove");

    $z = 0;

    $valor = number_format($valor, 2, ".", ".");
    $inteiro = explode(".", $valor);
    for ($i = 0; $i < count($inteiro); $i++) {
        for ($ii = strlen($inteiro[$i]); $ii < 3; $ii++) {
            $inteiro[$i] = "0" . $inteiro[$i];
        }
    }

    // $fim identifica onde que deve se dar junÃ§Ã£o de centenas por "e" ou por "," ;)
    $fim = count($inteiro) - ($inteiro[count($inteiro) - 1] > 0 ? 1 : 2);
    for ($i = 0; $i < count($inteiro); $i++) {
        $valor = $inteiro[$i];
        $rc = (($valor > 100) && ($valor < 200)) ? "cento" : $c[$valor[0]];
        $rd = ($valor[1] < 2) ? "" : $d[$valor[1]];
        $ru = ($valor > 0) ? (($valor[1] == 1) ? $d10[$valor[2]] : $u[$valor[2]]) : "";

        $r = $rc . (($rc && ($rd || $ru)) ? " e " : "") . $rd . (($rd && $ru) ? " e " : "") . $ru;
        $t = count($inteiro) - 1 - $i;
        if ($complemento == true) {
            $r .= $r ? " " . ($valor > 1 ? $plural[$t] : $singular[$t]) : "";
            if ($valor == "000") {
                $z++;
            } elseif ($z > 0) {
                $z--;
            }

            if (($t == 1) && ($z > 0) && ($inteiro[0] > 0)) {
                $r .= (($z > 1) ? " de " : "") . $plural[$t];
            }

        }
        if ($r) {
            $rt = $rt . ((($i > 0) && ($i <= $fim) && ($inteiro[0] > 0) && ($z < 1)) ? (($i < $fim) ? ", " : " e ") : " ") . $r;
        }

    }

    return ($rt ? $rt : "zero");
}

function getBoleanSQL($sql, $ArqT)
{
    $Tb = ConsultaSQL($sql, $ArqT);
    if (DB_num_rows($Tb) > 0) {
        return DB_result($Tb, 0, 0);
    } else {
        return false;
    }

}

function concatenarStrings($array, $separador, $norape = false)
{
    $temp = "";
    foreach ($array as $item) {
        if ($item !== "") {
            $temp .= ($temp == "" ? "" : $separador) . ($norape ? "<span style='white-space:nowrap'>" : "") . $item . ($norape ? "</span>" : "");
        }
    }

    return $temp;
}

function truncate($valor, $decimais = 2)
{
    return floor($valor * pow(10, $decimais)) / pow(10, $decimais);
}

function tirarAcentos($string)
{
    return preg_replace(array("/(á|à|ã|â|ä)/", "/(Á|À|Ã|Â|Ä)/", "/(é|è|ê|ë)/", "/(É|È|Ê|Ë)/", "/(í|ì|î|ï)/", "/(Í|Ì|Î|Ï)/", "/(ó|ò|õ|ô|ö)/", "/(Ó|Ò|Õ|Ô|Ö)/", "/(ú|ù|û|ü)/", "/(Ú|Ù|Û|Ü)/", "/(ñ)/", "/(Ñ)/"), explode(" ", "a A e E i I o O u U n N"), $string);
}

function corrigirData($data)
{

    if (strpos($data, '/')) {
        $vetor = explode("/", $data);
        $d = $vetor[0];
        $m = $vetor[1];
        $y = $vetor[2];
    } else {
        $vetor = explode("-", $data);
        $d = $vetor[2];
        $m = $vetor[1];
        $y = $vetor[0];
    }

    if (strlen($y) == 2) {
        if ($y > 29) {
            $y = '19' . $y;
        } else {
            $y = '20' . $y;
        }

    }

    if ($y <= 0 || $m <= 0 || $m > 12 || count($vetor) !== 3) {
        return '0000-00-00';
    }

    if (checkdate($m, $d, $y)) {
        return number_format_complete($y, "0", 4) . "-" . number_format_complete($m, "0", 2) . "-" . number_format_complete($d, "0", 2);
    } else {
        return corrigirData($y . "-" . $m . "-" . number_format_complete($d - 1, "0", 2));
    }
}

function DB_query($sql, $ArqT)
{
    return mysqli_query($ArqT, $sql);
    //return mysql_query($sql, $ArqT);
}
function DB_num_rows($Tb)
{
    return mysqli_num_rows($Tb);
    //return mysql_num_rows($Tb);
}
function DB_close($ArqT)
{
    return mysqli_close($ArqT);
    //return mysql_close($ArqT);
}
function DB_result($Tb, $row, $field = 0)
{
    $Tb->data_seek($row);
    $datarow = $Tb->fetch_array();
    return $datarow[$field];
    //return mysql_result($Tb, $row, $field);
}
function DB_fetch_assoc($Tb)
{
    return mysqli_fetch_assoc($Tb);
    //return mysql_fetch_assoc($Tb);
}
function DB_affected_rows($ArqT)
{
    return mysqli_affected_rows($ArqT);
    //return mysql_affected_rows($ArqT);
}
function DB_fetch_array($Tb)
{
    return mysqli_fetch_array($Tb);
    //return mysql_fetch_array($Tb);
}

function DB_Connect($server, $username, $password, $new_link = false)
{
    return mysqli_connect($server, $username, $password);
    //return mysql_connect($server, $username, $password, $new_link);
}
function DB_select_db($banco, $ArqT)
{
    return mysqli_select_db($ArqT, $banco);
    //return mysql_select_db($banco, $ArqT);
}
function DB_selectdb($banco, $ArqT)
{
    return DB_select_db($banco, $ArqT);
}
function DB_real_escape_string($string, $ArqT = '')
{
    return mysqli_real_escape_string($ArqT, $string);
    //return mysql_real_escape_string($string, $ArqT);
}
function DB_insert_id($ArqT)
{
    return mysqli_insert_id($ArqT);
    //return mysql_insert_id($ArqT);
}
function DB_set_charset($charset, $ArqT)
{
    return mysqli_set_charset($ArqT, $charset);
    //return mysql_set_charset($charset, $ArqT);
}
function DB_fetch_row($Tb)
{
    return mysqli_fetch_row($Tb);
    //return mysql_fetch_row($Tb);
}
