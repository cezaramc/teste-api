/*
 * String
 * Number
 * Date
 * Selector
 * Screen
 * Point
 * Tab
 * MenuBar
 * Menu
 * DOM
 * DragDrop
 * Dialog
 * Ajax
 * Server
 * Select
 * Mask
 * Table
 * Window
 * Cookies
 */

/****************************************************************** // String // ******************************************************************/

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
}

String.prototype.encodeText = function () {
    return encodeURIComponent(this.toString().trim());
}

String.prototype.decodeText = function () {
    return decodeURIComponent(this);
}

String.prototype.ltrim = function () {
    return this.replace(/^\s+/, '');
}

String.prototype.rtrim = function () {
    return this.replace(/\s+$/, '');
}

String.dump = function (arr, level) {
    var dumped_text = "";
    if (!level)
        level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    for (var j = 0; j < level + 1; j++)
        level_padding += "    ";

    if (typeof (arr) == 'object') { //Array/Hashes/Objects
        for (var item in arr) {
            var value = arr[item];

            if (typeof (value) == 'object') { //If it is an array,
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value, level + 1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
    }
    return dumped_text;
};

String.validateEmail = function (email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

String.formatCPF = function (strCPF) {
    strCPF = strCPF.replace(/\D/g, "");                //Remove tudo o que não é dígito
    strCPF = strCPF.replace(/(\d{3})(\d)/, "$1.$2");    //Coloca ponto entre o terceiro e o quarto dígitos
    strCPF = strCPF.replace(/(\d{3})(\d)/, "$1.$2");    //Coloca ponto entre o setimo e o oitava dígitos
    strCPF = strCPF.replace(/(\d{3})(\d)/, "$1-$2");   //Coloca ponto entre o decimoprimeiro e o decimosegundo dígitos
    return strCPF;
};

String.formatCNPJ = function (strCNPJ) {

    strCNPJ = strCNPJ.replace(/\D/g, "");
    strCNPJ = strCNPJ.replace(/^(\d{2})(\d)/, "$1.$2");//Coloca ponto entre o segundo e o terceiro dígitos
    strCNPJ = strCNPJ.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");//Coloca ponto entre o quinto e o sexto dígitos
    strCNPJ = strCNPJ.replace(/\.(\d{3})(\d)/, ".$1/$2");//Coloca uma barra entre o oitavo e o nono dígitos
    strCNPJ = strCNPJ.replace(/(\d{4})(\d)/, "$1-$2");//Coloca um hífen depois do bloco de quatro dígitos
    return strCNPJ;
};

String.prototype.escapeUC = function () {
    return this.replace(/\n/g, "\\u000a")
        .replace(/\'/g, "\\u0027")
        //.replace(/\"/g, '\\u0022"')
        .replace(/\&/g, "\\u0026")
        .replace(/\r/g, "\\u000d")
        .replace(/\t/g, "\\u0009")
        .replace(/\\b/g, "\\b")
        .replace(/\f/g, "\\u000c");
};

/****************************************************************** // Number // ******************************************************************/

Number.isNumber = function (text) {
    if (text.trim() === '' || isNaN(Number.getFloat(text).toString()) || Number.Filter(text, '.,') === '')
        return false;

    return true;
}

Number.Show = function (number) {
    var valor;

    if (typeof (number) == 'number')
        valor = number;
    else
        valor = Number.getFloat(number);

    if (valor === 0)
        return '0,00';

    var temp = new String(valor);

    if (temp.indexOf(".") < 0) {
        temp += ".00";
    } else {
        var pos = temp.length - temp.indexOf(".");

        if (pos != 3) {
            temp += '0';
        }
    }

    temp = temp.substr(0, temp.length - 3) + ',' + temp.substr(temp.length - 2, temp.length - 1);
    return temp;
}

Number.parseFloatOriginal = function (texto) {
    if (Number.Filter(texto, '') === '')
        return 0.0;

    texto = texto.toString().replace('.', '');

    texto = texto.replace();

    var temp = Number.Filter(texto, ",.");

    var found = false;
    var numero = '';

    for (var i = temp.length - 1; i >= 0; i--)
        if ((temp[i] === '.' || temp[i] === ',') && !found) {
            found = true;
            numero = '.' + numero;
        } else {
            numero = temp[i] + numero;
        }

    return parseFloat(numero);
}


Number.parseFloat = function (texto) {
    if (Number.Filter(texto, '') === '')
        return 0.0;

    texto = texto.toString().replace('.', '').trim();

    texto = texto.replace();

    var temp = Number.Filter(texto, ",. ");

    temp = temp.replace(/ /g, '0');

    var found = false;
    var numero = '';


    for (var i = temp.length - 1; i >= 0; i--)
        if ((temp[i] === '.' || temp[i] === ',') && !found) {
            found = true;
            numero = '.' + numero;
        } else {
            numero = temp[i] + numero;
        }


    return parseFloat(numero);
}


Number.parseFloatSign = function (texto) {
    if (Number.Filter(texto, '') === '')
        return 0.0;

    var negativo = (texto.toString().indexOf('-') >= 0 ? true : false);

    texto = texto.toString().replace('.', '').trim();

    texto = texto.replace();

    var temp = Number.Filter(texto, ",. ");

    temp = temp.replace(/ /g, '0');

    var found = false;
    var numero = '';


    for (var i = temp.length - 1; i >= 0; i--)
        if ((temp[i] === '.' || temp[i] === ',') && !found) {
            found = true;
            numero = '.' + numero;
        } else {
            numero = temp[i] + numero;
        }


    return (negativo ? parseFloat(numero) * -1 : parseFloat(numero));
}


Number.getFloat = function (texto) {
    if (Number.Filter(texto, '') === '')
        return 0.0;

    var temp = Number.Filter(texto, ",.");

    var found = false;
    var numero = '';

    for (var i = temp.length - 1; i >= 0; i--)
        if ((temp[i] === '.' || temp[i] === ',') && !found) {
            found = true;
            numero = '.' + numero;
        } else {
            numero = temp[i] + numero;
        }

    return parseFloat(numero);
}



Number.FormatDinheiro4casas = function (valor) {

    try {
        valor = valor.toFixed(4);
    } catch (e) {
        try {
            valor = parseFloat(valor).toFixed(4);
        } catch (e) {

        }
    }

    var negativo = false;
    if (valor.indexOf("-") == 0) {
        negativo = true;
    }

    var teste = valor.toString().split('.');

    if (teste.length === 1) {
        valor += '.0000';
    } else {
        if (teste[1].length < 4) {
            for (var i = teste[1].length; i <= 4; i++)
                valor += '0';
        }
    }

    if (negativo)
        valor = valor.toString().replace('-', '').replace('.', '');
    else
        valor = valor.toString().replace('.', '');

    var tmp = valor + '';
    tmp = tmp.replace(/([0-9]{4})$/g, ",$1");

    if (tmp.length > 8)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{4}$)/g, ".$1,$2");

    if (negativo)
        return "-" + tmp;
    else
        return tmp;

};

Number.FormatDinheiro = function (valor) {

    try {
        valor = valor.toFixed(2);
    } catch (e) {

    }

    var negativo = false;
    if (valor.indexOf("-") == 0) {
        negativo = true;
    }

    var teste = valor.toString().split('.');

    if (teste.length === 1) {
        valor += '.00';
    } else {
        if (teste[1].length < 2) {
            valor += '0';
        }
    }

    if (negativo)
        valor = valor.toString().replace('-', '').replace('.', '');
    else
        valor = valor.toString().replace('.', '');

    var tmp = valor + '';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");

    if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    if (negativo)
        return "-" + tmp;
    else
        return tmp;

};

Number.FormatValor = function (valor, casas) {
    casas = arguments.length > 1 ? arguments[1] : 2;
    return valor.toFixed(casas).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");

};

Number.Filter = function (text, others) {
    var numeros = "12334567890";

    if (others)
        numeros += others;

    var temp = '';

    for (var i = 0; i < text.length; i++)
        if (numeros.indexOf(text[i]) >= 0)
            temp += text[i];

    return temp;
}

Number.Arredonda = function (valor, casas) {
    var novo = Math.round(valor * Math.pow(10, casas)) / Math.pow(10, casas);

    return novo;
}

Number.Complete = function (valor, quantidade, caracter, esquerda) {

    if (valor.toString().length >= quantidade) {
        return valor;
    }

    var total = parseInt(quantidade) - parseInt(valor.toString().length);

    var resto = "";
    for (var x = 1; x <= total; x++) {
        resto += caracter;
    }

    if (esquerda) {
        valor = resto + valor;
    } else {
        valor += resto;
    }

    return valor;

}

Number.FormatMoeda = function (valor) {
    if (valor == '') {
        return '0,00';
    }

    var temp = valor.replace('.', ',');

    if (temp.substr(temp.length - 3, 1) == ',') {
        temp;
    } else if (temp.substr(temp.length - 2, 1) == ',') {
        temp = temp + '0';
    } else if (temp.substr(temp.length - 1, 1) == ',') {
        temp = temp + '00';
    } else {
        temp = temp + ',00';
    }

    var Total = parseInt(temp.length);
    var TotalLen = parseInt(temp.length) / 3;
    var TotalLenX = parseInt(parseInt(temp.length) / 3);

    var Texto = temp.substr(temp.length - 3, 3);
    var Contar = 0;

    if (TotalLenX > 0) {
        var vetor = temp.split('', temp.length);

        for (var x = vetor.length - 4; x >= 0; x--) {
            if (x >= 0) {
                Contar++;
                Texto = vetor[x] + Texto;
                if (Contar == 3 && x != 0) {
                    Contar = 0;
                    Texto = '.' + Texto;
                }
            }
        }
    } else {
        return temp;
    }

    return Texto;
}

Number.FormatMoney = function (valor) {

    if (valor == '') {
        return '0,00';
    }

    var temp = valor.replace('.', ',');

    if (temp.substr(temp.length - 3, 1) == ',') {
        temp;
    } else if (temp.substr(temp.length - 2, 1) == ',') {
        temp = temp + '0';
    } else if (temp.substr(temp.length - 1, 1) == ',') {
        temp = temp + '00';
    } else {
        temp = temp + ',00';
    }

    var Total = parseInt(temp.length);
    var TotalLen = parseInt(temp.length) / 3;
    var TotalLenX = parseInt(parseInt(temp.length) / 3);

    var Texto = temp.substr(temp.length - 3, 3);
    var Contar = 0;

    if (TotalLenX > 0) {
        var vetor = temp.split('', temp.length);

        for (var x = vetor.length - 4; x >= 0; x--) {
            if (x >= 0) {
                Contar++;
                Texto = vetor[x] + Texto;
                if (Contar == 3 && x != 0) {
                    Contar = 0;
                    Texto = '.' + Texto;
                }
            }
        }
    } else {
        return temp;
    }

    return Texto;
}

Number.ValorE = function (valor) {

    if (valor === '') {
        return 0;
    }

    if (valor === ',') {
        return 0;
    }

    var temp = valor.replace('.', '');
    var temp2 = temp.replace(',', '.');

    return temp2;
};

Number.FormatTresCasas = function (valor) {

    if (valor == 0 || valor == '') {
        return '0,000';
    }

    if (valor.toString().indexOf('.') > -1) {
        if (valor.toString().split('.')[1].length == 1) {
            var valor2 = valor.toString() + "00";
        } else if (valor.toString().split('.')[1].length == 2) {
            var valor2 = valor.toString() + "0";
        } else {
            var valor2 = valor.toString();
        }
    } else {
        var valor2 = valor.toString() + ".000";
    }

    valor2 = valor2.replace('.', '');

    var valorDuasCasas = valor2.toString().substr(0, (valor2.toString().length - 3));
    var valorResto = valor2.toString().substr((valor2.toString().length - 3), 3);

    return (valorDuasCasas == '' ? '0' : valorDuasCasas) + ',' + valorResto;
};

/****************************************************************** // Date // ******************************************************************/

Date.isDate = function (data) {
    if (data.length < 10)
        return false;

    if (Number.Filter(data) === '')
        return false;

    var dia = parseInt(data.substr(0, 2));
    var mes = parseInt(data.substr(3, 2));
    var ano = parseInt(data.substr(6, 4));

    if (dia < 1 || dia > 31)
        return false;

    if (mes < 01 || mes > 12)
        return false;

    if (ano < 01)
        return false;

    if ((mes === 2 || mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia > 30)
        return false;

    var bissexto = false;

    if (ano % 4 === 0 && (ano % 400 === 0 || ano % 100 !== 0))
        bissexto = true;

    if (!bissexto && mes === 2 && dia > 28)
        return false;

    if (bissexto && mes === 2 && dia > 29)
        return false;

    return true;
}

Date.isHora = function (hora, seconds) {
    if (seconds) {
        if (hora.length < 8)
            return false;
    } else {
        if (hora.length < 5)
            return false;
    }

    if (Number.Filter(hora) === '')
        return false;

    var horas = parseInt(hora.substr(0, 2));
    var minutos = parseInt(hora.substr(3, 2));

    if (seconds)
        var segundos = parseInt(hora.substr(6, 2));

    if (horas < 0 || horas > 23)
        return false;

    if (minutos < 00 || minutos > 59)
        return false;

    if (seconds) {
        if (segundos < 00 || segundos > 59)
            return false;
    }

    return true;
}

Date.ShowDDMMYYYY = function (date) {
    if (date == '' || date == null)
        return '';

    var temp;
    temp = date.substr(8, 2) + '/' + date.substr(5, 2) + '/' + date.substr(0, 4);

    if (date.length > 10)
        temp += ' ' + date.substr(11, 2) + ':' + date.substr(14, 2) + ':' + date.substr(17, 2);

    if (Date.isDate(temp))
        return temp;
    else
        return '';
}

Date.ConvertToString = function (date, getHours) {
    return Date.FormatDDMMYYYY(date, getHours);
}

Date.AddDate = function (ItemType, DateToWorkOn, ValueToBeAdded) {
    switch (ItemType) {
        case 'd':
            DateToWorkOn.setDate(DateToWorkOn.getDate() + ValueToBeAdded);
            break;

        case 'w':
            DateToWorkOn.setDate(DateToWorkOn.getDate() + ValueToBeAdded * 7);
            break;

        case 'm':
            var dia = DateToWorkOn.getDate();
            var mes = DateToWorkOn.getMonth() + 1;
            var ano = DateToWorkOn.getFullYear();
            var hora = DateToWorkOn.getHours();
            var minutos = DateToWorkOn.getMinutes();
            var segundos = DateToWorkOn.getSeconds();

            for (var i = 0; i < ValueToBeAdded; i++) {
                mes++;

                if (mes > 12) {
                    mes = 1;
                    ano++;
                }
            }

            var sDia = '';
            var sMes = '';

            if (dia < 10)
                sDia = '0' + dia;
            else
                sDia = dia.toString();

            if (mes < 10)
                sMes = '0' + mes;
            else
                sMes = mes.toString();

            var temp = Date.ConvertToDate(Date.AjustaData(sDia + '/' + sMes + '/' + ano));
            DateToWorkOn = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), hora, minutos, segundos);

            break;

        case 'y':
            DateToWorkOn.setYear(DateToWorkOn.getFullYear() + ValueToBeAdded);
            break;

        case 'h':
            DateToWorkOn.setHours(DateToWorkOn.getHours() + ValueToBeAdded);
            break;

        case 'n':
            DateToWorkOn.setMinutes(DateToWorkOn.getMinutes() + ValueToBeAdded);
            break;

        case 's':
            DateToWorkOn.setSeconds(DateToWorkOn.getSeconds() + ValueToBeAdded);
            break;
    }

    return DateToWorkOn;
};

Date.ConvertToDate = function (stringData) {
    var dia = parseFloat(stringData.substr(0, 2));
    var mes = parseFloat(stringData.substr(3, 2));
    var ano = parseFloat(stringData.substr(6, 4));

    if (stringData.length > 10) {
        var horas = parseInt(stringData.substr(11, 2));
        var minutos = parseInt(stringData.substr(14, 2));
        var segundos = parseInt(stringData.substr(17, 2));

        return new Date(ano, mes - 1, dia, horas, minutos, segundos);
    } else
        return new Date(ano, mes - 1, dia);
}

Date.GetDate = function (getHours) {
    return Date.FormatDDMMYYYY(new Date(), getHours);
}

Date.GetMonthYear = function () {
    return Date.FormatDDMMYYYY(new Date(), false).substring(3, 10);
}

Date.GetYear = function () {
    var d = new Date();
    return d.getFullYear();
};

Date.GetMonth = function () {
    var d = new Date();
    return d.getMonth();
};

Date.GetHora = function (getSeconds) {
    var data = Date.FormatDDMMYYYY(new Date(), true);
    var hora = data.substr(data.length - 8, 8);

    if (!getSeconds)
        hora = hora.substr(0, 5);

    return hora;
}

Date.FormatDDMMYYYY = function (data, getHours) {
    var dia = data.getDate();

    if (dia < 10)
        dia = '0' + dia;

    var mes = data.getMonth() + 1;

    if (mes < 10)
        mes = '0' + mes;

    var temp = dia + '/' + mes + '/' + data.getFullYear();

    if (getHours) {
        var hora = data.getHours();

        if (hora < 10)
            hora = '0' + hora;

        var minutos = data.getMinutes();

        if (minutos < 10)
            minutos = '0' + minutos;

        var segundos = data.getSeconds();

        if (segundos < 10)
            segundos = '0' + segundos;

        temp += ' ' + hora + ':' + minutos + ':' + segundos;
    }

    return temp;
}


Date.FormatYYYYMMDD = function (data) {

    data = Date.ConvertToDate(data);
    var dia = data.getDate();

    if (dia < 10)
        dia = '0' + dia;

    var mes = data.getMonth() + 1;

    if (mes < 10)
        mes = '0' + mes;

    var temp = data.getFullYear() + '-' + mes + '-' + dia;

    return temp;
}

Date.AjustaData = function (data) {
    if (Date.isDate(data))
        return data;

    if (data.length != 8 && data.length != 10)
        return data;

    var temp = data;

    var dia = temp.substr(0, 2);
    var mes = temp.substr(3, 2);
    var ano = '';

    if (temp.length == 8) {
        ano = temp.substr(6, 2);

        if (parseInt(ano) > 29)
            ano = '19' + ano;
        else
            ano = '20' + ano;

        temp = dia + '/' + mes + '/' + ano;
    } else
        ano = data.substr(6, 4);

    if (!Date.isDate(temp)) {
        if (parseInt(dia) > 28)
            temp = --dia + '/' + mes + '/' + ano;

        if (!Date.isDate(temp))
            temp = --dia + '/' + mes + '/' + ano;

        if (!Date.isDate(temp))
            temp = --dia + '/' + mes + '/' + ano;
    }

    if (Date.isDate(temp))
        return temp;
    else
        return data;
}


Date.AjustaHora = function (hora) {

    hora = hora.replace(/\ /gi, '0');

    if (hora.indexOf(':') == -1) {
        return (hora.length >= 2 ? "" : (hora.length == 1 ? "0" : "00")) + hora + ":00";
    }

    var vetor = hora.split(":");
    var novaHora = "";

    if (vetor[0].length == 0) {
        novaHora = "00";
    } else if (vetor[0].length == 1) {
        novaHora = "0" + vetor[0];
    } else {
        novaHora = vetor[0];
    }

    novaHora = novaHora + ":";

    if (vetor[1].length == 0) {
        novaHora = novaHora + "00";
    } else if (vetor[1].length == 1) {
        novaHora = novaHora + vetor[1] + "0";
    } else {
        if (vetor[1].length > 2) {
            novaHora = novaHora + vetor[1].substring(0, 2);
        } else {
            novaHora = novaHora + vetor[1];
        }
    }


    return novaHora;


    /*if (hora.indexOf(':') == 0) {
     hora = "00" + hora;
     } else if (hora.indexOf(':') == 1) {
     hora = "0" + hora;
     }

     if (hora.indexOf(':') == -1) {
     if (hora.length == 5) {
     return hora;
     } else if (hora.length == 4) {
     return hora + "0";
     } else if (hora.length == 3) {
     return hora + "00";
     } else if (hora.length == 2) {
     return hora + ":00";
     } else if (hora.length == 1) {
     return "0" + hora + ":00";
     } else
     return "00:00";
     } else {

     var vetor = hora.split(":");


     if (hora.length == 3) {

     }


     }*/

}


Date.AjustaHoraVariavel = function (hora) {

    if (hora == "")
        return "00:00";

    hora = hora.replace(/\ /gi, '0');
    if (hora.indexOf(':') == -1)
        return Number.Complete(hora, 2, "0", true) + ":00";

    var vetor = hora.split(":");
    var novaHora = Number.parseFloat(vetor[0]);
    var novoMinuto = (vetor[1].length == 1 ? vetor[1] + "0" : vetor[1]);
    novoMinuto = Number.parseFloat(novoMinuto);
    if (novoMinuto > 59) {
        novaHora++;
        novoMinuto = novoMinuto - 60;
    } else
        novoMinuto = (novoMinuto.length == 1 ? "0" : "") + novoMinuto;

    return Number.Complete(novaHora, 2, "0", true) + ":" + Number.Complete(novoMinuto, 2, "0", true);

}

Date.setDeAte = function (de, ate, url) {

    var ajax = new Ajax('POST', url, false);

    ajax.Request('action=getDeAte');

    var json = JSON.parse(ajax.getResponseText());

    de.value = json.de;
    ate.value = json.ate;
}

Date.ConvertMinutesToTime = function (minutos) {

    if (minutos === 0 || minutos === '') {
        return '';
    } else if (minutos < 60) {
        return (minutos === 1 ? minutos + " minuto" : minutos + " minutos");
    } else {

        var hora = Math.floor(minutos / 60);
        var minuto = minutos % 60;
        return (hora === 1 ? hora + " hora" + (minuto === 0 ? '' : " e ") : hora + " horas" + (minuto === 0 ? '' : " e ")) + (minuto === 0 ? '' : (minuto === 1 ? " " + minuto + " minuto" : " " + minuto + " minutos"));
    }
};

Date.ConvertTimeToMinutes = function (Hora) {

    if (Hora.toString().indexOf(':') >= 0) {
        var vetor = Hora.toString().split(":");
        return (Number.parseFloat(vetor[0]) * 60) + Number.parseFloat(vetor[1]);
    } else
        return (Number.parseFloat(Hora.toString()) * 60);

};


Date.TimeDiff = function (horaInicial, horaFinal) {

    if (horaInicial.trim() == '' || horaFinal.trim() == '') {
        return '';
    }

    if (Date.isHoraInicialMenorHoraFinal(horaInicial, horaFinal)) {

        var aux = horaInicial;
        horaInicial = horaFinal;
        horaInicial = aux;

        var horaIni = horaInicial.split(':');
        var horaFim = horaFinal.split(':');

        var horasTotal = parseInt(horaFim[0], 10) - parseInt(horaIni[0], 10);
        var minutosTotal = parseInt(horaFim[1], 10) - parseInt(horaIni[1], 10);

        if (minutosTotal < 0) {
            minutosTotal += 60;
            horasTotal -= 1;
        }

        var tempoTotal = (horasTotal < 10 ? "0" + horasTotal : horasTotal) + ":" + (minutosTotal < 10 ? "0" + minutosTotal : minutosTotal);
        return tempoTotal;

    } else if (horaInicial == horaFinal) {

        return '';
    } else {

        var diferenca = Date.TimeDiff(horaInicial, "24:00");
        var totalHoras = Date.TimeAdd(diferenca, horaFinal);
        return totalHoras;
    }
};

Date.isHoraInicialMenorHoraFinal = function (horaInicial, horaFinal) {

    var horaIni = parseInt(horaInicial.split(':')[0], 10);
    var horaFim = parseInt(horaFinal.split(':')[0], 10);

    if (horaIni != horaFim) {
        return horaIni < horaFim;
    }

    var minutosIni = parseInt(horaInicial.split(':')[1], 10);
    var minutosFim = parseInt(horaFinal.split(':')[1], 10);

    if (minutosIni != minutosFim) {
        return minutosIni < minutosFim;
    }
}

Date.TimeAdd = function (horaInicial, horaSomar) {

    var horaIni = horaInicial.split(':');
    var horaSom = horaSomar.split(':');

    var horasTotal = parseInt(horaIni[0], 10) + parseInt(horaSom[0], 10);
    var minutosTotal = parseInt(horaIni[1], 10) + parseInt(horaSom[1], 10);

    if (minutosTotal >= 60) {
        minutosTotal -= 60;
        horasTotal += 1;
    }

    horaTotal = (horasTotal < 10 ? "0" + horasTotal : horasTotal) + ":" + (minutosTotal < 10 ? "0" + minutosTotal : minutosTotal);
    return horaTotal;
}

/****************************************************************** // Selector // ******************************************************************/

var Selector = {
    $: function (id) {
        return document.getElementById(id);
    }
}

/****************************************************************** // Screen // ******************************************************************/

var Screen = {
    getWindowWidth: function () {
        if (document.documentElement && (document.documentElement.clientWidth > 0))
            return document.documentElement.clientWidth;
        else if (window.innerWidth)
            return window.innerWidth;
        else
            return document.body.clientWidth;
    },
    getWindowHeight: function () {
        if (window.innerHeight)
            return window.innerHeight;
        else if (document.documentElement && (document.documentElement.clientHeight > 0))
            return document.documentElement.clientHeight;
        else
            return document.body.clientHeight;
    },
    getPosition: function (target) {
        var left = 0;
        var top = 0;

        while (target.offsetParent) {
            left += target.offsetLeft;
            top += target.offsetTop;
            target = target.offsetParent;
        }

        left += target.offsetLeft;
        top += target.offsetTop;

        return new Point(left, top);
    },
    getMouseCoords: function (ev) {
        if (ev.pageX || ev.pageY)
            return new Point(ev.pageX, ev.pageY);
        else
            return new Point(
                ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                ev.clientY + document.body.scrollTop - document.body.clientTop);
    },
    getMouseOffset: function (target, ev) {
        ev = ev || window.event;

        var docPos = Screen.getPosition(target);
        var mousePos = Screen.getMouseCoords(ev);
        return new Point(mousePos.x - docPos.x, mousePos.y - docPos.y);
    }
}

/****************************************************************** // Point // ******************************************************************/

Point = function (x, y) {
    this.x = x;
    this.y = y;

    this.getPoint = function () {
        return this;
    }
}

/****************************************************************** // Tab // ******************************************************************/

Tab = function () {
    this.divTab = DOM.newElement('div', 'divTab');
    this.divTab.style.padding = '2px';
    this.divTab.style.border = 'solid black 1px';

    this.divTabs = DOM.newElement('div', 'divTabs');
    this.divTabs.style.height = '20px';
    this.divTabs.style.padding = '7px 0 7px 0';

    this.divBody = DOM.newElement('div', 'divBody');

    this.divTab.appendChild(this.divTabs);
    this.divTab.appendChild(this.divBody);

    this.activeTab = -1;

    this.addTab = function (text, divBody) {
        divBody.style.display = 'none';

        var a = DOM.newElement('a');
        a.setAttribute('href', '#');
        a.style.padding = '5px 20px 5px 20px';
        a.style.marginRight = '5px';
        a.style.textDecoration = 'none';
        a.Tab = this;
        a.tabIndex = this.getTabCount();
        a.onclick = function () {
            this.Tab.setActiveTab(this.tabIndex);
        }
        a.appendChild(DOM.newText(text));

        this.divTabs.appendChild(a);
        this.divBody.appendChild(divBody);

        if (this.getTabCount() == 1)
            this.setActiveTab(0);
    }

    this.getTabCount = function () {
        return this.divTabs.childNodes.length;
    }

    this.setActiveTab = function (tab) {
        if (tab > this.getTabCount() - 1)
            return;

        for (var i = 0; i < this.getTabCount(); i++) {
            this.divTabs.childNodes[i].style.backgroundColor = '#fff';
            this.divBody.childNodes[i].style.display = 'none';
        }

        this.activeTab = tab;
        this.divTabs.childNodes[this.activeTab].style.backgroundColor = '#bff';
        this.divBody.childNodes[this.activeTab].style.display = 'block';
    }

    this.setPosition = function (x, y) {
        this.divTab.style.position = 'absolute';
        this.divTab.style.left = x + 'px';
        this.divTab.style.top = y + 'px';
    }

    this.getActiveTab = function () {
        return this.activeTab;
    }

    this.getTabPanelStyle = function () {
        return this.divTab.style;
    }

    this.getTabStyle = function (index) {
        return this.divTabs.childNodes[index].style;
    }

    this.setTabPanelClass = function (className) {
        //this.divTab.class = className;
        this.divTab.className = className;
    }

    this.setTabClass = function (index, className) {
        //this.divTabs.childNodes[index].class = className;
        this.divTabs.childNodes[index].className = className;
    }
}

/****************************************************************** // MenuBar // ******************************************************************/

MenuBar = function (id) {
    this.menuItems = document.createElement('ul');
    this.menuItems.className = 'cssMenu cssMenum';

    this.addMenu = function (menu) {
        menu.menuItem.style.styleFloat = 'left';
        this.menuItems.appendChild(menu.menuItem);
    }
}

/****************************************************************** // Menu // ******************************************************************/

Menu = function (id, text, action) {
    this.aMenuItem = document.createElement('a');
    this.aMenuItem.setAttribute('href', '#');
    this.aMenuItem.className = 'cssMenui';
    this.aMenuItem.appendChild(document.createTextNode(text));

    this.menuItem = document.createElement('li');
    this.menuItem.setAttribute('id', id);
    this.menuItem.appendChild(this.aMenuItem);
    this.menuItem.className = 'cssMenui';

    this.subMenuItem = null;

    if (action)
        this.menuItem.onclick = action;

    this.addSubMenu = function (menu) {
        if (this.subMenuItem == null) {
            var span = document.createElement('span');
            span.appendChild(this.aMenuItem.childNodes[0]);
            this.aMenuItem.appendChild(span);

            this.subMenuItem = document.createElement('ul');
            this.subMenuItem.className = 'cssMenum';
            this.menuItem.appendChild(this.subMenuItem);
        }

        this.subMenuItem.appendChild(menu.menuItem);
    }
}

Menu.setURL = function (url) {
    window.location = url;
}

/****************************************************************** // DOM (Documento Object Model) // ******************************************************************/

var DOM = {
    newText: function (text) {
        return document.createTextNode(text);
    },
    newElement: function (type, id) {
        var obj = null;

        if (type == 'text' || type == 'password' || type == 'radio' || type == 'number' ||
            type == 'checkbox' || type == 'file' || type == 'form.button' ||
            type == 'image' || type == 'submit' || type == 'color') {

            obj = document.createElement('input');
            obj.setAttribute('type', type.replace('form.', ''));
        } else
            obj = document.createElement(type);

        if (id)
            obj.setAttribute('id', id);

        return obj;
    }
}

/****************************************************************** // DragDrop // ******************************************************************/

var DragDrop = {
    obj: null,
    tempOnMouseMove: null,
    tempOnMouseUp: null,
    init: function (obj, ev) {
        var mousePos = Screen.getMouseCoords(window.event || ev);

        DragDrop.obj = obj;
        DragDrop.obj.lastMouseX = mousePos.x;
        DragDrop.obj.lastMouseY = mousePos.y;

        DragDrop.tempOnMouseMove = document.onmousemove;
        DragDrop.tempOnMouseUp = document.onmouseup;
        document.onmouseup = DragDrop.document_OnMouseUp;
        document.onmousemove = DragDrop.document_OnMouseMove;
    },
    document_OnMouseUp: function () {
        DragDrop.obj = null;
        document.onmousemove = DragDrop.tempOnMouseMove;
        document.onmouseup = DragDrop.tempOnMouseUp;

        DragDrop.tempOnMouseMove = null;
        DragDrop.tempOnMouseUp = null;
    },
    document_OnMouseMove: function (ev) {
        if (DragDrop.obj != null) {

            var objPos = Screen.getPosition(DragDrop.obj);
            var x = objPos.x;
            var y = objPos.y;

            var mousePos = Screen.getMouseCoords(ev || window.event);

            DragDrop.obj.style.left = (x + mousePos.x - DragDrop.obj.lastMouseX) + 'px';
            DragDrop.obj.style.top = (y + mousePos.y - DragDrop.obj.lastMouseY) + 'px';

            DragDrop.obj.lastMouseX = mousePos.x;
            DragDrop.obj.lastMouseY = mousePos.y;
        }
    }
}

/****************************************************************** // Dialog // ******************************************************************/

DialogBox = function (div) {

    /************* // Bloqueio // *************/

    this.divBlock = document.createElement('div');
    this.divBlock.style.visibility = 'hidden';
    this.divBlock.style.position = 'absolute';
    this.divBlock.style.backgroundColor = '#000000';
    this.divBlock.style.left = '0px';
    this.divBlock.style.top = '0px';
    // this.divBlock.style.width = Window.getSize(false);
    // this.divBlock.style.height = Window.getSize(true);
    this.divBlock.style.width = '100%';
    this.divBlock.style.height = '100%';
    this.divBlock.style.filter = 'alpha(opacity=60)';
    this.divBlock.style.opacity = 0.2;
    this.divBlock.style.cursor = 'not-allowed';

    /************* // Titulo // *************/

    this.titleText = document.createTextNode('');

    this.divTitleText = document.createElement('div');
    this.divTitleText.setAttribute('id', 'divTitleText');
    this.divTitleText.style.paddingTop = '8px';
    this.divTitleText.style.paddingLeft = '3px';
    this.divTitleText.appendChild(this.titleText);

    this.divTitleE = document.createElement('div');
    this.divTitleE.setAttribute('id', 'divTitleE');
    this.divTitleE.style.backgroundImage = 'url(' + DialogBox.imagePath + 'dialogTL.png)';
    this.divTitleE.style.backgroundRepeat = 'no-repeat';
    this.divTitleE.style.backgroundPosition = 'left top';
    this.divTitleE.style.width = '10px';
    this.divTitleE.style.height = '30px';
    this.divTitleE.style.cssFloat = 'left';
    this.divTitleE.style.styleFloat = 'left';

    this.divTitleM = document.createElement('div');
    this.divTitleM.setAttribute('id', 'divTitleM');
    this.divTitleM.style.backgroundImage = 'url(' + DialogBox.imagePath + 'dialogTM.png)';
    this.divTitleM.style.fontSize = '10pt';
    this.divTitleM.style.fontWeight = 'bold';
    this.divTitleM.style.whiteSpace = 'nowrap';
    this.divTitleM.style.height = '30px';
    this.divTitleM.appendChild(this.divTitleText);

    this.divTitleD = document.createElement('div');
    this.divTitleD.setAttribute('id', 'divTitleD');
    this.divTitleD.style.backgroundImage = 'url(' + DialogBox.imagePath + 'dialogTR.png)';
    this.divTitleD.style.backgroundRepeat = 'no-repeat';
    this.divTitleD.style.backgroundPosition = 'right top';
    this.divTitleD.style.width = '23px';
    this.divTitleD.style.height = '30px';
    this.divTitleD.style.cssFloat = 'right';
    this.divTitleD.style.styleFloat = 'right';

    this.divClose = document.createElement('div');
    this.divClose.setAttribute('id', 'divClose');
    this.divClose.setAttribute('title', 'Fechar');
    this.divClose.style.backgroundImage = 'url(' + DialogBox.imagePath + 'window_close1.png)';
    this.divClose.style.backgroundRepeat = 'no-repeat';
    this.divClose.style.width = '12px';
    this.divClose.style.height = '11px';
    this.divClose.style.marginTop = '10px';
    this.divClose.style.cursor = 'pointer';
    this.divClose.dialogBox = this;
    this.divClose.onclick = function () {
        this.dialogBox.Close();
    };
    this.divTitleD.appendChild(this.divClose);

    this.divTitle = document.createElement('div');
    this.divTitle.setAttribute('id', 'divTitle');
    this.divTitle.style.height = '30px';
    this.divTitle.style.cursor = 'move';
    this.divTitle.style.color = '#000000';
    this.divTitle.onmousedown = function (ev) {
        DragDrop.init(this.parentNode, ev);
    }

    this.divTitle.appendChild(this.divTitleE);
    this.divTitle.appendChild(this.divTitleD);
    this.divTitle.appendChild(this.divTitleM);

    /************* // Corpo // *************/

    this.divBody = document.createElement('div');
    this.divBody.setAttribute('id', 'divBody');
    this.divBody.style.borderTop = '1px solid #000000';
    this.divBody.style.borderRight = '1px solid #000000';
    this.divBody.style.borderBottom = '1px solid #000000';
    this.divBody.style.borderLeft = '1px solid #000000';
    this.divBody.style.backgroundColor = '#Fbfbfb';
    this.divBody.style.padding = '16px';
    this.divBody.appendChild(div);

    /************* // Container // *************/

    this.divMain = document.createElement('div');
    this.divMain.setAttribute('id', 'divMain');
    this.divMain.style.visibility = 'hidden';
    this.divMain.style.position = 'absolute';
    this.divMain.style.borderBottom = '1px solid #000';
    this.divMain.appendChild(this.divTitle);
    this.divMain.appendChild(this.divBody);

    /************* // M�todos // *************/

    document.body.appendChild(this.divBlock);
    document.body.appendChild(this.divMain);

    this.Show = function () {
        this.divBlock.style.visibility = 'visible';
        this.divMain.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        scroll(0, 0);
        //dialog.setPosition(-1,100);
    }

    this.setzIndexBlock = function (index) {
        this.divBlock.style.zIndex = index;
        this.divMain.style.zIndex = index + 1;
    }

    this.setOpacityBlock = function (transparencia) {
        this.divBlock.style.filter = 'alpha(opacity=' + transparencia + ')';
        this.divBlock.style.opacity = (transparencia / 100);
    }

    this.setColorBlock = function (cor) {
        this.divBlock.style.backgroundColor = cor;
    }

    this.Close = function () {
        this.divBlock.style.visibility = 'hidden';
        this.divMain.style.visibility = 'hidden';
        this.divClose.style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
    }

    this.setPosition = function (x, y) {
        if (x == -1)
            x = Math.round((Screen.getWindowWidth() - this.divMain.offsetWidth) / 2);
        if (y == -1)
            y = Math.round((Screen.getWindowHeight() - this.divMain.offsetHeight) / 2) + document.body.scrollTop;

        this.divMain.style.left = x + 'px';
        this.divMain.style.top = y + 'px';
    }

    this.setSize = function (width, height) {
        this.divMain.style.width = width + 'px';
        this.divMain.style.height = height + 'px';
    }

    this.setTitle = function (text) {
        this.titleText.data = text;
    }

    this.HideCloseIcon = function () {
        this.divClose.style.visibility = 'hidden';
    }

    this.ShowCloseIcon = function () {
        this.divClose.style.visibility = 'visible';
    }

    DialogBox.imagePath = './imagens/';
}


/****************************************************************** // Server // ******************************************************************/

var Server = {
    CheckSession: function (url) {
        var ajax = new Ajax('POST', url, false);
        ajax.Request('action=CheckSession');

        if (ajax.getResponseText() == -1) {
            return false;
        } else if (ajax.getResponseText() == '') {
            return false;
        } else if (ajax.getResponseText() == 'erro') {
            return false;
        } else {
            return true;
        }
    },
    CheckSessionA: function (url) {
        var ajax = new Ajax('POST', url, true);

        ajax.onreadystatechange = function () {
            if (!ajax.isStateOK()) {
                return;
            }

            if (ajax.getResponseText() == -1) {
                return false;
            } else if (ajax.getResponseText() == '') {
                return false;
            } else if (ajax.getResponseText() == 'erro') {
                return false;
            } else {
                return true;
            }
        }

        ajax.Request('action=CheckSession');
    },
    DestroySession: function (url) {
        var ajax = new Ajax('POST', url, false);
        ajax.Request('action=DestroySession');
    }
}

/****************************************************************** // Ajax // ******************************************************************/

var Ajax = function (method, url, asynchronous) {
    this.method = method;
    this.url = url;
    this.asynchronous = asynchronous;
    this.funcao = '';

    this.setURL = function (url) {
        this.url = url;
    }

    this.OnReadyStateChange = function (callback) {
        this.ajax.onreadystatechange = callback;
    }

    this.CreateObject = function () {
        var xmlHttp = null;

        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    xmlHttp = null;
                }
            }
        }

        return xmlHttp;
    }

    this.ajax = this.CreateObject();

    this.isStateOK = function () {
        if (this.ajax.readyState == 4 && this.ajax.status == 200)
            return true;
        else
            return false;
    }

    this.Request = function (params) {
        switch (this.method.toUpperCase()) {
            case 'POST':
                this.ajax.open(this.method, this.url, this.asynchronous);
                this.ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                this.ajax.send(params);
                break;

            case 'GET':
                this.ajax.open(this.method, this.url + '?' + params, this.asynchronous);
                this.ajax.send(null);
                break;
        }
    }

    this.getResponseText = function () {
        return this.ajax.responseText;
    }

    this.getResponseXML = function () {
        return this.ajax.responseXML;
    }

    this.Finalize = function () {
        this.ajax = null;
    }

    this.returnOK = function () {
        if (this.ajax.readyState == 4 && this.ajax.status == 200)
            return true;
        else
            return false;
    }
}

