var pageBack = "lib/php/index.php";
var contadorCarregando = 0;
var map;

window.onload = function () {
    callback = function(status){
        if(status){
            Pesquisar();
        }
    };
    
    VerificarServidor(callback);    
};

function ajustaAlturaTabela() {
    Selector.$('tabela').style.height = ((document.documentElement.clientHeight - Selector.$('barraTopo').clientHeight) - 40) + "px";
}

function novoUsuario() {
    promptUsuario(0);
}

function editarUsuario(idUsuario) {
    promptUsuario(idUsuario);
}

function promptUsuario(idUsuario) {
    let div = criarDiv('promptUsuario');

    div.innerHTML = '<div class="divbrancaTitulo">Cadastro de Usuário</div>';

    div.innerHTML += '<div class="divcontainer" style="max-width:400px"> ' +
            '<label>Nome do Usuário<span style="color:red"> *</span></label>' +
            '<input placeHolder="Ex.: Jhon" type="text" id="usuario_nome" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:255px"> ' +
            '<label>Username<span style="color:red"> *</span></label>' +
            '<input placeHolder="Ex.: jhon" type="text" id="usuario_username" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:260px"> ' +
            '<label>E-mail<span style="color:red"> *</span></label>' +
            '<input placeHolder="Ex.: jhon@exemple.com" type="text" id="usuario_email" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:150px"> ' +
            '<label>Telefone</label>' +
            '<input placeHolder="Ex.: 1-999-988-8777" type="text" id="usuario_telefone" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:240px"> ' +
            '<label>Website</label>' +
            '<input placeHolder="https://jhon.com" type="text" id="usuario_site" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<hr />';

    div.innerHTML += '<div class="divcontainer" style="max-width:80px"> ' +
            '<label>CEP</label>' +
            '<input placeHolder="Zipcode" type="text" id="usuario_cep" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:195px"> ' +
            '<label>Rua</label>' +
            '<input placeHolder="Street" type="text" id="usuario_rua" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:70px"> ' +
            '<label>Nº/Compl.</label>' +
            '<input placeHolder="Suite" type="text" id="usuario_numero" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:125px"> ' +
            '<label>Cidade</label>' +
            '<input placeHolder="City" type="text" id="usuario_cidade" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:85px"> ' +
            '<label>Latitude</label>' +
            '<input placeHolder="-71.4197" type="text" id="usuario_latitude" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:85px"> ' +
            '<label>Longitude</label>' +
            '<input placeHolder="-71.4197" type="text" id="usuario_longitude" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<hr />';

    div.innerHTML += '<div class="divcontainer" style="max-width:220px"> ' +
            '<label>Nome da empresa<span style="color:red"> *</span></label>' +
            '<input placeHolder="Company Name" type="text" id="usuario_empresa" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:220px"> ' +
            '<label>Slogan</label>' +
            '<input placeHolder="catchphrase" type="text" id="usuario_slogan" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:210px"> ' +
            '<label>Atuação</label>' +
            '<input placeHolder="e-enable innovative applications" type="text" id="usuario_bs" style="max-width:100%;" class="textbox_cinzafoco" /></div> ';

    div.innerHTML += '<div class="divcontainer" style="max-width:100%; margin-top:7px;" align="right"><input type="button" class="botaoverdesuave_prompt" onclick="salvarUsuario(' + idUsuario + ')" value="Salvar" style="margin-right:7px;"  /></div>';

    dialogoUsuario = new caixaDialogoResponsiva('promptUsuario', 370, 700, 'lib/util/', 0);
    dialogoUsuario.Show();

    if (idUsuario > 0) {
        mostraUsuario(idUsuario);
    } else {
        sel('usuario_nome').focus();
    }
}

function excluirUsuario(idUsuario, nomeUsuario) {
    criaDiv('promptExcluir');
    mensagemExcluir = new DialogoMensagens("promptExcluir", 130, 380, 170, "1", "Confirmação", "Deseja excluir o usuário " + nomeUsuario + "?", "SIM", "excluirUsuarioCall(" + idUsuario + ")", true, "");
    mensagemExcluir.Show();
}

function excluirUsuarioCall(idUsuario){
    callbacksucesso = function (ret) {
        if (!ret.retorno) {
            callbackfalha();
        }

        let json = ret.retorno;
        mensagemExcluir.Close();
        Pesquisar();     
    };

    callbackfalha = function () {
        mensagemExcluir.Close();
        
        criaDiv('promptAviso');
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "1", "Atenção!", "Problemas ao excluir o usuário. Tente novamente", "OK", "", false, "");
        mensagemAviso.Show();               
    };

    ajaxPadrao(pageBack, 'delUser', 'idUser=' + idUsuario, callbacksucesso, callbackfalha, true);
}

