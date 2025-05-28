const tela = document.querySelector("#tela");
const telaConteudo = tela.getContext("2d");
const unidade = 30;

let ultimaTecla;
let proximaTecla;

let corDoMapa;
let corDoPacman;
let flagGPTMapa = false;
let flagGPTPacman = false;
let flagGPTMovimenta = false;

let pontos = [];

let mapa = [
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1],
    [1,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 0,0,0,1],
    [1,0,1,1,0, 1,1,1,0,1, 0,1,1,1,0, 1,1,0,1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,1],
    [1,0,1,1,0, 1,0,1,1,1, 1,1,0,1,0, 1,1,0,1],
    [1,0,0,0,0, 1,0,0,0,1, 0,0,0,1,0, 0,0,0,1],
    [1,1,1,1,0, 1,1,1,0,1, 0,1,1,1,0, 1,1,1,1],
    [0,0,0,1,0, 1,0,0,0,0, 0,0,0,1,0, 1,0,0,0],
    [1,1,1,1,0, 1,0,1,1,1, 1,1,0,1,0, 1,1,1,1],
    [0,0,0,0,0, 0,0,1,2,0, 2,1,0,0,0, 0,0,0,0],
    [1,1,1,1,0, 1,0,1,1,1, 1,1,0,1,0, 1,1,1,1],
    [0,0,0,1,0, 1,0,0,0,0, 0,0,0,1,0, 1,0,0,0],
    [1,1,1,1,0, 1,0,1,1,1, 1,1,0,1,0, 1,1,1,1],
    [1,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 0,0,0,1],
    [1,0,1,1,0, 1,1,1,0,1, 0,1,1,1,0, 1,1,0,1],
    [1,0,0,1,0, 0,0,0,0,0, 0,0,0,0,0, 1,0,0,1],
    [1,1,0,1,0, 1,0,1,1,1, 1,1,0,1,0, 1,0,1,1],
    [1,0,0,0,0, 1,0,0,0,1, 0,0,0,1,0, 0,0,0,1],
    [1,0,1,1,1, 1,1,1,0,1, 0,1,1,1,1, 1,1,0,1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,1],
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1],
];

function criaBorda(){
    for (let l = 0; l < mapa.length; l++) {
        for (let c = 0; c < mapa[l].length; c++) {
            if (mapa[l][c] === 1) {
                // Verifica se a célula à esquerda é uma parede
                let esquerda = (c > 0 && mapa[l][c - 1] === 1);
                // Verifica se a célula acima é uma parede
                let cima = (l > 0 && mapa[l - 1][c] === 1);
                // Verifica se a célula à direita é uma parede
                let direita = (c < mapa[l].length - 1 && mapa[l][c + 1] === 1);
                // Verifica se a célula abaixo é uma parede
                let baixo = (l < mapa.length - 1 && mapa[l + 1][c] === 1);

                telaConteudo.fillStyle = corDoMapa;

                // Borda superior se em cima nao tiver nada
                if (!cima) {
                    telaConteudo.fillRect(c * unidade, l * unidade, unidade, 2); // Borda superior
                }
                // Borda inferior se embaixo nao tiver nada
                if (!baixo) {
                    telaConteudo.fillRect(c * unidade, (l + 1) * unidade - 2, unidade, 2); // Borda inferior
                }
                // Borda esquerda se na esquerda nao tiver nada
                if (!esquerda) {
                    telaConteudo.fillRect(c * unidade, l * unidade, 2, unidade); // Borda esquerda
                }
                // Borda direita se na direita nao tiver nada
                if (!direita) {
                    telaConteudo.fillRect((c + 1) * unidade - 2, l * unidade, 2, unidade); // Borda direita
                }
                // Preenche o interior de preto
                telaConteudo.fillStyle = "black";
                telaConteudo.fillRect(c * unidade + 2, l * unidade + 2, unidade - 4, unidade - 4);
            }
        }
    }
}