/****************************************************************** // Select // ******************************************************************/

var Select = {
    FillWithJSON: function (obj, txt, idField, nameField) {
        if (txt == '')
            return;

        var objJSON = JSON.parse(txt);
        var objItem = null;

        for (var i in objJSON) {
            Select.AddItem(obj, objJSON[i][nameField], objJSON[i][idField]);
            //objItem = document.createElement('option');
            //objItem.setAttribute('value', objJSON[i][idField]);
            //objItem.appendChild(document.createTextNode(objJSON[i][nameField]));
            //obj.appendChild(objItem);
        }
    },
    AddItem: function (obj, text, value) {
        var objItem = null;
        objItem = document.createElement('option');
        objItem.setAttribute('value', value);
        objItem.appendChild(document.createTextNode(text));
        obj.appendChild(objItem);
    },
    RemoveItem: function (obj, value) {
        if (obj.childNodes.length > 0) {
            for (var i = obj.childNodes.length - 1; i >= 0; i--) {
                if (obj.childNodes[i].value == value)
                    obj.removeChild(obj.childNodes[i]);
            }
        }
    },
    Clear: function (obj) {
        if (obj.childNodes.length > 0) {
            for (var i = obj.childNodes.length - 1; i >= 0; i--) {
                obj.removeChild(obj.childNodes[i]);
            }
        }
    },
    Show: function (obj, id) {
        for (var i = 0; i < obj.length; i++) {
            if (id == obj.options[i].value) {
                obj.selectedIndex = i;
                return;
            }
        }
    },
    ShowAdd: function (obj, id, text) {
        for (var i = 0; i < obj.length; i++) {
            if (id == obj.options[i].value) {
                obj.selectedIndex = i;
                return;
            }
        }
        var objItem = null;
        objItem = document.createElement('option');
        objItem.setAttribute('value', id);
        objItem.appendChild(document.createTextNode(text));
        obj.appendChild(objItem);
        obj.selectedIndex = obj.length - 1;
    },
    ShowAttribute: function (obj, id, atributo) {
        for (var i = 0; i < obj.length; i++) {
            if (id == obj.options[i].getAttribute(atributo)) {
                obj.selectedIndex = i;
                return;
            }
        }
    },
    ShowText: function (obj, Text) {
        for (var i = 0; i < obj.length; i++) {
            if (Text == obj.options[i].text) {
                obj.selectedIndex = i;
                return;
            }
        }
    },
    GetTextByValue: function (obj, value) {
        for (var i = 0; i < obj.length; i++) {
            if (value == obj.options[i].value) {
                return obj.options[i].text;
            }
        }
    },
    GetText: function (obj) {
        return obj.options[obj.selectedIndex].text;
    },
    SetText: function (obj, text) {
        return obj.options[obj.selectedIndex].text = text;
    },
    GetOptionName: function (obj) {
        return obj[obj.selectedIndex].getAttribute('name');
    },
    GetOptionAttribute: function (obj, atributo) {
        return obj[obj.selectedIndex].getAttribute(atributo);
    },
    GetOption: function (obj) {
        return obj.options[obj.selectedIndex];
    }

}