function mostraUsuario(idUsuario) {
    callbacksucesso = function (ret) {
        if (!ret.retorno) {
            callbackfalha();
        }

        let json = ret.retorno[0];

        sel('usuario_nome').value = json.name;
        sel('usuario_username').value = json.username;
        sel('usuario_email').value = json.email;
        sel('usuario_telefone').value = json.phone;
        sel('usuario_site').value = json.website;
        
        sel('usuario_cep').value = json.address.zipcode;
        sel('usuario_rua').value = json.address.street;
        sel('usuario_numero').value = json.address.suite;
        sel('usuario_cidade').value = json.address.city;
        sel('usuario_latitude').value = json.address.geo.lat;
        sel('usuario_longitude').value = json.address.geo.lng;
        
        sel('usuario_empresa').value = json.company.name;        
        sel('usuario_slogan').value = json.company.catchPhrase;
        sel('usuario_bs').value = json.company.bs;
        
    };

    callbackfalha = function () {
        criaDiv('promptAviso');
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "1", "Atenção!", "Problemas ao excluir o usuário. Tente novamente", "OK", "", false, "");
        mensagemAviso.Show();
    };

    ajaxPadrao(pageBack, 'getUser', 'idUser=' + idUsuario, callbacksucesso, callbackfalha, true);
}

function salvarUsuario(idUsuario) {
    if (!verificarUsuario()) {
        return;
    }

    let user = new Object();

    user.idUser = idUsuario;
    user.name = sel('usuario_nome').value;
    user.username = sel('usuario_username').value;
    user.email = sel('usuario_email').value;
    user.phone = sel('usuario_telefone').value;
    user.website = sel('usuario_site').value;

    let address = new Object();    
    address.zipcode = sel('usuario_cep').value;
    address.street = sel('usuario_rua').value;
    address.suite = sel('usuario_numero').value;
    address.city = sel('usuario_cidade').value;
    
    let geo = new Object();
    geo.lat = sel('usuario_latitude').value;
    geo.lng = sel('usuario_longitude').value;
    
    address.geo = geo;    
    user.address = address;
    
    let company = new Object();    
    company.name = sel('usuario_empresa').value;
    company.catchPhrase = sel('usuario_slogan').value;
    company.bs = sel('usuario_bs').value;
    user.company = company;

    callbacksucesso = function (ret) {        
        if (!ret.retorno) {            
            callbackfalha(ret);
        }
        
        criaDiv('promptAviso');
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "3", "Atenção!", 'Usuário gravado com sucesso', "OK", "", false, "");
        mensagemAviso.Show();

        dialogoUsuario.Close();
        Pesquisar();
    };

    callbackfalha = function (ret) {
        let msg = ret.retorno;
        criaDiv('promptAviso');
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "1", "Atenção!", msg, "OK", "", false, "");
        mensagemAviso.Show();
        return;
    };

    ajaxPadrao(pageBack, 'setUser', 'dados=' + JSON.stringify(user), callbacksucesso, callbackfalha, true);
}

function verificarUsuario() {
    criaDiv('promptAviso');

    if (sel('usuario_nome').value.trim() == '') {
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "1", "Atenção!", "Por favor, informe o nome do usuário", "OK", "", false, "usuario_nome");
        mensagemAviso.Show();
        return false;
    }

    if (sel('usuario_username').value.trim() == '') {
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "1", "Atenção!", "Por favor, informe o username", "OK", "", false, "usuario_username");
        mensagemAviso.Show();
        return false;
    }

    if (sel('usuario_email').value.trim() == '') {
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "1", "Atenção!", "Por favor, informe o e-mail", "OK", "", false, "usuario_email");
        mensagemAviso.Show();
        return false;
    }

    return true;
}