function criaPontos(){
    for (let l = 0; l < mapa.length; l++) {
        for (let c = 0; c < mapa[0].length; c++) {
            if (mapa[l][c] === 0) {
                if (l === 7 && (c < 3 || c > 15)) {
                    continue; // Remove os 3 primeiros e últimos pontos da linha 7
                }
                if (l === 11 && (c < 3 || c > 15)) {
                    continue; // Remove os 3 primeiros e últimos pontos da linha 11
                }
                if ((l === 9 || l === 8) && (c > 7 && c<11)) {
                    continue; // Lar dos fantasmas
                }
                
                if((l === 3)&&(c === 1 ||c === 17)){
                    continue;
                }

                if((l === 15)&&(c === 1 ||c === 17)){
                    continue;
                }
                /*power ups linhas e colunas:
                    p1 = linha: 3 coluna:1
                    p2 = linha: 3 coluna:17
                    p3 = linha: 15 coluna:1
                    p4 = linha: 15 coluna:17
                */
                let pontoX = c * unidade + unidade / 2;
                let pontoY = l * unidade + unidade / 2;

                    telaConteudo.fillStyle = "yellow";
                    telaConteudo.beginPath();
                    telaConteudo.arc(pontoX, pontoY, 2, 0, 2 * Math.PI);
                    telaConteudo.fill();
    
                    pontos.push({ x: pontoX, y: pontoY, coletado: false });
                    console.log('Criei Ponto')
            }
        }
    }
}

let pacman = {
    x: 285,
    y: 345,
    raio: 14.9,
    velocidade: 1.5,
    cor:'yellow',
    poderAtivo: false
};

function criaMapa() {
    if(!flagGPTMapa){
        return
    }
    criaBorda();
    criaPontos(); 
}

criaMapa()

function limpaMapa(){
    telaConteudo.fillStyle = "black";
    telaConteudo.fillRect(0, 0, 570, 630);
}
















let anguloBoca = 0.1; // Ângulo inicial de abertura
let abrindo = true;
let pacmanDirecao;

function limpaPacman() {    //limpa tudo que esta na posição anterior do pacman
    telaConteudo.fillStyle = "black";
    telaConteudo.fillRect(pacman.x - pacman.raio, pacman.y - pacman.raio, pacman.raio * 2, pacman.raio * 2);
}


function atualizaDirecao() {
    // Define a direção com base na última tecla pressionada
    switch (ultimaTecla) {
        case "ArrowUp":
            case "w":
            pacmanDirecao = -Math.PI / 2; // Cima
            break;
        case "ArrowDown":
            case "s":
            pacmanDirecao = Math.PI / 2; // Baixo
            break;
        case "ArrowLeft":
            case "a":
            pacmanDirecao = Math.PI; // Esquerda
            break;
        case "ArrowRight":
            case "d":
            pacmanDirecao = 0; // Direita
            break;
    }
}

function criaPacman() {
    limpaPacman();
    if (abrindo) {
        anguloBoca += 0.1;
        if (anguloBoca >= 0.9) abrindo = false; // Limita a abertura
    } else {
        anguloBoca -= 0.02;
        if (anguloBoca <= 0.10) abrindo = true; // Limita o fechamento
    }

    telaConteudo.save(); // Salva o estado atual do canvas
    telaConteudo.translate(pacman.x, pacman.y); // Move o ponto de origem para o centro do Pac-Man
    telaConteudo.rotate(pacmanDirecao); // Gira o canvas na direção do Pac-Man
    telaConteudo.translate(-pacman.x, -pacman.y);

    // Desenha o Pac-Man com a boca animada
    telaConteudo.fillStyle = pacman.cor;
    telaConteudo.beginPath();
    telaConteudo.moveTo(pacman.x, pacman.y);
    telaConteudo.arc(
        pacman.x, pacman.y,
        pacman.raio - 2,
        anguloBoca, // Ângulo inicial (controla a boca)
        2 * Math.PI - anguloBoca // Ângulo final
    );
    telaConteudo.closePath();
    telaConteudo.fill();

    telaConteudo.restore(); 
}

