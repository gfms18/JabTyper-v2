//formula que calcula o tamanho da frase e imprime no console
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tempoJogo = $("#tempo");
var tempoInicial = tempoJogo;

//pega o tamanho da frase e apresenta na tela
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var botaodificuldade = document.querySelector("#botao-escolher")

botaodificuldade.addEventListener("click", function(){
    event.preventDefault()
    var dificuldade = document.querySelector("input[name = 'dificuldade']:checked").value;
    if(dificuldade == "fase1"){
        fase1()
    } else if(dificuldade == "fase2"){
        fase2()
    } else if(dificuldade == "fase3"){
        fase3()
    } 

    $(".modal-dificuldade").css("display", "none");

})

var botaodif = $("#botao-dificuldade")
botaodif.on("click", function(){
    $(".modal-dificuldade").css("display", "flex");
})


var campo = $("#campo-digitacao");
campo.on("input", function () {
    //pega o conteudo do campo de texto
    var frase = campo.val();
    //conta quantos caracteres existem na frase digitada
    var nCaracteresDigitados = frase.length;
    //exibe a quantidade na tela
    $("#caracteres-digitados").text(nCaracteresDigitados);

    //quebra a frase em palavras e conta as palavras
    var nPalavrasDigitadas = frase.split(" ").length;
    //exibe a quantidade de palavras na tela
    $("#palavras-digitadas").text(nPalavrasDigitadas);
});


var cronometro;
var running = false;
campo.on("focus", function () {
    if (running == true) {
        return;
    }
    
    cronometro = setInterval(function () {
        var tempoRestante = tempoJogo.text();
        if (tempoRestante <= 0) {
            running = false
            campo.attr("disabled", true);
            clearInterval(cronometro);
            nome = $("#nome").val()
            palavrasDigitadas = $("#palavras-digitadas").text()
            pontuacao = palavrasDigitadas / tempoInicial * 60
            $('#tabela-resultado').append('<tr><td>' + nome + '</td><td>' + pontuacao + '</td></tr>');
            localStorage.setItem("pontos:" + pontuacao, "nome do jogador: " + nome + " // dificuldade escolhida: " + dificuldadeesc);
            $("#mostrar-pontos").css("display", "flex");
            $("#pontinhos").text(pontuacao);
        } else {
            running = true
            tempoRestante--;
            tempoJogo.text(tempoRestante);
        }
    }, 1000);
});


$("#botao-reset").on("click", function () {
    if (cronometro)
        clearInterval(cronometro);
    running = false;
    campo.attr("disabled", false);
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial);
    $("#mostrar-pontos").css("display", "none");
});

function fase1(){
    let tempoJogo = 25
    frase = palavraEscolhida //puxar o nivel de dificuldade do localstorage assim
    dificuldadeesc = "Modo fácil"
    tempoInicial = tempoJogo
    $("#tempo").innerHTML = tempoJogo
    $('#tempo').text(tempoJogo);
    $('#frase-esc').text(frase);//e depois assim (aqui vai ser pra pegar a frase e abaixo vai ser com a dificuldade)
    $('#dif-esc').text(dificuldadeesc)
}

function fase2(){
    let tempoJogo = 20
    frase = palavraEscolhida2
    dificuldadeesc = "Modo médio"
    tempoInicial = tempoJogo
    $("#tempo").innerHTML = tempoJogo
    $('#tempo').text(tempoJogo);
    $('#frase-esc').text(frase);//aqui ele pega o id usando jquery e poe o valor da frase, assim como tempo jogo
    $('#dif-esc').text(dificuldadeesc)
}

function fase3(){
    let tempoJogo = 15
    frase = palavraEscolhida3 //atribui a palavra escolhida a frase
    dificuldadeesc = "Modo dificil"
    tempoInicial = tempoJogo
    $("#tempo").innerHTML = tempoJogo
    $('#tempo').text(tempoJogo);
    $('#frase-esc').text(frase);
    $('#dif-esc').text(dificuldadeesc)
}