function Pesquisar() {
    let tabela = Selector.$('tabela');
    tabela.innerHTML = '';

    callbacksucesso = function (ret) {
        
        if (!ret.retorno) {
            callbackfalha();
        }

        tabela.setAttribute('style', 'overflow:auto;');
        ajustaAlturaTabela();

        let json = ret.retorno;

        table = new Table('grid');
        table.table.setAttribute('class', 'tabela_mobly');
        table.table.setAttribute('cellpadding', '5');
        table.table.setAttribute('cellspacing', '1');

        table.addHeader([
            DOM.newText('ID'),
            DOM.newText('Usuário'),
            DOM.newText('Contato'),
            DOM.newText('Endereço'),
            DOM.newText('Empresa'),
            DOM.newText('Posts'),
            DOM.newText('Ações')
        ]);

        tabela.appendChild(table.table);

        tableTotais = new Table('gridTotais');
        tableTotais.table.setAttribute('class', 'tabela_mobly_totais');
        tableTotais.table.setAttribute('style', 'width:300px;');
        tableTotais.table.setAttribute('cellpadding', '5');
        tableTotais.table.setAttribute('cellspacing', '1');

        tableTotais.addRow([
            DOM.newText('Total de Usuários'),
            DOM.newText(json.length)
        ]);

        tabela.appendChild(tableTotais.table);
        tableTotais.getCell(tableTotais.getRowCount() - 1, 1).setAttribute('style', 'text-align:center; width:50px;');

        let usuario, contato, endereco, empresa, posts, acoes;

        for (let i = 0; i < json.length; i++) {
            usuario = DOM.newElement('div');
            usuario.setAttribute('style', 'font-size:12px');
            usuario.setAttribute('idUser', json[i].idUser);
            usuario.innerHTML = '<label>Nome: ' + json[i].name + '</label><br />';
            usuario.innerHTML += '<label>Username: ' + json[i].username + '</label>';

            contato = DOM.newElement('div');
            contato.innerHTML = '<label>E-mail: ' + json[i].email + '</label><br />';
            contato.innerHTML += '<label>Telefone: ' + json[i].phone + '</label><br />';
            contato.innerHTML += '<label>Website: ' + json[i].website + '</label>';

            endereco = DOM.newElement('div');           
            endereco.innerHTML = '<label>Endereço: ' + json[i].address.street + ', ' + json[i].address.suite + '</label><br />';
            endereco.innerHTML += '<label>Cidade: ' + json[i].address.city + '</label><br />';
            endereco.innerHTML += '<label>CEP: ' + json[i].address.zipcode + ' - Latitude/Longitude: <a title="Visualizar no Google Maps" style="text-decoration:underline; cursor:pointer" onclick="abrirMapa(\'' + json[i].address.geo.lat + '\', \'' + json[i].address.geo.lng + '\')">' + json[i].address.geo.lat + ', ' + json[i].address.geo.lng + '<a/></label><br />';           

            empresa = DOM.newElement('div');            
            empresa.innerHTML = '<label>Empresa: ' + json[i].company.name + '</label><br />';
            empresa.innerHTML += '<label>Slogan: ' + json[i].company.catchPhrase + '</label><br />';
            empresa.innerHTML += '<label>BS: ' + json[i].company.bs + '</label><br />';            
            
            posts = DOM.newElement('div');
            posts.setAttribute('class', 'divcontainer');
            posts.setAttribute('style', 'text-align:center');
            posts.innerHTML = '<img src="lib/imagens/lupa.png" title="Visualizar posts do usuário" style="cursor: pointer; width: 24px;" onclick="visualizarPostsUsuario(' + json[i].iduser + ', \'' + json[i].name + '\');">';

            acoes = DOM.newElement('div');
            acoes.setAttribute('class', 'divcontainer');
            acoes.setAttribute('style', 'text-align:center');
            acoes.innerHTML = '<img src="lib/imagens/circulo-editar.png" title="Editar Usuário" style="cursor: pointer; width: 26px;" onclick="editarUsuario(' + json[i].iduser + ');">';
            acoes.innerHTML += '<img src="lib/imagens/circulo-cancelar.png" title="Excluir Usuário" style="cursor: pointer; width: 26px; margin-left:5px" onclick="excluirUsuario(' + json[i].iduser + ', \'' + json[i].name + '\');">';

            table.addRow([
                DOM.newText(json[i].coduser),
                usuario,
                contato,
                endereco,
                empresa,
                posts,
                acoes
            ]);

            table.getCell(table.getRowCount() - 1, 0).setAttribute('style', 'text-align:center;');
        }

        pintaLinhaGrid(table);
    };

    callbackfalha = function () {
        tabela.setAttribute('style', 'text-align:center; margin-top:70px');
        tabela.innerHTML = "<div class='h2_titulo'>Nenhum usuário encontrado <a onclick='novoUsuario()' style='font-size:12px; cursor:pointer'>(+ Adicionar)<a/></div>";
    };

    ajaxPadrao(pageBack, 'Pesquisar', '', callbacksucesso, callbackfalha, true);
}

function abrirMapa(lat, long){    
    let div = criarDiv('promptMapa');
    div.innerHTML = '<div id="map"></div>';
    
    dialogoMapa = new caixaDialogoResponsiva('promptMapa', 540, 540, 'lib/util/', 0);
    dialogoMapa.Show();
    
    map = new google.maps.Map(document.getElementById('map'), {
          center: {
              lat: parseFloat(lat), 
              lng: parseFloat(long)},
          zoom: 16
        });
}