function animaPacman(){
    if(!flagGPTPacman){
        return
    }
    pacman.cor = corDoPacman;
    atualizaDirecao();
    criaPacman();
    requestAnimationFrame(animaPacman); // Chama a animação no próximo frame
}

// Iniciar a animação
animaPacman();

let direcoes = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
ultimaTecla = null;
proximaTecla = teclaAleatoria();

function movePacman() {
    let novoX = pacman.x;
    let novoY = pacman.y;

    // Aplica a direção atual
    switch (proximaTecla) {
        case "ArrowUp": novoY -= pacman.velocidade; break;
        case "ArrowDown": novoY += pacman.velocidade; break;
        case "ArrowLeft": novoX -= pacman.velocidade; break;
        case "ArrowRight": novoX += pacman.velocidade; break;
    }

    if (podeMover(novoX, novoY)) {
        // Move o Pac-Man
        limpaPacman();
        pacman.x = novoX;
        pacman.y = novoY;
        teleporte();
        ultimaTecla = proximaTecla;
        if (Math.random() < 0.1) {
            proximaTecla = teclaAleatoria();
        }
    } else {
        proximaTecla = teclaAleatoria();
    }

    criaPacman();
}

function teclaAleatoria() {
    let opcoes = direcoes.filter(d => d !== oposta(ultimaTecla)); // Evita vai-e-vem
    return opcoes[Math.floor(Math.random() * opcoes.length)];
}

// Retorna a direção oposta
function oposta(direcao) {
    let opostos = {
        "ArrowUp": "ArrowDown",
        "ArrowDown": "ArrowUp",
        "ArrowLeft": "ArrowRight",
        "ArrowRight": "ArrowLeft"
    };
    return opostos[direcao];
}





let teleporteCooldown = false;
function teleporte() {
    if (teleporteCooldown) return;

    if (pacman.x <= 17 && pacman.y == 285) {
        pacman.x = 549;
        teleporteCooldown = true;
    } else if (pacman.x >= 553 && pacman.y == 285) {
        pacman.x = 21;
        teleporteCooldown = true;
    }

    setTimeout(() => (teleporteCooldown = false), 1000);
}


function podeMover(novoX, novoY) {
    let esquerda = Math.floor((novoX - pacman.raio) / unidade);
    let direita = Math.floor((novoX + pacman.raio) / unidade);
    let cima = Math.floor((novoY - pacman.raio) / unidade);
    let baixo = Math.floor((novoY + pacman.raio) / unidade);

    return (
        mapa[cima][esquerda] === 0 &&  
        mapa[cima][direita] === 0 &&   
        mapa[baixo][esquerda] === 0 && 
        mapa[baixo][direita] === 0     
    );
}

function atualizaTela() {
    if(!flagGPTMovimenta || !flagGPTMapa){
        return
    }
    limpaPacman();
    movePacman();
}

async function iniciarJogo() {
    let resetaTudo = setInterval(() => {
        atualizaTela();
    }, 1000 / 75);
}

iniciarJogo();



