/****************************************************************** // Mask // ******************************************************************/

var Mask = {
    setNull: function (obj) {
        obj.maxLength = 60;
        obj.onkeypress = function (ev) {

        }
    },
    setDDIDDDTelefone: function (obj) {


        obj.maxLength = 19;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;


            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;


            if (temp.length == 0) {
                temp += '+';
                obj.value = temp;
                return true;
            }

            if (temp.length >= 3) {
                if (temp.substring(0, 3) !== '+55') {
                    if (temp.length == 3) {
                        temp += ' ';
                        obj.value = temp;
                    }
                    return true;
                }
            }


            if (temp.length == 3) {
                temp += ' (';
                obj.value = temp;
                return true;
            }

            if (temp.length == 7) {
                temp += ') ';
                obj.value = temp;
                return true;
            }

            if (temp.length == 8) {
                temp += ' ';
                obj.value = temp;
                return true;
            }

            if (temp.length >= 8) {


                if (temp.substring(9, 10) == '9') {
                    if (temp.length >= 8) {
                        /* if (truetemp.substring(4, 8) == '(11)' || temp.substring(4, 8) == '(12)' || temp.substring(4, 8) == '(13)'
                         || temp.substring(4, 8) == '(14)' || temp.substring(4, 8) == '(15)' || temp.substring(4, 8) == '(16)'
                         || temp.substring(4, 8) == '(17)' || temp.substring(4, 8) == '(18)' || temp.substring(4, 8) == '(19)'
                         || temp.substring(4, 8) == '(21)' || temp.substring(4, 8) == '(22)' || temp.substring(4, 8) == '(24)'
                         || temp.substring(4, 8) == '(27)' || temp.substring(4, 8) == '(28)'
                         || temp.substring(4, 8) == '(91)' || temp.substring(4, 8) == '(92)' || temp.substring(4, 8) == '(93)'
                         || temp.substring(4, 8) == '(94)' || temp.substring(4, 8) == '(95)' || temp.substring(4, 8) == '(96)'
                         || temp.substring(4, 8) == '(97)' || temp.substring(4, 8) == '(98)' || temp.substring(4, 8) == '(99)'
                         || temp.substring(4, 8) == '(81)' || temp.substring(4, 8) == '(82)' || temp.substring(4, 8) == '(83)'
                         || temp.substring(4, 8) == '(84)' || temp.substring(4, 8) == '(85)' || temp.substring(4, 8) == '(86)'
                         || temp.substring(4, 8) == '(87)' || temp.substring(4, 8) == '(88)' || temp.substring(4, 8) == '(89)'
                         || temp.substring(4, 8) == '(31)' || temp.substring(4, 8) == '(32)' || temp.substring(4, 8) == '(33)'
                         || temp.substring(4, 8) == '(34)' || temp.substring(4, 8) == '(35)' || temp.substring(4, 8) == '(37)'
                         || temp.substring(4, 8) == '(38)' || temp.substring(4, 8) == '(71)' || temp.substring(4, 8) == '(73)'
                         || temp.substring(4, 8) == '(74)' || temp.substring(4, 8) == '(75)' || temp.substring(4, 8) == '(77)'
                         || temp.substring(4, 8) == '(79)' || temp.substring(4, 8) == '(61)' || temp.substring(4, 8) == '(62)'
                         || temp.substring(4, 8) == '(63)' || temp.substring(4, 8) == '(64)' || temp.substring(4, 8) == '(65)'
                         || temp.substring(4, 8) == '(66)' || temp.substring(4, 8) == '(67)' || temp.substring(4, 8) == '(68)'
                         || temp.substring(4, 8) == '(69)' || temp.substring(4, 8) == '(41)' || temp.substring(4, 8) == '(42)'
                         || temp.substring(4, 8) == '(43)' || temp.substring(4, 8) == '(44)' || temp.substring(4, 8) == '(45)'
                         || temp.substring(4, 8) == '(46)' || temp.substring(4, 8) == '(47)' || temp.substring(4, 8) == '(48)'
                         || temp.substring(4, 8) == '(49)' || temp.substring(4, 8) == '(51)' || temp.substring(4, 8) == '(52)'
                         || temp.substring(4, 8) == '(53)' || temp.substring(4, 8) == '(54)' || temp.substring(4, 8) == '(55)'
                         ) {*/
                        if (temp.length == 14) {
                            obj.maxLength = 19;
                            temp += '-';
                            obj.value = temp;
                            return true;
                        }
                        /*  }
                         else {
                         if (temp.length == 13)
                         {
                         obj.maxLength = 18;
                         temp += '-';
                         obj.value = temp;
                         return true;
                         }
                         }*/
                    }
                } else {
                    if (temp.length == 13) {
                        obj.maxLength = 18;
                        temp += '-';
                        obj.value = temp;
                        return true;
                    }

                }
            }


        }
    },
    setCelular: function (obj) {
        obj.maxLength = 15;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;


            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;

            if (temp.length == 0) {
                temp += '(';
                obj.value = temp;
                return true;
            }

            if (temp.length == 3) {
                temp += ') ';
                obj.value = temp;
                return true;
            }

            if (temp.length == 4) {
                temp += ' ';
                obj.value = temp;
                return true;
            }

            if (temp.length >= 6) {

                if (temp.substring(5, 6) == '9') {
                    if (temp.length >= 4) {
                        /* if (temp.substring(0, 4) == '(11)' || temp.substring(0, 4) == '(12)' || temp.substring(0, 4) == '(13)'
                         || temp.substring(0, 4) == '(14)' || temp.substring(0, 4) == '(15)' || temp.substring(0, 4) == '(16)'
                         || temp.substring(0, 4) == '(17)' || temp.substring(0, 4) == '(18)' || temp.substring(0, 4) == '(19)'
                         || temp.substring(0, 4) == '(21)' || temp.substring(0, 4) == '(22)' || temp.substring(0, 4) == '(24)'
                         || temp.substring(0, 4) == '(27)' || temp.substring(0, 4) == '(28)'
                         || temp.substring(0, 4) == '(91)' || temp.substring(0, 4) == '(92)' || temp.substring(0, 4) == '(93)'
                         || temp.substring(0, 4) == '(94)' || temp.substring(0, 4) == '(95)' || temp.substring(0, 4) == '(96)'
                         || temp.substring(0, 4) == '(97)' || temp.substring(0, 4) == '(98)' || temp.substring(0, 4) == '(99)'
                         || temp.substring(0, 4) == '(81)' || temp.substring(0, 4) == '(82)' || temp.substring(0, 4) == '(83)'
                         || temp.substring(0, 4) == '(84)' || temp.substring(0, 4) == '(85)' || temp.substring(0, 4) == '(86)'
                         || temp.substring(0, 4) == '(87)' || temp.substring(0, 4) == '(88)' || temp.substring(0, 4) == '(89)'
                         || temp.substring(0, 4) == '(31)' || temp.substring(0, 4) == '(32)' || temp.substring(0, 4) == '(33)'
                         || temp.substring(0, 4) == '(34)' || temp.substring(0, 4) == '(35)' || temp.substring(0, 4) == '(37)'
                         || temp.substring(0, 4) == '(38)' || temp.substring(0, 4) == '(71)' || temp.substring(0, 4) == '(73)'
                         || temp.substring(0, 4) == '(74)' || temp.substring(0, 4) == '(75)' || temp.substring(0, 4) == '(77)'
                         || temp.substring(0, 4) == '(79)' || temp.substring(0, 4) == '(61)' || temp.substring(0, 4) == '(62)'
                         || temp.substring(0, 4) == '(63)' || temp.substring(0, 4) == '(64)' || temp.substring(0, 4) == '(65)'
                         || temp.substring(0, 4) == '(66)' || temp.substring(0, 4) == '(67)' || temp.substring(0, 4) == '(68)'
                         || temp.substring(0, 4) == '(69)' || temp.substring(0, 4) == '(41)' || temp.substring(0, 4) == '(42)'
                         || temp.substring(0, 4) == '(43)' || temp.substring(0, 4) == '(44)' || temp.substring(0, 4) == '(45)'
                         || temp.substring(0, 4) == '(46)' || temp.substring(0, 4) == '(47)' || temp.substring(0, 4) == '(48)'
                         || temp.substring(0, 4) == '(49)' || temp.substring(0, 4) == '(51)' || temp.substring(0, 4) == '(52)'
                         || temp.substring(0, 4) == '(53)' || temp.substring(0, 4) == '(54)' || temp.substring(0, 4) == '(55)'
                         ) { */
                        if (temp.length == 10) {
                            obj.maxLength = 15;
                            temp += '-';
                            obj.value = temp;
                            return true;
                        }
                        /* }
                         else {
                         if (temp.length == 9)
                         {
                         obj.maxLength = 14;
                         temp += '-';
                         obj.value = temp;
                         return true;
                         }
                         }*/
                    }
                } else {
                    if (temp.length == 9) {
                        obj.maxLength = 14;
                        temp += '-';
                        obj.value = temp;
                        return true;
                    }

                }
            }


        }
    },
    setTelefone: function (obj) {
        obj.maxLength = 14;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;

            if (temp.length == 0) {
                temp += '(';
                obj.value = temp;
                return true;
            }

            if (temp.length == 3) {
                temp += ') ';
                obj.value = temp;
                return true;
            }

            if (temp.length == 4) {
                temp += ' ';
                obj.value = temp;
                return true;
            }

            if (temp.length == 9) {
                temp += '-';
                obj.value = temp;
                return true;
            }
        }
    },
    setCEP: function (obj) {
        obj.maxLength = 9;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;

            if (temp.length == 5) {
                temp += '-';
                obj.value = temp;
                return;
            }
        }
    },
    setCNPJ: function (obj) {
        obj.maxLength = 18;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;

            if (temp.length == 2) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length == 6) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length == 10) {
                temp += '/';
                obj.value = temp;
                return;
            }

            if (temp.length == 15) {
                temp += '-';
                obj.value = temp;
                return;
            }
        };
    },
    setCPF: function (obj) {
        obj.maxLength = 14;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;

            if (temp.length == 3) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length == 7) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length == 11) {
                temp += '-';
                obj.value = temp;
                return;
            }
        }
    },
    setNCM: function (obj) {

        obj.maxLength = 10;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;


            var temp = obj.value;

            if (temp.length == 4) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length == 7) {
                temp += '.';
                obj.value = temp;
                return;
            }


        }
    },
    setCEST: function (obj) {

        obj.maxLength = 9;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;


            var temp = obj.value;

            if (temp.length == 2) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length == 6) {
                temp += '.';
                obj.value = temp;
                return;
            }


        }
    },
    setRG: function (obj) {
        obj.maxLength = 12;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;

            if (temp.length === 2) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length === 6) {
                temp += '.';
                obj.value = temp;
                return;
            }

            if (temp.length === 10) {
                temp += '-';
                obj.value = temp;
                return;
            }
        }
    },
    setMesAno: function (obj) {
        obj.maxLength = 7;

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var mydata = obj.value;

            if (mydata.length == 2) {
                mydata += '/';
                obj.value = mydata;
                return;
            }
        }
    },
    setDataMesAno: function (obj) {
        var temHora = false;

        if (arguments.length == 2)
            temHora = arguments[1];


        obj.maxLength = 5;



        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var mydata = obj.value;

            if (mydata.length == 2) {
                mydata += '/';
                obj.value = mydata;
                return;
            }


        }
    },
    setDataMesAnoFull: function (obj) {
        var temHora = false;

        if (arguments.length == 2)
            temHora = arguments[1];


        obj.maxLength = 7;



        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var mydata = obj.value;

            if (mydata.length == 2) {
                mydata += '/';
                obj.value = mydata;
                return;
            }


        }
    },
    setData: function (obj) {
        var temHora = false;

        if (arguments.length == 2)
            temHora = arguments[1];

        if (temHora)
            obj.maxLength = 16;
        else
            obj.maxLength = 10;

        obj.onblur = function () {
            this.value = Date.AjustaData(this.value);
        }

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var mydata = obj.value;

            if (mydata.length == 2) {
                mydata += '/';
                obj.value = mydata;
                return;
            }

            if (mydata.length == 5) {
                mydata += '/';
                obj.value = mydata;
                return;
            }

            if (temHora) {
                if (mydata.length == 10) {
                    mydata += ' ';
                    obj.value = mydata;
                    return;
                }
                if (mydata.length == 13) {
                    mydata += ':';
                    obj.value = mydata;
                    return;
                }
            }

        }
    },
    setDataSimple: function (obj) {
        var temHora = false;

        if (arguments.length == 2)
            temHora = arguments[1];

        if (temHora)
            obj.maxLength = 16;
        else
            obj.maxLength = 10;

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var mydata = obj.value;

            if (mydata.length == 2) {
                mydata += '/';
                obj.value = mydata;
                return;
            }

            if (mydata.length == 5) {
                mydata += '/';
                obj.value = mydata;
                return;
            }

            if (temHora) {
                if (mydata.length == 10) {
                    mydata += ' ';
                    obj.value = mydata;
                    return;
                }
                if (mydata.length == 13) {
                    mydata += ':';
                    obj.value = mydata;
                    return;
                }
            }

        }
    },
    setHora: function (obj, withSeconds) {
        if (withSeconds)
            obj.maxLength = 8;
        else
            obj.maxLength = 5;

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = obj.value;

            if (temp.length == 2) {
                temp = temp + ':';
                obj.value = temp;
                return;
            }

            if (withSeconds) {
                if (temp.length == 5) {
                    temp = temp + ':';
                    obj.value = temp;
                    return;
                }
            }
        };
    },
    setHoraFull: function (obj) {
        obj.maxLength = 8;

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            if (obj.value.length > 7)
                return;

            var temp = Number.Filter(obj.value) + String.fromCharCode(keyCode);

            if (temp.length > 2) {
                temp = temp.substr(0, temp.length - 2) + ':' + temp.substr(temp.length - 2, 1);
                obj.value = temp;
            }
        };
    },
    setOnlyNumbers: function (obj) {
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if ((obj.value.toString().indexOf(",") >= 0 && keyCode === 44) || (obj.value.toString().trim() == "" && (keyCode === 44 || keyCode === 46)))
                return false;

            if ((obj.value.toString().indexOf(",") >= 0 && keyCode === 44) || keyCode === 46)
                return false;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

        }
    },
    setOnlyIntegers: function (obj) {
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 46 || keyCode === 44)
                return false;

            if (keyCode === 9 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

        }
    },
    setCurrency: function (obj) {
        obj.style.textAlign = 'right';
        obj.maxLength = 15;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            // permite a propaga��o do BACKSPACE mesmo
            // quando alcan�ado o tamanho m�ximo do texto
            if (keyCode !== 8)
                if (obj.value.length >= obj.maxLength)
                    return false;

            // libera as teclas BACKSPACE e TAB
            if (keyCode === 8 || keyCode === 9)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = Number.Filter(obj.value) + String.fromCharCode(keyCode);

            switch (temp.length) {
                /*case 0:
                 obj.value = ',  ';
                 break;

                 case 1:
                 obj.value = ', ' + temp;
                 break;

                 case 2:
                 obj.value = ',' + temp;
                 break;*/

                default:
                    temp = temp.substr(0, temp.length - 2) + ',' + temp.substr(temp.length - 2, temp.length - 1);
                    alert(temp);
                    obj.value = Number.FormatMoeda(temp);
                    break;
            }

        };
    },
    setPeso: function (obj) {

        obj.style.textAlign = 'right';

        obj.onkeyup = function (ev) {

            var integer = 0;

            obj.value = obj.value + '';
            integer = obj.value.split(',')[0];

            obj.value = obj.value.replace(/\D/g, "");
            obj.value = obj.value.replace(/^[0]+/, "");

            if (obj.value.length < 4 || !integer) {
                if (obj.value.length === 1)
                    obj.value = '0,00' + obj.value;
                if (obj.value.length === 2)
                    obj.value = '0,0' + obj.value;
                if (obj.value.length === 3)
                    obj.value = '0,' + obj.value;
            } else {
                obj.value = obj.value.replace(/^(\d{1,})(\d{3})$/, "$1,$2");
            }

            return obj.value;
        }
    },
    setHoraVariavel: function (obj) {
        obj.style.textAlign = 'right';
        obj.maxLength = 15;
        obj.value = ':  ';
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            // permite a propaga��o do BACKSPACE mesmo
            // quando alcan�ado o tamanho m�ximo do texto

            if (keyCode == 44 || keyCode == 46)
                return false;


            if (keyCode !== 8)
                if (obj.value.length >= obj.maxLength)
                    return false;

            // libera as teclas BACKSPACE e TAB
            if (keyCode === 8 || keyCode === 9)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = Number.Filter(obj.value) + String.fromCharCode(keyCode);

            switch (temp.length) {
                case 0:
                    obj.value = ':  ';
                    break;

                case 1:
                    obj.value = ': ' + temp;
                    break;

                case 2:
                    obj.value = ':' + temp;
                    break;

                default:
                    temp = temp.substr(0, temp.length - 2) + ':' + temp.substr(temp.length - 2, temp.length - 1);
                    obj.value = temp;
                    break;
            }

            return false;
        }

        obj.onfocus = function () {
            if (Number.getFloat(this.value) === 0.0)
                this.value = ':  ';
        }

        obj.onkeydown = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode != 8)
                return true;

            this.value = this.value.substr(0, this.value.length - 1);
            var temp = Number.Filter(this.value);

            switch (temp.length) {
                case 0:
                    this.value = ':  ';
                    break;

                case 1:
                    this.value = ': ' + temp;
                    break;

                case 2:
                    this.value = ':' + temp;
                    break;

                default:
                    temp = temp.substr(0, temp.length - 2) + ':' + temp.substr(temp.length - 2, 2);
                    this.value = temp;
                    break;
            }

            return false;
        }
    },
    setMoeda: function (obj) {
        obj.style.textAlign = 'right';
        obj.maxLength = 15;
        obj.value = ',  ';

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            // permite a propaga??o do BACKSPACE mesmo
            // quando alcan?ado o tamanho m?ximo do texto
            if (keyCode !== 8)
                if (obj.value.length >= obj.maxLength)
                    return false;

            // libera as teclas BACKSPACE e TAB

            if (keyCode === 8 || keyCode === 9)
                return true;

            if (document.getSelection(obj).toString() != '') {
                obj.value = ',  ';
                return true;
            }

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = Number.Filter(obj.value) + String.fromCharCode(keyCode);

            switch (temp.length) {
                case 0:
                    obj.value = ',  ';
                    break;

                case 1:
                    obj.value = ', ' + temp;
                    break;

                case 2:
                    obj.value = ',' + temp;
                    break;

                default:
                    temp = temp.substr(0, temp.length - 2) + ',' + temp.substr(temp.length - 2, temp.length - 1);
                    obj.value = temp;
                    break;
            }

            return false;
        };

        obj.onfocus = function () {
            if (Number.getFloat(this.value) === 0.0)
                this.value = ',  ';
        }

        obj.onkeydown = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode != 8)
                return true;

            this.value = this.value.substr(0, this.value.length - 1);
            var temp = Number.Filter(this.value);

            switch (temp.length) {
                case 0:
                    this.value = ',  ';
                    break;

                case 1:
                    this.value = ', ' + temp;
                    break;

                case 2:
                    this.value = ',' + temp;
                    break;

                default:
                    temp = temp.substr(0, temp.length - 2) + ',' + temp.substr(temp.length - 2, 2);
                    this.value = temp;
                    break;
            }

            return false;
        }
    },

    setReal: function (obj) {
        obj.style.textAlign = 'right';
        //obj.maxLength = 15;

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode === 9 || keyCode === 46 || keyCode === 8)
                return true;

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

        }

        obj.onblur = function () {
            if (obj.value.trim() == '') {
                return;
            }

            var casas = 2;
            if (obj.value.indexOf(",") > 0) {
                var aux = obj.value.split(',');
                var casas = aux[1].length;
            }

            obj.value = Number.FormatValor(Number.parseFloat(obj.value.replace(/\./gi, '')), casas);
        };
    },

    setMoedaFull: function (obj) {
        obj.style.textAlign = 'right';
        obj.maxLength = 15;
        obj.value = ',    ';

        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            // permite a propaga??o do BACKSPACE mesmo
            // quando alcan?ado o tamanho m?ximo do texto
            if (keyCode !== 8)
                if (obj.value.length >= obj.maxLength)
                    return false;

            // libera as teclas BACKSPACE e TAB
            if (keyCode === 8 || keyCode === 9)
                return true;

            if (document.getSelection(obj).toString() != '') {
                obj.value = ',    ';
                return true;
            }

            if (!Number.isNumber(String.fromCharCode(keyCode)))
                return false;

            var temp = Number.Filter(obj.value) + String.fromCharCode(keyCode);

            switch (temp.length) {
                case 0:
                    obj.value = ',    ';
                    break;

                case 1:
                    obj.value = ',   ' + temp;
                    break;

                case 2:
                    obj.value = ',  ' + temp;
                    break;

                case 3:
                    obj.value = ', ' + temp;
                    break;

                case 4:
                    obj.value = ',' + temp;
                    break;

                default:
                    temp = temp.substr(0, temp.length - 4) + ',' + temp.substr(temp.length - 4, temp.length - 1);
                    obj.value = temp;
                    break;
            }

            return false;
        }

        obj.onfocus = function () {
            if (Number.getFloat(this.value) === 0.0)
                this.value = ',    ';
        }

        obj.onkeydown = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            if (keyCode != 8)
                return true;

            this.value = this.value.substr(0, this.value.length - 1);
            var temp = Number.Filter(this.value);

            switch (temp.length) {
                case 0:
                    obj.value = ',    ';
                    break;

                case 1:
                    obj.value = ',   ' + temp;
                    break;

                case 2:
                    obj.value = ',  ' + temp;
                    break;

                case 3:
                    obj.value = ', ' + temp;
                    break;

                case 4:
                    obj.value = ',' + temp;
                    break;

                default:
                    temp = temp.substr(0, temp.length - 4) + ',' + temp.substr(temp.length - 4, temp.length - 1);
                    obj.value = temp;
                    break;
            }

            return false;
        }
    },
    setChaveNFe: function (obj) {

        obj.maxLength = 54;
        obj.onkeypress = function (ev) {
            ev = window.event || ev;
            var keyCode = ev.keyCode || ev.which;

            var temp = obj.value;
            var resto = temp.length % 4;

            if (resto == 0) {
                temp += ' ';
                obj.value = temp;
                return;
            }
        };
    }
}