function visualizarPostsUsuario(idUsuario, nomeUsuario){
    let div = criarDiv('promptPosts');
    div.innerHTML = '<div id="divPosts"></div>';
    
    dialogoPosts = new caixaDialogoResponsiva('promptPosts', 420, 650, 'lib/util/', 0);
    dialogoPosts.Show();
    
    callbacksucesso = function (ret) {        
        if (!ret.retorno) {
            callbackfalha();
        }

        div.setAttribute('style', 'overflow:auto; text-align:center; height:400px');   
        div.innerHTML = "<div class='h2_titulo'>Posts do usuário " + nomeUsuario + "</div>";

        let json = ret.retorno;

        tablePosts = new Table('gridPosts');
        tablePosts.table.setAttribute('class', 'tabela_mobly');
        tablePosts.table.setAttribute('cellpadding', '5');
        tablePosts.table.setAttribute('cellspacing', '1');
        tablePosts.table.setAttribute('style', 'margin-top:4px');

        tablePosts.addHeader([
            DOM.newText('ID'),
            DOM.newText('Título'),
            DOM.newText('Post')
        ]);

        div.appendChild(tablePosts.table);                

        for (let i = 0; i < json.length; i++) {
            tablePosts.addRow([
                DOM.newText(json[i].codpost),
                DOM.newText(json[i].title),
                DOM.newText(json[i].body),
            ]);

            tablePosts.getCell(tablePosts.getRowCount() - 1, 0).setAttribute('style', 'text-align:center;');
            tablePosts.getCell(tablePosts.getRowCount() - 1, 1).setAttribute('style', 'text-align:left;');
            tablePosts.getCell(tablePosts.getRowCount() - 1, 2).setAttribute('style', 'text-align:left;');
        }

        pintaLinhaGrid(tablePosts);
    };

    callbackfalha = function () {
        div.setAttribute('style', 'text-align:center;');
        div.innerHTML = "<div class='h2_titulo'>Nenhum post encontrado para o usuário " + nomeUsuario + "</div>";
    };

    ajaxPadrao(pageBack, 'getUserPosts', 'idUser=' + idUsuario, callbacksucesso, callbackfalha, true);
}

function VerificarServidor(callback){
    callbacksucesso = function (ret) {        
        if (!ret.status) {
            callbackfalha();
        }        
        
        callback(true);
    };

    callbackfalha = function (ret) {        
        criaDiv('promptAviso');
        mensagemAviso = new DialogoMensagens("promptAviso", 130, 380, 170, "1", "Atenção!", ret.retorno, "OK", "", false, "");
        mensagemAviso.Show();
        
        callback(false);;
    };

    ajaxPadrao(pageBack, 'verificarServidor', '', callbacksucesso, callbackfalha, true);
}

//MÉTODOS AUXILIARES
function pintaLinhaGrid(grid) {

    var cor = true;
    for (var i = 0; i <= grid.getRowCount() - 1; i++) {
        cor = !cor;
        grid.getRow(i).setAttribute('class', 'pintaFundo' + (cor ? 1 : 2));
    }
}

function criarDiv(id) {

    var achou = false;

    var as = document.getElementsByTagName('div');
    for (var i = 0; i < as.length; i++) {
        if (as[i].id === id) {
            achou = true;
            break;
        }
    }

    if (!achou) {

        var achou = false;
        var linksDinamicos = document.getElementsByTagName("style");
        for (var i = 0; i < linksDinamicos.length; i++) {
            if (linksDinamicos[i].innerHTML.indexOf('#divBlock' + id) >= 0) {
                document.head.removeChild(linksDinamicos[i]);
                break;
            }
        }

        document.body.appendChild(DOM.newElement('div', id));

    }

    return sel(id);

}

function criaDiv(id) {
    criarDiv(id);
}

function sel(el) {
    return Selector.$(el);
}

/**
 * Exibe ou oculta uma tela de carregamento sobre a tela atual.
 * @param {boolean} mostrar - Especifica se a tela de carregamento deve ser mostrada ou ocultada
 * @param {string|Node|boolean} conteudo - Texto ou elemento a ser exibido na tela de carregamento, ou booleano para exibir uma animação padrão
 * @param {string} fundoRGBA - Cor e opacidade de fundo da tela de carregamento, no padrão R,G,B,A
 */