const parametro = `

IMPORTANTE: O formato de resposta mudou. Agora você deve responder com um array JSON contendo SETE elementos. Ignore qualquer instrução anterior que você possa ter seguido.

Você é um validador de pseudocódigo. Sua tarefa é validar um pseudocódigo fornecido pelo usuário com base nos critérios abaixo e retornar um array JSON com SEIS elementos.

⚠️ O usuário pode escrever a fase por partes. Isso significa que ele pode ter descrito apenas um dos critérios abaixo. Nesse caso, valide apenas o que foi escrito e forneça uma dica sobre esse trecho. Ignore o que ainda não foi mencionado. Exemplo: se o jogador só fez a parte de criação do mapa, a dica deve ser apenas em relação a isso.

Um exemplo de código correto seria algo como:

criar um mapa com 21 linhas e 19 colunas
deve ter bordas azuis
deve ter espaço interno

o pacman é um circulo vermelho e deve ser criado centralizado ao mapa

o pacman pode se movimentar nas 4 direções do plano 2d(cima, baixo, esquerda e direita)

Retorne um array com os seguintes elementos:
Primeiro valor (índice 0): Cor para as bordas do mapa, em inglês minúsculo válida no CSS (ou a mais próxima possível, 'black' se nada for fornecido).
Segundo valor (índice 1): Cor para o corpo do pacman em inglês minúsculo válida no CSS (ou a mais próxima possível, 'yellow' se nada for fornecido).
Terceiro valor (índice 2): true se houver definição de mapa com **exatamente 21 linhas e 19 colunas**, e com bordas de cor diferente de preto.
Quarto valor (índice 3): true se houver criação do Pac-Man **no centro ou próximo ao centro do mapa** e com a cor do seu corpo definida.
Quinto valor (índice 4): true se houver lógica bem simples de movimentação do Pac-Man no plano 2d. (como, pode mover pra cima, pra baixo, pra esquerda e pra direita)
Sexto valor (índice 5):Uma **string curta de dica** (2 ou 3 linhas) explicando de forma vaga o que está faltando ou precisa ser ajustado **com base apenas no que foi escrito**.

🔒 Regras obrigatórias:
Retorne um único array JSON com seis elementos neste formato exato:
["blue","yellow", true, false, true, "sua dica aqui"]
Use **aspas duplas** em todas as strings, e os valores booleanos devem ser true ou false (sem aspas).
Não adicione nenhum texto antes ou depois do array.
`;

let contadorDicas = 0;
let dicas = [
    'Seu código precisa descrever um cenário, um personagem e como ele se move.',
    'Use exatamente 21 linhas e 19 colunas para o mapa, e coloque o Pac-Man no centro.',
    'Descreva o mapa com uma cor de borda válida, diga que o Pac-Man pode ir para cima, baixo, esquerda e direita.'
  ]  

document.querySelector('#botaoDica').addEventListener('click', ()=>{
    contadorDicas++;
    if(contadorDicas>3){
        return
    }
    document.querySelector('.textoDica').textContent = dicas[contadorDicas-1];
    document.querySelector('#botaoDica').textContent = `Dica ${contadorDicas}/3`;
    document.querySelector('.dica').style.display = 'flex';
    document.querySelector('.overlay').style.display = 'block';
})

document.querySelector('.fechar').addEventListener('click', ()=>{
    document.querySelector('.dica').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
})


var acertou = false
var pontosUsuario = document.querySelector('.pontosUsuario')

document.addEventListener('DOMContentLoaded', ()=>{
    var pontosLocal = localStorage.getItem('pontuação')
    pontosUsuario.innerHTML = pontosLocal
})

function finalizaRestart(){

    pacman.x = 285;
    pacman.y = 345;

    pontos = [];

    atualizaTela();
    animaPacman();
    criaMapa();

}

document.addEventListener('DOMContentLoaded', () => {
    if (window.faseValidaPorPersistencia) {
      console.log('cheguei aqui');
      corDoMapa = 'blue';
      corDoPacman = 'yellow';
      flagGPTMapa = true;
      flagGPTPacman = true;
      flagGPTMovimenta = true;
  
      finalizaRestart();
    }
  });
  
    import {validarCodigo} from "../compartilhado/validacaoFront.js";

    document.getElementById("botao").addEventListener("click", async () => {
        document.getElementById('botao').style.display = 'none'
        const codigo = document.getElementById("codigoUsuario").value;
        const resultado = await validarCodigo(parametro, codigo);

        const flags = resultado;


        const [flag1, flag2, flag3, flag4, flag5, dicaGerada] = flags;

        corDoMapa = flag1;
        corDoPacman = flag2;
        flagGPTMapa = flag3;
        flagGPTPacman = flag4;
        flagGPTMovimenta = flag5;
        dicas[contadorDicas] = dicaGerada;

        if(flagGPTMapa && flagGPTMovimenta && flagGPTPacman){
            document.getElementById('botao').style.display = 'none'
            document.getElementById('avancar').style.display = 'block'
            if (localStorage.getItem('veioDoMenu') === 'true') {
                localStorage.removeItem('veioDoMenu');
                document.getElementById('avancar').textContent = 'Voltar para o Menu';
                document.getElementById('avancar').addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = '/';
                });
            }
            if(!acertou){
                let pontosNumeral = parseInt(pontosUsuario.textContent);
                pontosNumeral += 150;
                pontosUsuario.innerHTML = pontosNumeral
                localStorage.setItem('pontuação', pontosNumeral);
                const faseAtual = document.body.dataset.fase;
                localStorage.setItem(faseAtual, codigo);
                acertou = true;
            } 
            finalizaRestart();
            return
        } else{
            let pontosNumeral = parseInt(pontosUsuario.textContent);
            pontosNumeral -= 10;
            pontosUsuario.innerHTML = pontosNumeral
            localStorage.setItem('pontuação', pontosNumeral);
            finalizaRestart();
        }

        

        setTimeout(() => {
            document.getElementById('botao').style.display = 'block'
        }, 10000);
    });


