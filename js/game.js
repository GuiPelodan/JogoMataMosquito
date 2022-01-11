//variáveis do escopo global de altura e largura do palco do jogo

var altura = 0
var largura = 0
var vidas = 1
var tempo = 30
var tempoMosquito = 1000
var nivel = window.location.search //recupera o parâmetro recebido na url (não toda a url)

nivel = nivel.replace('?', '')

//____________________________________________________________________________________________


if(nivel === 'normal')
    {
        tempoMosquito = 1800
    }
else if(nivel === 'dificil')
    {
        tempoMosquito = 1200
    }
else if(nivel === 'chucknorris')
    {
        tempoMosquito = 750
    }


//_____________________________________________________________________________________________


function ajustaPalco() //ajusta tamanho do palco do jogo ao tamanho da janela
    {
        altura = window.innerHeight
        largura = window.innerWidth
    }

ajustaPalco()


//_____________________________________________________________________________________________


var cronometro = setInterval(function()
    {
        tempo -= 1
        if(tempo <= 0)
        {
            clearInterval(cronometro)
            clearInterval(criaMosquito)
            window.location.href = 'vitoria.html'
        }
        document.getElementById('cronometro').innerHTML = tempo
    }, 1000)


//_____________________________________________________________________________________________


function posRandom() //configura posição randomica do mosquito (+class, id, atribui onclick, etc.)
    {

        var posX = Math.floor(Math.random() * largura) -90
        var posY = Math.floor(Math.random() * altura) -90
        
        posX = posX < 10 ? 10 : posX
        posY = posY < 10 ? 10 : posY

        if(document.getElementById('mosquito'))//remove o mosquito anterior (caso exista)
        {
        document.getElementById('mosquito').remove()

            if(vidas >= 3)
            {
                window.location.href = 'game_over.html'
            }
            else
            {
                painDc()
                document.getElementById('v' + vidas).src = 'img/coracao_vazio.png'
                vidas++
            }
        }

        var mosquito = document.createElement('img')//cria o elemento html

        mosquito.src = 'img/mosca.png'
        mosquito.id = 'mosquito'
        mosquito.className = tamRandom() + ' ' + ladoRandom()
        mosquito.style.top = posY + 'px'
        mosquito.style.left = posX + 'px'
        mosquito.style.position = 'absolute'
        mosquito.onclick = function()
                            {
                                fart()
                                this.remove()
                            }
        
        document.body.appendChild(mosquito)
    }


//_____________________________________________________________________________________________



function tamRandom()//configura tamanho aleatório do mosquito
    {
    var classe = Math.floor(Math.random() * 3)

        switch(classe) 
        {
            case 0:
                return 'mosquito1'
            case 1:
                return 'mosquito2'
            case 2:
                return 'mosquito3'
        }
    }


//_____________________________________________________________________________________________


function ladoRandom()//configura lado aleatório do mosquito
    {
    var classe = Math.floor(Math.random() * 2)

        switch(classe) 
        {
            case 0:
                return 'ladoA'
            case 1:
                return 'ladoB'
        }
    }


//_____________________________________________________________________________________________

function painDc()//cria audio de dor
    {
        var pointsDc = document.createElement('audio')
        pointsDc.src = 'midia/pain.wav'
        pointsDc.play()
    }
function fart()//cria audio do mosquito
    {
        var dieFart = document.createElement('audio')
        dieFart.src = 'midia/fart.wav'
        dieFart.play()
    }