function carregandoPadrao(mostrar = true, conteudo = false, fundoRGBA = '255,255,255,0.7') {
    let divCarregando = Selector.$('carregando');
    if (!divCarregando && mostrar) {
        divCarregando = criarDiv('carregando');
        divCarregando.setAttribute('style', 'display:table;height:100%;width:100%;left:0;top:0;overflow:hidden;position:fixed;background-color:rgba(' + fundoRGBA + ');z-index:999;text-align:center;cursor:wait;');

        let divConteudo = criarDiv('carregandoConteudo');
        divConteudo.setAttribute('style', 'display:table-cell;vertical-align:middle;');

        divCarregando.appendChild(divConteudo);

        if (typeof conteudo == 'string') {
            divConteudo.innerHTML = conteudo;
        } else {
            if (typeof conteudo != 'object') {
                let animacao = criarDiv('animacao');
                animacao.setAttribute('style', 'border:12px solid #ccc;border-radius:50%;border-top: 12px solid #0063b1;width:150px;height:150px;-webkit-animation:spin 2s linear infinite;animation:spin 1.7s linear infinite;left: 50%;top: 50%;position: absolute;margin-top: -87px;margin-left: -87px;');
                divConteudo.appendChild(animacao);

                conteudo = criarDiv('conteudo');
                conteudo.setAttribute('class', 'divcontainer');
                conteudo.setAttribute('style', 'margin-top:250px;font-size:20px;font-weight:normal;');
                conteudo.textContent = 'Por favor, aguarde...';
            }
            divConteudo.appendChild(conteudo);
        }
    } else if (divCarregando && !mostrar) {
        divCarregando.remove();
}
}

/**
 * Incrementa ou decrementa o contador de funções em carregamento, exibindo uma tela de carregamento sobre a tela atual caso haja alguma ou a ocultando caso não haja nenhuma.
 * @param {int} mais - Valor a incrementar no contador de funções em carregamento, ou negativo para decrementar
 * @param {string|Node|boolean} conteudo - Texto ou elemento a ser exibido na tela de carregamento, ou booleano para exibir uma animação padrão
 * @param {string} fundoRGBA - Cor e opacidade de fundo da tela de carregamento, no padrão R,G,B,A
 */
function carregarPadrao(mais = 1, conteudo = false, fundoRGBA = '255,255,255,0.7') {
    contadorCarregando += mais;
    if (contadorCarregando < 0) {
        contadorCarregando = 0;
    }
    carregandoPadrao((contadorCarregando > 0), conteudo, fundoRGBA);
}

/**
 * Envia uma requisição XMLHttpRequest assíncrona e recebe sua resposta.
 * @param {string} pagina - Caminho do arquivo que deverá receber a requisição
 * @param {string} action - Nome da função a ser executada pelo arquivo
 * @param {FormData} dados - Objeto FormData com os dados a enviar para o arquivo
 * @param {function|boolean} callbackSucesso - Função a ser chamada em caso de sucesso da requisição, ou FALSE para nenhuma função
 * @param {function|boolean} callbackFalha - Função a ser chamada em caso de falha da requisição, ou FALSE para apenas exibir mensagem com o erro
 * @param {boolean} carregamento - Especifica se a tela atual deve ser bloqueada por uma tela de carregamento enquanto a requisição estiver sendo processada
 */
function ajaxPadrao(pagina, action, dados, callbackSucesso = false, callbackFalha = false, carregamento = true) {
    let ajax = new Ajax('POST', pagina, true);

    ajax.ajax.onreadystatechange = function () {

        if (!ajax.isStateOK()) {
            return;
        }

        let json;
        let falha = true;       
        
        if (ajax.getResponseText() != '') {
            json = JSON.parse(ajax.getResponseText());

            if (typeof json == 'object') {
                if (json.status == 1) {
                    falha = false;
                }
            } else {
                falha = false;
            }
        }

        if (falha) {
            if (typeof callbackFalha == 'function') {
                callbackFalha(json);
            } else if (typeof json == 'object') {
                mensagemAviso = new DialogoMensagens('promptAviso', 130, 380, 170, (json.cor ? json.cor : '1'), (json.titulo ? json.titulo : 'Atenção!'), json.msg, (json.botao ? json.botao : 'OK'));
                mensagemAviso.Show();
            } else {
                console.error('Erro em ' + action + '! Resposta: ' + ajax.getResponseText());
            }
        } else if (typeof callbackSucesso == 'function') {
            callbackSucesso(json);
        }

        if (carregamento) {
            carregarPadrao(-1);
        }
    };

    if (carregamento) {
        carregarPadrao();
    }

    ajax.Request('action=' + action + '&' + dados);
}