/****************************************************************** // Table // ******************************************************************/


Table = function (id) {
    this.table = document.createElement('table');
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');
    this.tfoot = document.createElement('tfoot');

    this.table.setAttribute('id', id);

    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.table.appendChild(this.tfoot);

    this.rowData = new Array();

    // adiciona cabe�alho
    this.addHeader = function (thArray) {

        var tr = document.createElement('tr');

        for (var i = 0; i < thArray.length; i++) {
            var th = document.createElement('th');
            th.appendChild(thArray[i]);
            tr.appendChild(th);
        }

        this.thead.appendChild(tr);
    }

    this.addColHeaderObjectType = function (texto, titulo, tipoElemento) {
        var th = document.createElement('th');

        if (texto) {
            th.appendChild(document.createTextNode(titulo));
        } else {
            var obj = document.createElement(tipoElemento);

            if (tipoElemento == 'select') {
                obj.setAttribute('class', 'combo_cinzafoco');
                obj.innerHTML = '<option>Selecione</option>';
                var tituloAux = titulo.toString().split(',');
                for (var i = 0; i < tituloAux.length; i++) {
                    obj.innerHTML += '<option value=' + i + '>' + tituloAux[i] + '</option>';
                }
            }

            th.appendChild(obj);
        }
        this.thead.childNodes[0].appendChild(th);
    };

    // adiciona linha
    this.addRow = function (tdArray) {
        var tr = document.createElement('tr');

        for (var i = 0; i < tdArray.length; i++) {
            var td = document.createElement('td');
            td.appendChild(tdArray[i]);
            tr.appendChild(td);
        }

        this.tbody.appendChild(tr);
        this.rowData.push(0);
    }


    this.moveRow = function (row, position) {
        if (this.getRowCount() > 1) {
            if (position > this.getRowCount())
                position = 0;

            var rp = this.rowData[position];
            this.rowData[position] = this.rowData[row];
            this.rowData[row] = rp;


            this.tbody.insertBefore(this.tbody.childNodes[row], this.tbody.childNodes[position]);
        }
    }

    this.addRowBefore = function (tdArray) {
        var tr = document.createElement('tr');

        for (var i = 0; i < tdArray.length; i++) {
            var td = document.createElement('td');
            td.appendChild(tdArray[i]);
            tr.appendChild(td);
        }


        this.tbody.appendChild(tr);
        this.rowData.unshift(0);

    }


    // adiciona rodap�
    this.addFooter = function (tdArray) {
        var tr = document.createElement('tr');

        for (var i = 0; i < tdArray.length; i++) {
            var td = document.createElement('td');
            td.appendChild(tdArray[i]);
            tr.appendChild(td);
        }

        this.tfoot.appendChild(tr);
    }

    // obt�m linhas da tabela
    this.getRow = function (rowNumber) {
        return this.tbody.childNodes[rowNumber];
    }

    // obt�m quantidade de linhas da tabela
    this.getRowCount = function () {
        return this.tbody.childNodes.length;
    }
    // obt�m numero de colunas de uma linha
    this.getColCount = function (rowNumber) {
        return this.tbody.childNodes[rowNumber].childNodes.length;
    }

    this.getColCountHead = function () {
        return this.thead.childNodes[0].childNodes.length;
    }

    // obt�m uma c�clula da tabela
    this.getCell = function (rowNumber, colNumber) {
        return this.getRow(rowNumber).childNodes[colNumber];
    }

    //OBTEM A CELULA DO CABEÇALHO, PODE-SE OCULTAR A CELULA E ETC.
    this.getHeadCell = function (colNumber) {
        return this.thead.childNodes[0].childNodes[colNumber];
    }

    this.getHeadText = function (colNumber) {
        return this.thead.childNodes[0].childNodes[colNumber].childNodes[0].data;
    }

    this.getHeadValue = function (colNumber) {
        return this.thead.childNodes[0].childNodes[colNumber].rowData;
    }

    // obt�m o valor (texto) de uma c�lula da tabela
    this.getCellText = function (rowNumber, colNumber) {
        return this.getCell(rowNumber, colNumber).childNodes[0].data;
    }

    // obt�m o objeto dentro de uma c�lula
    this.getCellObject = function (rowNumber, colNumber) {
        return this.getCell(rowNumber, colNumber).childNodes[0];
    }

    // obt�m o valor da linha
    this.getRowData = function (rowNumber) {
        return this.rowData[rowNumber];
    }

    // define o valor da linha
    this.setRowData = function (rowNumber, value) {
        return this.rowData[rowNumber] = value;
    }

    // exclui uma linha
    this.deleteRow = function (rowNumber) {
        //alert(rowNumber);
        this.tbody.removeChild(this.getRow(rowNumber));
        this.rowData.splice(rowNumber, 1);
    }

    // exclui uma coluna
    this.deleteCol = function (colNumber) {
        //alert(rowNumber);
        //this.tbody.removeChild(this.getRow(colNumber));
        //this.rowData.splice(colNumber, 1);
        try {
            this.thead.childNodes[0].removeChild(this.getHeadCell(colNumber));
        } catch (e) {

        }

        for (var i = 0; i < this.getRowCount(); i++)
            this.getRow(i).removeChild(this.getCell(i, colNumber));
    }



    // define o texto de uma c�lula
    this.setCellText = function (rowNumber, colNumber, value) {
        this.getCell(rowNumber, colNumber).childNodes[0].data = value;
    }

    this.setHeadText = function (colNumber, value) {
        this.thead.childNodes[0].childNodes[colNumber].childNodes[0].data = value;
    }

    this.setHeadValue = function (colNumber, value) {
        this.thead.childNodes[0].childNodes[colNumber].rowData = value;
    }

    this.setHeadAttribute = function (colNumber, attribute, value) {
        this.thead.childNodes[0].childNodes[colNumber].setAttribute(attribute, value);
    }

    this.setCellObject = function (rowNumber, colNumber, value) {
        if (this.getCell(rowNumber, colNumber).childNodes.length > 0)
            this.getCell(rowNumber, colNumber).removeChild(this.getCellObject(rowNumber, colNumber));

        this.getCell(rowNumber, colNumber).appendChild(value);
    }

    // oculta coluna
    this.hiddenCol = function (col) {
        this.getHeadCell(col).style.display = 'none';

        for (var i = 0; i < this.getRowCount(); i++)
            this.getCell(i, col).style.display = 'none';

    }

    // mostra coluna
    this.visibleCol = function (col) {
        this.getHeadCell(col).style.display = '';

        for (var i = 0; i < this.getRowCount(); i++)
            this.getCell(i, col).style.display = '';

    }

    // limpa a tabela
    this.clearRows = function () {
        for (var i = this.getRowCount() - 1; i >= 0; i--)
            this.deleteRow(i);
    }

    // limpa a tabela a partir das linhas não selecionadas
    this.clearRowsNotSelected = function (col) {
        for (var i = this.getRowCount() - 1; i >= 0; i--) {
            if (!this.getCellObject(i, col).checked) {
                this.deleteRow(i);
            }
        }
    }

    // desmarca todas as linhas (checkbox)
    this.clearSelection = function (col) {
        for (var i = 0; i < this.getRowCount(); i++)
            this.getCellObject(i, col).checked = false;
    }

    // marca todas as linhas (checkbox)
    this.checkAll = function (col) {
        for (var i = 0; i < this.getRowCount(); i++)
            this.getCellObject(i, col).checked = true;
    }

    // obt�m o n�mero de c�lulas selecionadas (checkbox)
    this.getSelCount = function (col) {
        var count = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).checked)
                count++;
        }

        return count;
    }

    // obt�m o n�mero de c�lulas selecionadas desabilitadas (checkbox)
    this.getSelCountDisabled = function (col) {
        var count = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).disabled == true) {
                if (this.getCellObject(i, col).checked) {
                    count++;
                }
            }
        }

        return count;
    }

    //Pegar os itens selecionado com atributo
    this.getSelCountAttributeValue = function (col, atributo, valor) {
        var count = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).getAttribute(atributo) == valor) {
                if (this.getCellObject(i, col).checked) {
                    count++;
                }
            }
        }

        return count;
    }


    this.getSelCountAttributeDifValue = function (col, atributo, valor) {
        var count = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).getAttribute(atributo) != valor) {
                if (this.getCellObject(i, col).checked) {
                    count++;
                }
            }
        }

        return count;
    }

    // obt�m o n�mero das linhas selecionadas
    this.getSelectedRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).checked)
                count.push(i);
        }

        return count;
    }

    this.getRowByRowData = function (value) {

        for (var i = 0; i < this.getRowCount(); i++) {
            if (parseInt(this.getRowData(i)) === parseInt(value)) {
                return i;
                //i = 99999;
            }
        }

        //return x;
    };

    this.getRowByRowDataText = function (value) {

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getRowData(i) === value) {
                return i;
                //i = 99999;
            }
        }

        //return x;
    };

    // obt�m o n�mero das linhas selecionadas
    this.getRowDataSelectedRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).checked)
                count.push(this.getRowData(i));
        }

        return count;
    }

    this.getCellTextSelectedRows = function (colSelected, colNumber) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, colSelected).checked)
                count.push(this.getCellText(i, colNumber));
        }

        return count;
    }

    // obtem os rowsdatas das linhas da tabela
    this.getRowsData = function () {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            //if (this.getCellObject(i, col).checked)
            count.push(this.getRowData(i));
        }

        return count;
    }

    // obtem os valores (texto) da coluna passada das linhas da tabela
    this.getContentMoneyRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (Number.parseFloat(this.getCellText(i, col)) <= 0) {
                count.push('0');
            } else {
                count.push(this.getCellText(i, col).replace(/\./gi, '').replace(/\,/gi, '.'));
            }
        }

        return count;
    };


    this.getCellAttributeMoneyRows = function (col, atributo) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (Number.parseFloat(this.getCell(i, col).getAttribute(atributo)) <= 0) {
                count.push('0');
            } else {
                count.push(this.getCell(i, col).getAttribute(atributo).replace(/\./gi, '').replace(/\,/gi, '.'));
            }
        }

        return count;
    };



    this.getRowAttributeMoneyRows = function (atributo) {
        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            if (Number.parseFloat(this.getRow(i).getAttribute(atributo)) <= 0)
                count.push('0');
            else
                count.push(Number.parseFloat(this.getRow(i).getAttribute(atributo)));
        }
        return count;
    };

    this.getRowAttributeText = function (atributo) {
        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getRow(i).getAttribute(atributo).encodeText());
        }
        return count;
    };

    this.getContentObjectRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).innerHTML);
        }

        return count;
    };

    this.getContentObjectRowsId = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).id);
        }

        return count;
    };

    this.getContentObjectRowsSrc = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).src);
        }

        return count;
    };

    this.getContentObjectRowsSrcFile = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            //  count.push(this.getCellObject(i, col).src);

            if (this.getCellObject(i, col).src.indexOf('/') == -1) {
                count.push(this.getCellObject(i, col).src);
            } else {
                count.push(this.getCellObject(i, col).src.split('/')[this.getCellObject(i, col).src.split('/').length - 1]);
            }
        }

        return count;
    };

    this.getContentObjectAttributeValueRows = function (col, atributo) {

        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).getAttribute(atributo).encodeText());
        }

        return count;
    };

    this.getContentObjectCheckedAttributeValueRows = function (col, atributo) {

        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).type == 'checked') {
                if (this.getCellObject(i, col).checked) {
                    count.push(this.getCellObject(i, col).getAttribute(atributo).encodeText());
                }
            }
        }

        return count;
    };

    this.getContentAttributeTextRows = function (atributo) {

        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getRow(i).getAttribute(atributo).encodeText());
        }

        return count;
    };

    this.getContentAttributeValueRows = function (col, atributo) {

        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCell(i, col).getAttribute(atributo).encodeText());
        }

        return count;
    };

    this.getContentAttributeMoneyValueRows = function (col, atributo) {

        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(Number.parseFloat(this.getCell(i, col).getAttribute(atributo)));
        }

        return count;
    };

    this.getContentObjectValueRows = function (col) {
        //Obt? os valores dos objetos dentro da c?ula
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).value);
        }

        return count;
    };

    this.getContentObjectValueCheckedRows = function (colCheck, col) {

        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, colCheck).checked) {
                count.push(this.getCellObject(i, col).value);
            }
        }

        return count;
    };

    this.getContentObjectInnerHTMLRows = function (col) {
        //Obt? os valores dos objetos dentro da c?ula
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).innerHTML);
        }

        return count;
    };

    this.getContentObjectCheckRows = function (col) {
        //Obt? os valores dos objetos dentro da c?ula
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push((this.getCellObject(i, col).checked ? 1 : 0));
        }

        return count;
    };

    this.getContentIdObjectCheckRows = function (col) {
        //Obt? os ids dos objetos selecionados
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).checked) {
                count.push(this.getCellObject(i, col).id);
            }
        }

        return count;
    };

    this.getContentObjectValueMoneyRows = function (col) {
        //Obt? os valores dos objetos dentro da c?ula
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            //  count.push(this.getCellObject(i, col).value.replace(/\./gi, '').replace(/\,/gi, '.'));
            count.push(Number.parseFloat(this.getCellObject(i, col).value));
        }

        return count;
    };

    //Pega o value de algum objeto dentro da div
    this.getContentObjectValueChildRows = function (col, posicaoChild, replace) {
        //Objetos com ID
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push((replace ? this.getCellObject(i, col).childNodes[posicaoChild].value.replace('.', '').replace(',', '.') : this.getCellObject(i, col).childNodes[posicaoChild].value));
        }

        return count;
    };

    this.getContentObjectNameRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).getAttribute('name'));
        }

        return count;
    };


    this.getContentObjectNameCols = function (row) {
        var count = Array();

        for (var c = 0; c < this.getColCount(row); c++) {
            count.push(this.getCellObject(row, c).getAttribute('name'));
        }

        return count;
    };

    this.getContentObjectNameMoneyRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).name.replace(/\./gi, '').replace(/\,/gi, '.'));
        }

        return count;
    };

    //Pega o value de algum objeto dentro da div
    this.getContentObjectValueChildRows = function (col, posicaoChild, replace) {
        //Objetos com ID
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push((replace ? this.getCellObject(i, col).childNodes[posicaoChild].value.replace('.', '').replace(',', '.') : this.getCellObject(i, col).childNodes[posicaoChild].value));
        }

        return count;
    };


    this.getContentObjectCheckChildRows = function (col, posicaoChild) {
        //Objetos com ID
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push((this.getCellObject(i, col).childNodes[posicaoChild].checked ? "1" : "0"));
        }

        return count;
    };

    //Pega o name de algum objeto dentro da div
    this.getContentObjectNameChildRows = function (col, posicaoChild, replace) {
        //Objetos com ID
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push((replace ? this.getCellObject(i, col).childNodes[posicaoChild].name.replace('.', '').replace(',', '.') : this.getCellObject(i, col).childNodes[posicaoChild].name));
        }

        return count;
    };

    this.getContentObjectTitleChildRows = function (col, posicaoChild) {
        //Objetos com title
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).childNodes[posicaoChild].title);
        }

        return count;
    };

    this.getContentText = function (col) {
        var count = '';

        for (var i = 0; i < this.getRowCount(); i++) {
            if (count === '')
                count = this.getCellText(i, col);
            else
                count += '#' + this.getCellText(i, col);

        }

        return count;
    };

    this.getContentTextRowChecked = function (colChecked, col) {
        var count = '';

        for (var i = 0; i < this.getRowCount(); i++) {

            if (this.getCellObject(i, colChecked).checked) {
                if (count === '')
                    count = this.getCellText(i, col);
                else
                    count += '#' + this.getCellText(i, col);
            }
        }

        return count;
    };

    this.getContentTextCrio = function (col) {

        var count = '';

        for (var i = 0; i < this.getRowCount(); i++) {
            if (i == 0)
                count = this.getCellText(i, col).encodeText();
            else
                count += '|CRIO|' + this.getCellText(i, col).encodeText();

        }

        return count;
    };

    this.getContentObjectInnerHTMLCrio = function (col) {

        var count = '';

        for (var i = 0; i < this.getRowCount(); i++) {
            if (i == 0)
                count = this.getCellObject(i, col).innerHTML.encodeText();
            else
                count += '|CRIO| ' + this.getCellObject(i, col).innerHTML.encodeText();

        }

        return count;
    };


    this.getContentObjectMoneyRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, col).id == '') {
                count.push('0');
            } else {
                count.push(this.getCellObject(i, col).id.replace(/\./gi, '').replace(/\,/gi, '.'));
            }
        }

        return count;
    };

    this.getContentRows = function (col) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellText(i, col));
        }

        return count;
    };

    this.getCellAttributeRows = function (col, atributo) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCell(i, col).getAttribute(atributo));
        }

        return count;
    };


    this.getCellAttributeTextCRIORows = function (col, atributo) {

        var count = '';

        for (var i = 0; i < this.getRowCount(); i++) {
            if (i == 0)
                count = this.getCell(i, col).getAttribute(atributo).encodeText();
            else
                count += '|CRIO|' + this.getCell(i, col).getAttribute(atributo).encodeText();
        }

        return count;

    };

    this.getContentRowsByChecked = function (col, colCheck) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, colCheck).checked) {
                count.push(this.getCellText(i, col));
            }
        }

        return count;
    };

    this.getContentRowsCaracter = function (col, caracter) {
        var count = Array();

        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellText(i, col).replace(/,/gi, caracter));
        }

        return count;
    };

    this.getContentObjectAttributeValueRows = function (col, atributo) {

        var count = Array();
        for (var i = 0; i < this.getRowCount(); i++) {
            count.push(this.getCellObject(i, col).getAttribute(atributo).encodeText());
        }

        return count;
    };

    this.addColGroup = function (span, styles) {
        var colgroup = document.createElement('colgroup');
        colgroup.span = span;

        //  if (styles <> '') {
        //  colgroup.style.visibility = ;
        //}

        this.thead.appendChild(colgroup);
    }

    // adiciona Coluna
    this.addCol = function (titulo) {
        this.addColHeader(titulo);

        for (var i = 0; i < this.getRowCount(); i++) {
            var td = document.createElement('td');
            td.appendChild(DOM.newText(' '));

            this.getRow(i).appendChild(td);
        }
    };

    // adiciona Coluna
    this.addColOnly = function (conteudo) {

        for (var i = 0; i < this.getRowCount(); i++) {
            var td = document.createElement('td');

            if (conteudo.nodeType == 1)
                td.appendChild(conteudo);
            else
                td.appendChild(DOM.newText(conteudo));

            this.getRow(i).appendChild(td);
        }
    };


    // adiciona Coluna
    this.addColOnlyRow = function (linha, conteudo) {


        var td = document.createElement('td');

        if (conteudo.nodeType == 1)
            td.appendChild(conteudo);
        else
            td.appendChild(DOM.newText(conteudo));

        this.getRow(linha).appendChild(td);

    };

    // adiciona Coluna no Cabeçalho
    this.addColHeaderObject = function (conteudo) {
        var th = document.createElement('th');

        if (conteudo.nodeType == 1)
            th.appendChild(conteudo);
        else
            th.appendChild(document.createTextNode(conteudo));

        this.thead.childNodes[0].appendChild(th);
    };


    // adiciona Coluna no Cabeçalho
    this.addColHeader = function (titulo) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(titulo));
        this.thead.childNodes[0].appendChild(th);
    };

    // adiciona rodapé
    this.addFooter = function (tdArray) {
        var tr = document.createElement('tr');

        for (var i = 0; i < tdArray.length; i++) {
            var td = document.createElement('td');
            td.appendChild(tdArray[i]);
            tr.appendChild(td);
        }

        this.tfoot.appendChild(tr);
    }

    //soma o atributo das linhas
    this.SumAttribute = function (attributo) {
        var valorTotal = 0;
        for (var i = 0; i < this.getRowCount(); i++) {
            valorTotal += Number.getFloat(this.getRow(i).getAttribute(attributo).toString().replace(/\./g, ''));
        }
        return valorTotal.toFixed(2);
    }

    //retorna o maior valor do atributo das linhas
    this.MaxAttribute = function (attributo) {
        var valor = 0;
        for (var i = 0; i < this.getRowCount(); i++) {
            if (Number.getFloat(this.getRow(i).getAttribute(attributo).toString().replace(/\./g, '')) > valor)
                valor = Number.getFloat(this.getRow(i).getAttribute(attributo).toString().replace(/\./g, ''));
        }
        return valor.toFixed(2);
    }

    //retorna o maior valor do atributo das linhas
    this.Max = function (coluna) {
        var valor = 0;
        for (var i = 0; i < this.getRowCount(); i++) {
            if (Number.getFloat(this.getCellText(i, coluna).toString().replace(/\./g, '')) > valor)
                valor = Number.getFloat(this.getCellText(i, coluna).toString().replace(/\./g, ''));
        }
        return valor.toFixed(2);
    }


    //soma o valor da tabela de determinada coluna
    this.SumCol = function (col) {
        var valorTotal = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            valorTotal += Number.getFloat(this.getCellText(i, col).toString().replace(/\./g, ''));
        }

        return valorTotal.toFixed(2);
    }

    //soma o valor da tabela dos objetos de determinada coluna
    this.SumColObject = function (col) {
        var valorTotal = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            valorTotal += Number.parseFloat(this.getCellObject(i, col).value);
        }

        return valorTotal;
    }

    //soma o valor da tabela dos objetos de determinada coluna que esteja selecionada (checked)
    this.SumColObjectChecked = function (col) {
        var valorTotal = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, 0).checked) {
                valorTotal += Number.parseFloat(this.getCellObject(i, col).value);
            }
        }

        return valorTotal;
    }

    //soma o valor da tabela dos objetos de determinada coluna que esteja selecionada (checked)
    this.SumColObjectMultChecked = function (colm, colv) {
        var valorTotal = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, 0).checked) {
                var x = 0;
                var y = 0;

                if (this.getCellObject(i, colv).type == 'text')
                    x = this.getCellObject(i, colv).value;
                else
                    x = this.getCellText(i, colv);

                if (this.getCellObject(i, colm).type == 'text')
                    y = this.getCellObject(i, colm).value;
                else
                    y = this.getCellText(i, colm);

                valorTotal += (Number.parseFloat(x) * Number.parseFloat(y));
            }
        }

        return valorTotal;
    }

    //soma os valores que estão em minutos da tabela de determinada coluna
    this.SumColMinutes = function (col) {

        var tempoTotal = 0;
        var minutos = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            tempoTotal += parseInt(this.getCellText(i, col).replace('min', ''));
        }

        minutos = tempoTotal;

        if (minutos === 0) {
            return '';
        } else if (minutos < 60) {
            return "(" + (minutos === 1 ? minutos + " minuto" : minutos + " minutos") + ")";
        } else {

            var hora = Math.floor(minutos / 60);
            var minuto = minutos % 60;
            return "(" + (hora === 1 ? hora + " hora" + (minuto === 0 ? '' : " e ") : hora + " horas" + (minuto === 0 ? '' : " e ")) + (minuto === 0 ? '' : (minuto === 1 ? " " + minuto + " minuto" : " " + minuto + " minutos")) + ")";
        }
    };

    this.SumColnoFixed = function (col) {
        var valorTotal = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            valorTotal += Number.getFloat(this.getCellText(i, col).toString().replace('.', ''));
        }

        return valorTotal;
    }

    //soma o valor da tabela de determinada coluna que esteja selecionada (checked)
    this.SumColChecked = function (col) {
        var valorTotal = 0;

        for (var i = 0; i < this.getRowCount(); i++) {
            if (this.getCellObject(i, 0).checked) {
                valorTotal += Number.getFloat(this.getCellText(i, col).toString().replace('.', ''));
            }

        }

        return valorTotal.toFixed(2);
    }

    this.setRowForegroundColor = function (row, color) {
        this.getRow(row).style.color = color;
    }

    this.setRowBackgroundColor = function (row, color) {
        if (row < 0)
            return;

        for (var col = 0; col < this.getRow(row).childNodes.length; col++) {
            this.getCell(row, col).style.backgroundColor = color;
        }
    }
}