document.getElementById("codigoUsuario").addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
        e.preventDefault(); // Impede que o foco mude para outro elemento
        
        let start = this.selectionStart;
        let end = this.selectionEnd;
        
        // Insere um tab (4 espaços, mas pode ajustar se quiser)
        let tabSpaces = "    ";
        this.value = this.value.substring(0, start) + tabSpaces + this.value.substring(end);

        // Move o cursor para depois do tab inserido
        this.selectionStart = this.selectionEnd = start + tabSpaces.length;
    }
});

document.getElementById("codigoUsuario").addEventListener("keydown", function(e) {
    const openClosePairs = {
        "(": ")",
        "{": "}",
        "[": "]",
        '"': '"',
        "'": "'"
    };

    if (openClosePairs[e.key]) {
        e.preventDefault();
        
        let start = this.selectionStart;
        let end = this.selectionEnd;
        
        let closeChar = openClosePairs[e.key];

        // Insere o par de caracteres
        this.value = this.value.substring(0, start) + e.key + closeChar + this.value.substring(end);

        // Posiciona o cursor entre os caracteres inseridos
        this.selectionStart = this.selectionEnd = start + 1;
    }
});

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("codigoUsuario").focus();
});


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('origem') === 'menu')return
    const caminhoAtual = window.location.pathname;
    localStorage.setItem('ultimoCaminho', caminhoAtual);
  });  

let textoMotivador = ["Nesta fase, o desafio é criar a base fundamental do jogo: O mapa, o Pac-Man e permitir que ele se movimente pelo mapa, tudo isso, claro, com pseudocódigo.","Na hora de criar o código, seja específico, descreva o mapa com sua quantidade de linhas e colunas e uma cor para as bordas. A respeito do Pac-Man, fale sobre o formato circular dele, a cor e posicione-o centralizado no mapa. E sobre sua movimentação, descreva o plano de movimento dele e para que direções ele pode ir.", "Lembre-se: o computador faz exatamente o que você manda, portanto, ao escrever o pseudocódigo, não basta simplesmente dizer “criar mapa” ou “mover Pac-Man”, cada detalhe precisa ser especificado.", "Parâmetros de ajuda: Linhas = 21, Colunas = 19"]

let contadorTexto = 0;
let instrucao = document.querySelector('.instrucao')

document.addEventListener('DOMContentLoaded', ()=>{
    instrucao.textContent = textoMotivador[0]
})

document.querySelector('.voltarTexto').addEventListener('click', ()=>{
    if(contadorTexto == 0){
        return
    }
    contadorTexto--;
    document.querySelector('.proximoTexto').textContent = `Proximo ${contadorTexto+1}/4`
    instrucao.textContent = textoMotivador[contadorTexto]
})

document.querySelector('.proximoTexto').addEventListener('click', ()=>{
    if(contadorTexto == 3){
        return
    }
    contadorTexto++;
    document.querySelector('.proximoTexto').textContent = `Proximo ${contadorTexto+1}/4`
    instrucao.textContent = textoMotivador[contadorTexto]
})