/****************************************************************** // Window // ******************************************************************/

var Window = {
    getParameters: function () {
        var p = window.location.search;

        if (p == '')
            return null;

        var array = p.substr(1).split('&');

        for (var i = 0; i < array.length; i++) {
            array[i] = array[i].split('=');
        }

        return array;
    },
    getParameter: function (name) {
        var p = window.location.search;

        if (p == '')
            return null;

        var array = p.substr(1).split('&');

        for (var i = 0; i < array.length; i++) {
            var arrayItem = array[i].split('=');

            if (arrayItem[0] == name)
                return arrayItem[1];
        }

        return null;
    },
    getSize: function (height) {
        var ie = /msie/i.test(navigator.userAgent);
        var ieBox = ie && (document.compatMode == null || document.compatMode == "BackCompat");
        var aux;

        var canvasEl = ieBox ? document.body : document.documentElement;

        if (height)
            aux = window.innerHeight || canvasEl.clientHeight;
        else
            aux = window.innerWidth || canvasEl.clientWidth;

        return aux;
    }
};

ExecuteFunctionByName = function (functionName) {
    var args = Array.prototype.slice.call(arguments).splice(1);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();

    ns = namespaces.join('.');

    if (ns === '')
        ns = 'window';

    ns = eval(ns);
    return ns[func].apply(ns, args);
};

var Cookies = {
    setCookie: function (name, value, dias) {
        var dtmData = new Date();
        var strExpires;

        if (dias) {
            dtmData.setTime(dtmData.getTime() + (dias * 24 * 60 * 60 * 1000));
            strExpires = "; expires=" + dtmData.toGMTString();
        } else {
            strExpires = "";
        }

        document.cookie = name + "=" + value + strExpires + "; path=/";
    },
    getCookie: function (name) {
        var strNomeIgual = name + "=";
        var arrCookies = document.cookie.split(';');

        for (var i = 0; i < arrCookies.length; i++) {
            var strValorCookie = arrCookies[i];
            while (strValorCookie.charAt(0) == ' ') {
                strValorCookie = strValorCookie.substring(1, strValorCookie.length);
            }
            if (strValorCookie.indexOf(strNomeIgual) == 0) {
                return strValorCookie.substring(strNomeIgual.length, strValorCookie.length);
            }
        }
        return null;
    },
    delCookie: function (name) {
        this.setCookie(name, '', -1);
    }
}

var newAjax1 = {
    createObject: function () {
        var xmlHttp;

        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    return null;
                }
            }
        }
        return xmlHttp;
    }
}

function DialogUpload(div, nomeImg, path, funcao, tema) {
    div.innerHTML = '';
    DialogBox.imagePath = '/padrao/';

    //---------- FILE ----------//

    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "temp");
    iframe.setAttribute("name", "temp");
    iframe.setAttribute("width", "340");
    iframe.setAttribute("height", "405");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("style", "frameborder: none;");

    div.appendChild(iframe);

    iframe.src = DialogBox.imagePath + 'upload.php?nome=' + nomeImg + "&path=" + path + "&funcao=" + funcao + "&tema=" + tema;

    var div1 = DOM.newElement('div', 'divFooterR');
    document.body.appendChild(div1);
    var div2 = DOM.newElement('div', 'divFooterL');
    document.body.appendChild(div2);

    dialog = new DialogBox(div);
    dialog.setTitle('Upload Imagens (Jpg, Jpeg, Gif, Png, Bmp)');
    dialog.setPosition(-1, -1);
    dialog.setSize(358, 0);

    dialog.ShowCloseIcon();
    div.style.zIndex = 100;
    dialog.Show();
}

function DialogUploadRaiz(div, nomeImg, path, funcao, tema) {

    div.innerHTML = '';
    DialogBox.imagePath = 'padrao/';

    //---------- FILE ----------//

    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "temp");
    iframe.setAttribute("name", "temp");
    iframe.setAttribute("width", "340");
    iframe.setAttribute("height", "405");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("style", "frameborder: none;");

    div.appendChild(iframe);

    iframe.src = DialogBox.imagePath + 'upload.php?nome=' + nomeImg + "&path=" + path + "&funcao=" + funcao + "&tema=" + tema;

    var div1 = DOM.newElement('div', 'divFooterR');
    document.body.appendChild(div1);
    var div2 = DOM.newElement('div', 'divFooterL');
    document.body.appendChild(div2);

    dialog = new DialogBox(div);
    dialog.setTitle('Upload Imagens (Jpg, Jpeg, Gif, Png, Bmp)');
    dialog.setPosition(-1, -1);
    dialog.setSize(358, 0);

    dialog.ShowCloseIcon();
    div.style.zIndex = 100;
    dialog.Show();
}

function include(file_path) {

    var vetor = file_path.split("/");
    var arquivo = vetor[vetor.length - 1];

    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var vetor = scripts[i].src.split("/");
        var nome = vetor[vetor.length - 1];
        if (nome == arquivo) {
            return;
        }
    }

    var j = document.createElement("script");
    j.type = "text/javascript";
    j.src = file_path;
    var scripts = document.getElementsByTagName("script");
    document.getElementsByTagName('head')[0].insertBefore(j, scripts[0]);
}

function DialogUploadNovo(div, nomeImg, path, funcao, tema, imagePath, tiposdearquivos) {

    Selector.$(div).innerHTML = '';
    dialog = new caixaDialogo(div, 230, 440, imagePath, 1000);
    caixaDialogo.imagePath = imagePath;
    //---------- FILE ----------//
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "temp");
    iframe.setAttribute("name", "temp");
    iframe.setAttribute("width", "420");
    iframe.setAttribute("height", "230");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("style", "frameborder: none;");

    Selector.$(div).appendChild(iframe);
    iframe.src = caixaDialogo.imagePath + 'upload-easy.php?nome=' + nomeImg + "&path=" + path + "&funcao=" + funcao + "&tema=" + tema + "&arquivotipo=" + tiposdearquivos;
    dialog.Show();

}


function eElemento(tipo, id) {

    var as = document.getElementsByTagName(tipo);
    for (var i = 0; i < as.length; i++) {
        if (as[i].id == id) {
            return true;
        }
    }
    return false;
}




caixaDialogo = function (div, altura, largura, padrao, posicaoz) {

    // Bloqueio

    if (!eElemento('div', Selector.$('divBlock'))) {

        this.divBlock = document.createElement('div');
        this.divBlock.setAttribute("id", "divBlock");
    }

    this.divBlock.style.position = 'fixed';
    this.divBlock.style.backgroundColor = '#E5E5E5';
    this.divBlock.style.left = '0px';
    this.divBlock.style.top = "0px";
    this.divBlock.style.width = '100%';
    this.divBlock.style.height = '100%';
    this.divBlock.style.filter = 'alpha(opacity=80)';
    this.divBlock.style.opacity = 0.8;
    this.divBlock.style.cursor = 'not-allowed';
    this.divBlock.style.visibility = 'hidden';
    this.divBlock.align = "center";
    this.divBlock.style.zIndex = posicaoz;

    document.body.appendChild(this.divBlock);

    //calcula altura e largura da pagina
    var scrollX, scrollY;
    if (document.all) {
        if (!document.documentElement.scrollLeft)
            scrollX = document.body.scrollLeft;
        else
            scrollX = document.documentElement.scrollLeft;

        if (!document.documentElement.scrollTop)
            scrollY = document.body.scrollTop;
        else
            scrollY = document.documentElement.scrollTop;
    } else {
        scrollX = window.pageXOffset;
        scrollY = window.pageYOffset;
    }

    //this.divBlock.style.top = scrollY + 'px';
    // document.body.style.overflow = 'hidden';

    if (!eElemento('div', Selector.$('divClose'))) {
        this.divFechar = document.createElement('div');
        this.divFechar.setAttribute('id', 'divClose');
    }


    this.divFechar.style.top = (altura * -1) + 'px';
    this.divFechar.style.left = (largura / 2) - 5 + "px";

    this.divFechar.setAttribute('title', 'Fechar');
    this.divFechar.setAttribute('class', 'efeito-opacidade-75-01');
    this.divFechar.setAttribute('style', 'height:37px; width:37px; left:50%; top:50%; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute; visibility: hidden; margin-top:' + (((altura / 2) * -1) - 18.5) + 'px; margin-left:' + ((largura / 2) - 18.5) + 'px');
    this.divFechar.style.position = 'fixed';
    this.divFechar.style.zIndex = posicaoz + 1;
    this.divFechar.caixaDialogo = this;

    this.divFechar.onclick = function () {
        this.caixaDialogo.Close();
    };

    if (typeof (div) == "string") {

        Selector.$(div).setAttribute('style', 'margin-left:' + ((largura / 2) * -1) + 'px; margin-top:' + ((altura / 2) * -1) + 'px');
        Selector.$(div).style.height = altura + "px";
        Selector.$(div).style.width = largura + "px";
        Selector.$(div).style.left = "50%";
        Selector.$(div).style.top = "50%";
        Selector.$(div).setAttribute('class', 'divbranca');
        Selector.$(div).style.visibility = 'hidden';
        document.body.appendChild(Selector.$(div));
        Selector.$(div).style.position = "fixed";
        //  Selector.$(div).style.top = (((scrollY + (document.documentElement.clientHeight / 2)) - (altura / 2)) - 0) + 'px';
        //  Selector.$(div).style.left = ((document.documentElement.clientWidth / 2) - (largura / 2)) + "px";
    } else {
        div.setAttribute('style', 'margin-left:' + ((largura / 2) * -1) + 'px; margin-top:' + ((altura / 2) * -1) + 'px');
        div.style.height = altura + "px";
        div.style.width = largura + "px";
        Selector.$(div).style.left = "50%";
        Selector.$(div).style.top = "50%";
        div.setAttribute('class', 'divbranca');
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        div.style.position = "fixed";
        //  div.style.top = (((scrollY + (document.documentElement.clientHeight / 2)) - (altura / 2)) - 0) + 'px';
        //  div.style.left = ((document.documentElement.clientWidth / 2) - (largura / 2)) + "px";
    }

    if (typeof (div) === "string") {
        Selector.$(div).style.zIndex = posicaoz + 1;
    } else {
        div.style.zIndex = posicaoz + 1;
    }

    document.body.appendChild(this.divFechar);
    // this.divFechar.style.top = ((((scrollY + (document.documentElement.clientHeight / 2)) - (altura / 2)) - 0) - 20) + 'px';
    // this.divFechar.style.left = (((document.documentElement.clientWidth / 2) + (largura / 2)) - 5) + "px";



    this.Realinhar = function (altura, largura) {


        //calcula altura e largura da pagina
        var scrollX, scrollY;
        if (document.all) {
            if (!document.documentElement.scrollLeft)
                scrollX = document.body.scrollLeft;
            else
                scrollX = document.documentElement.scrollLeft;

            if (!document.documentElement.scrollTop)
                scrollY = document.body.scrollTop;
            else
                scrollY = document.documentElement.scrollTop;
        } else {
            scrollX = window.pageXOffset;
            scrollY = window.pageYOffset;
        }




        this.divFechar.style.top = (altura * -1) + 'px';
        this.divFechar.style.left = (largura / 2) - 5 + "px";

        this.divFechar.setAttribute('title', 'Fechar');
        this.divFechar.setAttribute('style', 'height:37px; width:37px; left:50%; top:50%; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute;  margin-top:' + (((altura / 2) * -1) - 18.5) + 'px; margin-left:' + ((largura / 2) - 18.5) + 'px');
        this.divFechar.style.position = 'fixed';
        this.divFechar.style.zIndex = posicaoz + 1;


        if (typeof (div) == "string") {

            Selector.$(div).setAttribute('style', 'margin-left:' + ((largura / 2) * -1) + 'px; margin-top:' + ((altura / 2) * -1) + 'px');
            Selector.$(div).style.height = altura + "px";
            Selector.$(div).style.width = largura + "px";
            Selector.$(div).style.left = "50%";
            Selector.$(div).style.top = "50%";
            Selector.$(div).style.position = "fixed";

        } else {
            div.setAttribute('style', 'margin-left:' + ((largura / 2) * -1) + 'px; margin-top:' + ((altura / 2) * -1) + 'px');
            div.style.height = altura + "px";
            div.style.width = largura + "px";
            Selector.$(div).style.left = "50%";
            Selector.$(div).style.top = "50%";
            div.style.position = "fixed";

        }

        if (typeof (div) === "string") {
            Selector.$(div).style.zIndex = posicaoz + 1;
        } else {
            div.style.zIndex = posicaoz + 1;
        }



    }


    this.Show = function () {
        this.divBlock.style.visibility = 'visible';
        this.divFechar.style.visibility = 'visible';

        if (typeof (div) == "string") {
            Selector.$(div).style.visibility = 'visible';
        } else {
            div.style.visibility = 'visible';
        }

        document.body.style.overflow = 'hidden';
    }

    this.Close = function () {
        this.divBlock.style.visibility = 'hidden';
        this.divFechar.style.visibility = 'hidden';
        if (typeof (div) == "string") {
            Selector.$(div).style.visibility = 'hidden';
        } else {
            div.style.visibility = 'hidden';
        }

        document.body.style.overflow = 'visible';
    }

    this.HideCloseIcon = function () {
        this.divFechar.style.visibility = 'hidden';
    }

    this.setColorBlock = function (cor) {
        this.divBlock.style.backgroundColor = cor;
    }

    this.setOpacityBlock = function (transparencia) {
        this.divBlock.style.filter = 'alpha(opacity=' + transparencia + ')';
        this.divBlock.style.opacity = (transparencia / 100);
    }

    this.setHeight = function (div, heigth) {
        Selector.$(div).style.height = heigth + "px";
    }

    this.setWidth = function (div, width) {
        Selector.$(div).style.width = width + "px";
    }

    caixaDialogo.imagePath = './imagens/';
}


caixaDialogoOriginal = function (div, altura, largura, padrao, posicaoz) {

    // Bloqueio
    this.divBlock = document.createElement('div');
    this.divBlock.setAttribute("id", "divBlock");
    this.divBlock.style.position = 'absolute';
    this.divBlock.style.backgroundColor = '#E5E5E5';
    this.divBlock.style.left = '0px';
    this.divBlock.style.top = "0px";
    this.divBlock.style.width = '100%';
    this.divBlock.style.height = '100%';
    this.divBlock.style.filter = 'alpha(opacity=80)';
    this.divBlock.style.opacity = 0.8;
    this.divBlock.style.cursor = 'not-allowed';
    this.divBlock.style.visibility = 'hidden';
    this.divBlock.align = "center";
    this.divBlock.style.zIndex = posicaoz;
    Selector.$(div).style.zIndex = posicaoz + 1;
    document.body.appendChild(this.divBlock);

    //calcula altura e largura da pagina
    var scrollX, scrollY;
    if (document.all) {
        if (!document.documentElement.scrollLeft)
            scrollX = document.body.scrollLeft;
        else
            scrollX = document.documentElement.scrollLeft;

        if (!document.documentElement.scrollTop)
            scrollY = document.body.scrollTop;
        else
            scrollY = document.documentElement.scrollTop;
    } else {
        scrollX = window.pageXOffset;
        scrollY = window.pageYOffset;
    }

    this.divBlock.style.top = scrollY + 'px';
    // document.body.style.overflow = 'hidden';

    if (!eElemento('div', Selector.$('divClose'))) {
        this.divFechar = document.createElement('div');
        this.divFechar.setAttribute('id', 'divClose');
    }
    this.divFechar.setAttribute('title', 'Fechar');
    this.divFechar.style.position = 'absolute';
    this.divFechar.setAttribute('class', 'efeito-opacidade-75-01');
    this.divFechar.setAttribute('style', 'height:37px; width:37px; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute; visibility: hidden');
    this.divFechar.style.zIndex = posicaoz + 1;
    this.divFechar.caixaDialogo = this;

    this.divFechar.onclick = function () {
        this.caixaDialogo.Close();
    };

    Selector.$(div).style.height = altura + "px";
    Selector.$(div).style.width = largura + "px";
    Selector.$(div).setAttribute('class', 'divbranca');
    Selector.$(div).style.visibility = 'hidden';
    document.body.appendChild(Selector.$(div));
    Selector.$(div).style.position = "absolute";
    Selector.$(div).style.top = (((scrollY + (document.documentElement.clientHeight / 2)) - (altura / 2)) - 0) + 'px';
    Selector.$(div).style.left = ((document.documentElement.clientWidth / 2) - (largura / 2)) + "px";
    document.body.appendChild(this.divFechar);
    this.divFechar.style.top = ((((scrollY + (document.documentElement.clientHeight / 2)) - (altura / 2)) - 0) - 20) + 'px';
    this.divFechar.style.left = (((document.documentElement.clientWidth / 2) + (largura / 2)) - 5) + "px";

    this.Show = function () {
        this.divBlock.style.visibility = 'visible';
        this.divFechar.style.visibility = 'visible';
        Selector.$(div).style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    this.Close = function () {
        this.divBlock.style.visibility = 'hidden';
        this.divFechar.style.visibility = 'hidden';
        Selector.$(div).style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
    }

    this.Kill = function () {
        this.parentElement.removeChild(divBlock);
        this.parentElement.removeChild(divFechar);
        Selector.$(div).style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
    }

    this.HideCloseIcon = function () {
        this.divFechar.style.visibility = 'hidden';
    }


    caixaDialogo.imagePath = './imagens/';
}


function graficoBarraSimples(vetor, div, distancia, cor, horizontal) {

    if (typeof (div) == "string") {
        var obj = Selector.$(div);
    } else {
        var obj = div;
    }

    if (cor == '') {
        cor = "#000";
    } else {
        if (cor.indexOf("#") < 0) {
            cor = "#" + cor;
        }
    }

    if (horizontal === '') {
        if (obj.clientWidth > obj.clientHeight) {
            horizontal = true;
        } else {
            horizontal = false;
        }
    }

    if (horizontal) {
        var larguradiv = obj.clientWidth;
        var largura = (larguradiv / vetor.length) - parseFloat(distancia);
    } else {
        var alturadiv = obj.clientHeight;
        var altura = (alturadiv / vetor.length) - parseFloat(distancia);
    }

    var maior = parseFloat(Math.max.apply(Math, vetor));

    for (var i = 0; i < vetor.length; i++) {

        var grafico = DOM.newElement('div');

        if (horizontal) {
            grafico.setAttribute('style', 'width:' + largura + 'px; height:' +
                ((parseFloat(vetor[i]) * 100) / maior) + '%; margin-right:' +
                parseFloat(distancia) + 'px; display: inline-block; background:' + cor + ';');
            obj.appendChild(grafico);
        } else {
            grafico.setAttribute('style', 'width:' + ((parseFloat(vetor[i]) * 100) / maior) + '%; height:' +
                altura + 'px; margin-bottom:' +
                parseFloat(distancia) + 'px; display: block; background:' + cor + ';');
            obj.appendChild(grafico);
        }
    }

}

function ExisteElemento(type, id) {

    var as = document.getElementsByTagName(type);
    for (var i = 0; i < as.length; i++) {
        if (as[i].id == id) {
            return true;
        }
    }
    return false;
}


caixaDialogoResponsiva = function (div, altura, largura, padrao, posicaoz) {

    criaDiv(div);

    if (posicaoz <= 0) {
        var novaPosicao = 1;
        var divs = document.getElementsByClassName('divdialogoresponsivo');
        for (var i = 0; i < divs.length; i++) {
            if (parseInt(divs[i].style.zIndex) > novaPosicao)
                novaPosicao = parseInt(divs[i].style.zIndex);
        }

        posicaoz = parseInt(novaPosicao) + 10;

    }


    Selector.$(div).setAttribute('class', 'divdialogoresponsivo');

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = "#divBlock" + div + " { " +
        "width:100%;" +
        "height:100%;" +
        "text-align:center;" +
        "position:fixed;" +
        "top:0px;" +
        "right:0px;" +
        "overflow:auto;" +
        "vertical-align:middle;}" +
        "#divBlockTransp" + div + " { " +
        "cursor: not-allowed; " +
        "width:100%;" +
        "height:100%;" +
        "background:#000;" +
        "text-align:center;" +
        "position:fixed;" +
        "top:0px;" +
        "right:0px;" +
        "overflow:auto;" +
        "vertical-align:middle;}" +
        " #divClose" + div + " {" +
        "background-repeat:no-repeat; background-position:right;" +
        "background-image:url(" + padrao + "imagens/fechar.png); " +
        "margin-left:" + ((largura / 2) - 22) + "px;" +
        "margin-top:" + (((altura / 2) * -1) - 18) + "px;" +
        "position:fixed;" +
        "top:50%;" +
        "left:50%;" +
        "z-index:" + (posicaoz + 2) + ";" +
        "height:38px;" +
        "width:100%;" +
        "max-width:40px;" +
        "}" +
        " #" + div + " {" +
        "font-size:13px;" +
        "line-height:normal;" +
        "overflow:auto;" +
        "height:auto;" +
        "width:100%;" +
        "max-width:" + largura + "px;" +
        "min-height: " + altura + "px;" +
        "background:#FFFFFF;" +
        "text-align:left;" +
        "padding:20px;" +
        "box-sizing:border-box;" +
        "position:relative;" +
        "top:50%;" +
        "left:50%;" +
        "margin-left:" + ((largura / 2) * -1) + "px;" +
        "margin-top:" + ((altura / 2) * -1) + "px;" +
        "} " +
        "@media screen and (min-height: 0px) and (max-width: " + largura + "px) {" +
        " #divClose" + div + " {" +
        "text-align:right;" +
        "position:relative;" +
        "min-height:auto;" +
        "height:38px;" +
        "top:auto;" +
        "left:auto;" +
        "right:0px;" +
        "margin-left:0px;" +
        "margin-bottom:-18px;" +
        "float:right;" +
        "margin-top:0px;" +
        "max-width:40px;" +
        "width:100%;" +
        "}" +
        " #" + div + " {" +
        "overflow:auto;" +
        "height:auto;" +
        "max-height:auto;" +
        "position:relative;" +
        "left:auto;" +
        "top:auto;" +
        "margin-left:0px;" +
        "margin-top:0px;" +
        "width:100%;" +
        "}" +
        "}" +
        "@media screen and (max-height: " + altura + "px) {" +
        " #" + div + "2 {" +
        "top:auto;" +
        "}" +
        "}";

    var achou = false;
    var linksDinamicos = document.getElementsByTagName("style");
    for (var i = 0; i < linksDinamicos.length; i++) {
        if (linksDinamicos[i].innerHTML === style.innerHTML) {
            achou = true;
            break;
        }
    }
    if (!achou) {
        var links = document.getElementsByTagName("link");
        document.getElementsByTagName('head')[0].insertBefore(style, links[0]);
    }

    // Bloqueio

    if (!eElemento('div', Selector.$('divBlockTransp' + div))) {
        this.divBlockTransp = document.createElement('div');
        this.divBlockTransp.setAttribute("id", "divBlockTransp" + div);
    }

    document.body.appendChild(this.divBlockTransp);
    this.divBlockTransp.style.visibility = 'hidden';
    this.divBlockTransp.style.zIndex = posicaoz;
    this.divBlockTransp.style.filter = 'alpha(opacity=45)';
    this.divBlockTransp.style.opacity = (45 / 100);


    if (!eElemento('div', Selector.$('divBlock' + div))) {
        this.divBlock = document.createElement('div');
        this.divBlock.setAttribute("id", "divBlock" + div);
    }

    this.divBlock.style.visibility = 'hidden';
    this.divBlock.style.zIndex = posicaoz + 2;
    //this.divBlock.style.filter = 'alpha(opacity=45)';
    //this.divBlock.style.opacity = (45 / 100);
    document.body.appendChild(this.divBlock);

    if (!eElemento('div', Selector.$('divClose' + div))) {
        this.divFechar = document.createElement('div');
        this.divFechar.setAttribute('id', 'divClose' + div);
    }

    this.divFechar.setAttribute('title', 'Fechar');
    this.divFechar.setAttribute('class', 'efeito-opacidade-75-01');
    //this.divFechar.setAttribute('style', 'height:37px; width:37px; left:50%; top:50%; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute; visibility: hidden; margin-top:' + (((altura / 2) * -1) - 18.5) + 'px; margin-left:' + ((largura / 2) - 18.5) + 'px');
    this.divFechar.caixaDialogo = this;

    this.divFechar.onclick = function () {
        this.caixaDialogo.Close();
    };

    this.divBlock.appendChild(this.divFechar);
    Selector.$(div).style.visibility = 'hidden';
    //document.body.appendChild(Selector.$(div));
    this.divBlock.appendChild(Selector.$(div));

    Selector.$(div).style.zIndex = posicaoz + 1;
    // document.body.appendChild(this.divFechar);


    this.Realinhar = function (altura, largura) {


        this.divFechar.style.top = (altura * -1) + 'px';
        this.divFechar.style.left = (largura / 2) - 5 + "px";

        this.divFechar.setAttribute('title', 'Fechar');
        this.divFechar.setAttribute('style', 'height:37px; width:37px; left:50%; top:50%; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute;  margin-top:' + (((altura / 2) * -1) - 18.5) + 'px; margin-left:' + ((largura / 2) - 18.5) + 'px');
        this.divFechar.style.position = 'fixed';
        this.divFechar.style.zIndex = posicaoz + 4;



        Selector.$(div).setAttribute('style', 'margin-left:' + ((largura / 2) * -1) + 'px; margin-top:' + ((altura / 2) * -1) + 'px');
        //Selector.$(div).style.height = altura + "px";
        //Selector.$(div).style.width = largura + "px";

        Selector.$(div).style.minHeight = altura + "px";
        Selector.$(div).style.maxWidth = largura + "px";
        Selector.$(div).style.left = "50%";
        Selector.$(div).style.top = "50%";
        Selector.$(div).style.position = "fixed";
        Selector.$(div).style.zIndex = posicaoz + 2;
    };

    this.Show = function () {
        this.divBlockTransp.style.visibility = 'visible';
        this.divBlock.style.visibility = 'visible';
        this.divFechar.style.visibility = 'visible';
        Selector.$(div).style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    this.Close = function () {
        this.divBlock.style.visibility = 'hidden';
        this.divBlockTransp.style.visibility = 'hidden';
        this.divFechar.style.visibility = 'hidden';
        Selector.$(div).style.visibility = 'hidden';
        document.body.style.overflow = 'visible';

        document.body.removeChild(this.divBlock);
        document.body.removeChild(this.divBlockTransp);
    }

    this.HideCloseIcon = function () {
        this.divFechar.style.visibility = 'hidden';
    }

    this.ShowCloseIcon = function () {
        this.divFechar.style.visibility = 'visible';
    }

    this.setColorBlock = function (cor) {
        this.divBlockTransp.style.backgroundColor = cor;
    }

    this.setOpacityBlock = function (transparencia) {
        this.divBlockTransp.style.filter = 'alpha(opacity=' + transparencia + ')';
        this.divBlockTransp.style.opacity = (transparencia / 100);
    }

    this.setHeight = function (div, height) {
        Selector.$(div).style.height = height + "px";
    }

    this.setWidth = function (div, width) {
        Selector.$(div).style.width = width + "px";
    }

}


dialogoResponsiva = function (div, altura, largura) {

    var padrao = (typeof (caminhoPadraoProjeto) == "string" ? caminhoPadraoProjeto : '../padrao/');

    var novaPosicao = 1;
    var divs = document.getElementsByClassName('divdialogoresponsivo');
    for (var i = 0; i < divs.length; i++) {
        if (parseInt(divs[i].style.zIndex) > novaPosicao)
            novaPosicao = parseInt(divs[i].style.zIndex);
    }

    var posicaoz = parseInt(novaPosicao) + 10;


    Selector.$(div).setAttribute('class', 'divdialogoresponsivo');

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = "#divBlock" + div + " { " +
        "width:100%;" +
        "height:100%;" +
        "text-align:center;" +
        "position:fixed;" +
        "top:0px;" +
        "right:0px;" +
        "overflow:auto;" +
        "vertical-align:middle;}" +
        "#divBlockTransp" + div + " { " +
        "cursor: not-allowed; " +
        "width:100%;" +
        "height:100%;" +
        "background:#000;" +
        "text-align:center;" +
        "position:fixed;" +
        "top:0px;" +
        "right:0px;" +
        "overflow:auto;" +
        "vertical-align:middle;}" +
        " #divClose" + div + " {" +
        "background-repeat:no-repeat; background-position:right;" +
        "background-image:url(" + padrao + "imagens/fechar.png); " +
        "margin-left:" + ((largura / 2) - 22) + "px;" +
        "margin-top:" + (((altura / 2) * -1) - 18) + "px;" +
        "position:fixed;" +
        "top:50%;" +
        "left:50%;" +
        "z-index:" + (posicaoz + 2) + ";" +
        "height:38px;" +
        "width:100%;" +
        "max-width:40px;" +
        "}" +
        " #" + div + " {" +
        "font-size:13px;" +
        "line-height:normal;" +
        "overflow:auto;" +
        "height:auto;" +
        "width:100%;" +
        "max-width:" + largura + "px;" +
        "min-height: " + altura + "px;" +
        "background:#FFFFFF;" +
        "text-align:left;" +
        "padding:20px;" +
        "box-sizing:border-box;" +
        "position:fixed;" +
        "top:50%;" +
        "left:50%;" +
        "margin-left:" + ((largura / 2) * -1) + "px;" +
        "margin-top:" + ((altura / 2) * -1) + "px;" +
        "} " +
        "@media screen and (min-height: 0px) and (max-width: " + largura + "px) {" +
        " #divClose" + div + " {" +
        "text-align:right;" +
        "position:relative;" +
        "min-height:auto;" +
        "height:38px;" +
        "top:auto;" +
        "left:auto;" +
        "right:0px;" +
        "margin-left:0px;" +
        "margin-bottom:-18px;" +
        "float:right;" +
        "margin-top:0px;" +
        "max-width:40px;" +
        "width:100%;" +
        "}" +
        " #" + div + " {" +
        "overflow:auto;" +
        "height:auto;" +
        "max-height:auto;" +
        "position:relative;" +
        "left:auto;" +
        "top:auto;" +
        "margin-left:0px;" +
        "margin-top:0px;" +
        "width:100%;" +
        "}" +
        "}" +
        "@media screen and (max-height: " + altura + "px) {" +
        " #" + div + "2 {" +
        "top:auto;" +
        "}" +
        "}";

    var achou = false;
    var linksDinamicos = document.getElementsByTagName("style");
    for (var i = 0; i < linksDinamicos.length; i++) {
        if (linksDinamicos[i].innerHTML === style.innerHTML) {
            achou = true;
            break;
        }
    }
    if (!achou) {
        var links = document.getElementsByTagName("link");
        document.getElementsByTagName('head')[0].insertBefore(style, links[0]);
    }

    // Bloqueio

    if (!eElemento('div', Selector.$('divBlockTransp' + div))) {
        this.divBlockTransp = document.createElement('div');
        this.divBlockTransp.setAttribute("id", "divBlockTransp" + div);
    }

    document.body.appendChild(this.divBlockTransp);
    this.divBlockTransp.style.visibility = 'hidden';
    this.divBlockTransp.style.zIndex = posicaoz;
    this.divBlockTransp.style.filter = 'alpha(opacity=45)';
    this.divBlockTransp.style.opacity = (45 / 100);


    if (!eElemento('div', Selector.$('divBlock' + div))) {
        this.divBlock = document.createElement('div');
        this.divBlock.setAttribute("id", "divBlock" + div);
    }

    this.divBlock.style.visibility = 'hidden';
    this.divBlock.style.zIndex = posicaoz + 1;
    //this.divBlock.style.filter = 'alpha(opacity=45)';
    //this.divBlock.style.opacity = (45 / 100);
    document.body.appendChild(this.divBlock);

    if (!eElemento('div', Selector.$('divClose' + div))) {
        this.divFechar = document.createElement('div');
        this.divFechar.setAttribute('id', 'divClose' + div);
    }

    this.divFechar.setAttribute('title', 'Fechar');
    this.divFechar.setAttribute('class', 'efeito-opacidade-75-01');
    //this.divFechar.setAttribute('style', 'height:37px; width:37px; left:50%; top:50%; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute; visibility: hidden; margin-top:' + (((altura / 2) * -1) - 18.5) + 'px; margin-left:' + ((largura / 2) - 18.5) + 'px');
    this.divFechar.caixaDialogo = this;

    this.divFechar.onclick = function () {
        this.caixaDialogo.Close();
    };

    this.divBlock.appendChild(this.divFechar);
    Selector.$(div).style.visibility = 'hidden';
    //document.body.appendChild(Selector.$(div));
    this.divBlock.appendChild(Selector.$(div));

    Selector.$(div).style.zIndex = posicaoz + 1;
    // document.body.appendChild(this.divFechar);


    this.Realinhar = function (altura, largura) {


        this.divFechar.style.top = (altura * -1) + 'px';
        this.divFechar.style.left = (largura / 2) - 5 + "px";

        this.divFechar.setAttribute('title', 'Fechar');
        this.divFechar.setAttribute('style', 'height:37px; width:37px; left:50%; top:50%; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute;  margin-top:' + (((altura / 2) * -1) - 18.5) + 'px; margin-left:' + ((largura / 2) - 18.5) + 'px');
        this.divFechar.style.position = 'fixed';
        this.divFechar.style.zIndex = posicaoz + 4;



        Selector.$(div).setAttribute('style', 'margin-left:' + ((largura / 2) * -1) + 'px; margin-top:' + ((altura / 2) * -1) + 'px');
        //Selector.$(div).style.height = altura + "px";
        //Selector.$(div).style.width = largura + "px";

        Selector.$(div).style.minHeight = altura + "px";
        Selector.$(div).style.maxWidth = largura + "px";
        Selector.$(div).style.left = "50%";
        Selector.$(div).style.top = "50%";
        Selector.$(div).style.position = "fixed";
        Selector.$(div).style.zIndex = posicaoz + 2;
    };

    this.Show = function () {
        this.divBlockTransp.style.visibility = 'visible';
        this.divBlock.style.visibility = 'visible';
        this.divFechar.style.visibility = 'visible';
        Selector.$(div).style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    this.Close = function () {
        //  this.divBlock.style.visibility = 'hidden';
        //  this.divBlockTransp.style.visibility = 'hidden';
        //  this.divFechar.style.visibility = 'hidden';
        //  Selector.$(div).style.visibility = 'hidden';
        document.body.style.overflow = 'visible';

        document.body.removeChild(this.divBlock);
        document.body.removeChild(this.divBlockTransp);
        this.divFechar.remove();
    }

    this.HideCloseIcon = function () {
        this.divFechar.style.visibility = 'hidden';
    }

    this.setColorBlock = function (cor) {
        this.divBlockTransp.style.backgroundColor = cor;
    }

    this.setOpacityBlock = function (transparencia) {
        this.divBlockTransp.style.filter = 'alpha(opacity=' + transparencia + ')';
        this.divBlockTransp.style.opacity = (transparencia / 100);
    }

    this.setHeight = function (div, height) {
        Selector.$(div).style.height = height + "px";
    }

    this.setWidth = function (div, width) {
        Selector.$(div).style.width = width + "px";
    }

}

function horasEmFloat(obj) {

    obj = obj.replace(/,/gi, '');
    obj = obj.replace(/\./gi, '');

    if (obj.indexOf(":") <= -1) {
        return Number.parseFloat(obj);
    }

    var horas = 0;
    var minutos = 0;

    var vetor = obj.split(":");
    horas = parseInt(vetor[0]);
    minutos = Number.parseFloat(vetor[1]); //caso termine com : para não retornar NaN

    if (minutos == "")
        minutos = 0;

    while (minutos >= 60) {
        minutos = minutos - 60;
        horas++;
    }

    var minutosInteiro = minutos / 60;
    minutosInteiro = minutosInteiro.toFixed(2);

    return (parseFloat(horas) + parseFloat(minutosInteiro));

}



function floatEmHoras(obj) {

    obj = obj.toString().replace(/,/gi, '');

    var horas = 0;
    var minutos = 0;

    var vetor = obj.toString().split(".");
    horas = parseInt(vetor[0]);
    minutos = (Number.parseFloat("0," + vetor[1]) * 60).toFixed(0);

    return Date.AjustaHora(parseFloat(horas) + ":" + parseFloat(minutos));

}

function getLinhaGrid(elemento) {
    return gridObjetoLinha(elemento);
}

function gridObjetoLinha(elemento) {
    var pai = elemento.parentNode;
    var i = 1;

    while (pai.tagName.toString().toUpperCase().replace(/'/g, "").replace(/"/g, "") !== 'TR') {
        pai = pai.parentNode;
        i++;
        if (i > 5) {
            return '';
        }
    }

    return pai.rowIndex - 1;
}



/*function ValidarCNPJ(cnpj) {
 //Fonte: http://www.geradorcnpj.com/javascript-validar-cnpj.htm
 cnpj = cnpj.replace(/[^\d]+/g, '');

 if (cnpj == '')
 return false;

 if (cnpj.length != 14)
 return false;

 // Elimina CNPJs invalidos conhecidos
 if (cnpj == "00000000000000" ||
 cnpj == "11111111111111" ||
 cnpj == "22222222222222" ||
 cnpj == "33333333333333" ||
 cnpj == "44444444444444" ||
 cnpj == "55555555555555" ||
 cnpj == "66666666666666" ||
 cnpj == "77777777777777" ||
 cnpj == "88888888888888" ||
 cnpj == "99999999999999")
 return false;

 // Valida DVs
 var tamanho = cnpj.length - 2
 var numeros = cnpj.substring(0, tamanho);
 var digitos = cnpj.substring(tamanho);
 var soma = 0;
 var pos = tamanho - 7;
 for (var i = tamanho; i >= 1; i--) {
 soma += numeros.charAt(tamanho - i) * pos--;
 if (pos < 2)
 pos = 9;
 }
 var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
 if (resultado != digitos.charAt(0))
 return false;

 tamanho = tamanho + 1;
 numeros = cnpj.substring(0, tamanho);
 soma = 0;
 pos = tamanho - 7;
 for (i = tamanho; i >= 1; i--) {
 soma += numeros.charAt(tamanho - i) * pos--;
 if (pos < 2)
 pos = 9;
 }
 resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
 if (resultado != digitos.charAt(1))
 return /false;

 return true;

 }*/
function arrayUnique(a) {
    return a.sort().filter(function (item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

function isElement(type, id) {

    var as = document.getElementsByTagName(type);
    for (var i = 0; i < as.length; i++) {
        if (as[i].id === id) {
            return true;
        }
    }
    return false;
}

function perdeFoco() {
    if (!isElement('div', 'divLixo')) {
        document.body.appendChild(DOM.newElement('div', 'divLixo'));
    }
    var divLixo = Selector.$('divLixo');
    divLixo.innerHTML = '<input id="lixo_foco" type="text" />';
    Selector.$('lixo_foco').focus();
    Selector.$('divLixo').innerHTML = "";
}

DialogoMensagens = function (div, altura, largura, posicaoz, tipo_prompt, titulo, mensagem, nomeBotao, funcaoBotao, mostraBotaoCancelar, campoFocus, funcaoCancelar, parametroFuncaoCancelar) {

    funcaoCancelar = (arguments.length > 11 ? arguments[11] : '');
    parametroFuncaoCancelar = (arguments.length > 12 ? arguments[12] : '');
    perdeFoco();

    if (!isElement('div', div)) {
        document.body.appendChild(DOM.newElement('div', div));
    }

    Selector.$(div).innerHTML = "<input type='text' id='promptConfirmacao' />";
    Selector.$('promptConfirmacao').focus();
    Selector.$(div).innerHTML = "";

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = "#divBlock" + div + " { " +
        "width:100%;" +
        "height:100%;" +
        "text-align:center;" +
        "position:fixed;" +
        "top:0px;" +
        "right:0px;" +
        "overflow:auto;" +
        "vertical-align:middle;}" +
        "#divBlockTransp" + div + " { " +
        "cursor: not-allowed; " +
        "width:100%;" +
        "height:100%;" +
        "background:#000;" +
        "text-align:center;" +
        "position:fixed;" +
        "top:0px;" +
        "right:0px;" +
        "overflow:auto;" +
        "vertical-align:middle;}" +
        " #divClose" + div + " {" +
        "background-repeat:no-repeat; background-position:right;" +
        "margin-left:" + (((largura / 2) * -1) + 18) + "px;" +
        "margin-top:" + (((altura / 2) * -1) - 18) + "px;" +
        "position:fixed;" +
        "top:50%;" +
        "left:50%;" +
        "z-index:" + (posicaoz + 2) + ";" +
        "height:38px;" +
        "width:100%;" +
        "max-width:" + largura + "px;" +
        "}" +
        " #" + div + " {" +
        "font-size:13px;" +
        "line-height:normal;" +
        "overflow:auto;" +
        "height:auto;" +
        "width:100%;" +
        "max-width:" + largura + "px;" +
        "min-height: " + altura + "px;" +
        "background:#FFFFFF;" +
        "text-align:left;" +
        "padding:20px;" +
        "box-sizing:border-box;" +
        "position:fixed;" +
        "top:50%;" +
        "left:50%;" +
        "margin-left:" + ((largura / 2) * -1) + "px;" +
        "margin-top:" + ((altura / 2) * -1) + "px;" +
        "} " +
        "@media screen and (min-height: 0px) and (max-width: " + largura + "px) {" +
        " #divClose" + div + " {" +
        "text-align:right;" +
        "position:relative;" +
        "min-height:auto;" +
        "height:38px;" +
        "top:auto;" +
        "left:auto;" +
        "right:0px;" +
        "margin-left:0px;" +
        "margin-bottom:-18px;" +
        "margin-top:0px;" +
        "width:100%;" +
        "}" +
        " #" + div + " {" +
        "overflow:auto;" +
        "height:auto;" +
        "max-height:auto;" +
        "position:relative;" +
        "top:auto;" +
        "left:auto;" +
        "margin-left:0px;" +
        "margin-top:0px;" +
        "width:100%;" +
        "}" +
        "}";

    var achou = false;
    var linksDinamicos = document.getElementsByTagName("style");
    for (var i = 0; i < linksDinamicos.length; i++) {
        if (linksDinamicos[i].innerHTML === style.innerHTML) {
            achou = true;
            break;
        }
    }
    if (!achou) {
        var links = document.getElementsByTagName("link");
        document.getElementsByTagName('head')[0].insertBefore(style, links[0]);
    }

    // Bloqueio
    if (!eElemento('div', Selector.$('divBlockTransp' + div))) {
        this.divBlockTransp = document.createElement('div');
        this.divBlockTransp.setAttribute("id", "divBlockTransp" + div);
    }

    document.body.appendChild(this.divBlockTransp);
    this.divBlockTransp.style.visibility = 'hidden';
    this.divBlockTransp.style.zIndex = posicaoz;
    this.divBlockTransp.style.filter = 'alpha(opacity=45)';
    this.divBlockTransp.style.opacity = (45 / 100);

    if (!eElemento('div', Selector.$('divBlock' + div))) {
        this.divBlock = document.createElement('div');
        this.divBlock.setAttribute("id", "divBlock" + div);
    }

    this.divBlock.style.visibility = 'hidden';
    this.divBlock.style.zIndex = posicaoz + 1;
    document.body.appendChild(this.divBlock);

    if (!eElemento('div', Selector.$('divClose' + div))) {
        this.divFechar = document.createElement('div');
        this.divFechar.setAttribute('id', 'divClose' + div);
    }

    this.divFechar.setAttribute('title', 'Fechar');
    this.divFechar.setAttribute('class', 'efeito-opacidade-75-01');
    this.divFechar.setAttribute('style', 'display:none');
    //this.divFechar.setAttribute('style', 'height:37px; width:37px; left:50%; top:50%; background-repeat:no-repeat; background-image:url(' + padrao + 'imagens/fechar.png); position: absolute; visibility: hidden; margin-top:' + (((altura / 2) * -1) - 18.5) + 'px; margin-left:' + ((largura / 2) - 18.5) + 'px');
    this.divFechar.caixaDialogo = this;

    this.divFechar.onclick = function () {
        this.caixaDialogo.Close();
    };

    this.divBlock.appendChild(this.divFechar);
    Selector.$(div).style.visibility = 'hidden';
    this.divBlock.appendChild(Selector.$(div));
    Selector.$(div).style.zIndex = posicaoz + 1;

    this.tituloDiv = document.createElement('h4');
    this.tituloDiv.innerHTML = titulo;
    this.mensagemDiv = document.createElement('p');
    this.mensagemDiv.innerHTML = mensagem;
    this.botao = document.createElement('a');
    if (funcaoBotao === "") {
        this.botao.caixaDialogo = this;
        this.botao.onclick = function () {
            this.caixaDialogo.Close();
        };
    } else {
        this.botao.setAttribute('onclick', funcaoBotao);
    }

    this.botao.innerHTML = nomeBotao;
    this.botaoCancelar = document.createElement('a');
    this.botaoCancelar.style.marginLeft = '5px';
    this.botaoCancelar.setAttribute('class', 'botaobrancosuave_prompt');
    this.botaoCancelar.innerHTML = "Cancelar";
    this.botaoCancelar.caixaDialogo = this;
    this.botaoCancelar.onclick = function () {
        if (funcaoCancelar != '') {
            window[funcaoCancelar](parametroFuncaoCancelar);
        }
        this.caixaDialogo.Close();
    };
    if (tipo_prompt === '1') {

        Selector.$(div).setAttribute('class', 'div_erro');
        this.botao.setAttribute('class', 'botaovermelhosuave_prompt');
    } else if (tipo_prompt === '2') {
        Selector.$(div).setAttribute('class', 'div_alerta');
        this.botao.setAttribute('class', 'botaoamarelosuave_prompt');
    } else if (tipo_prompt === '3') {
        Selector.$(div).setAttribute('class', 'div_sucesso');
        this.botao.setAttribute('class', 'botaoverdesuave_prompt');
    } else {
        Selector.$(div).setAttribute('class', 'div_info');
        this.botao.setAttribute('class', 'botaoazulsuave_prompt');
    }

    Selector.$(div).appendChild(this.tituloDiv);
    Selector.$(div).appendChild(this.mensagemDiv);
    Selector.$(div).appendChild(this.botao);

    if (mostraBotaoCancelar) {
        Selector.$(div).appendChild(this.botaoCancelar);
    }

    this.Show = function () {

        this.divBlockTransp.style.visibility = 'visible';
        this.divBlock.style.visibility = 'visible';
        Selector.$(div).style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    };

    this.Close = function () {
        this.divBlock.style.visibility = 'hidden';
        this.divBlockTransp.style.visibility = 'hidden';
        Selector.$(div).style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
        if (campoFocus !== '') {
            if (isElement('select', campoFocus)) {
                Selector.$(campoFocus).focus();
            } else if (Selector.$(campoFocus).value !== '') {
                Selector.$(campoFocus).select();
            }
            Selector.$(campoFocus).focus();
        }
    };

    this.setColorBlock = function (cor) {
        this.divBlockTransp.style.backgroundColor = cor;
    };
    this.setOpacityBlock = function (transparencia) {
        this.divBlockTransp.style.filter = 'alpha(opacity=' + transparencia + ')';
        this.divBlockTransp.style.opacity = (transparencia / 100);
    };
    this.setHeight = function (div, heigth) {
        Selector.$(div).style.height = heigth + "px";
    };
    this.setWidth = function (div, width) {
        Selector.$(div).style.width = width + "px";
    };
}

function UploadDrop(funcao, alturaDiv, larguraDiv) {

    if (alturaDiv < 400)
        alturaDiv = 400;

    if (larguraDiv < 600)
        larguraDiv = 600;

    var divUpload = criaDiv('divUpload');
    divUpload.innerHTML = '<div class="divbrancaTitulo">Upload de arquivos</div>';

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', '../padrao/uploadDrop.php?altura=' + alturaDiv);
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("width", larguraDiv - 40);
    iframe.setAttribute("height", alturaDiv - 40);

    divUpload.appendChild(iframe);
    dialogoUpload = new caixaDialogoResponsiva('divUpload', alturaDiv, larguraDiv, '../padrao/', 0);
    dialogoUpload.Show();

    callback = function (funcao, arquivos) {
        window[funcao](arquivos);
    };
}


function getTimeZone() {
    var x = new Date();
    x = x.toString();
    x = x.split('GMT');
    x = x[1].split(' ');
    return x[0].substring(0, 3) + ':' + x[0].substring(3, 6);
}

function validaCPF(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}