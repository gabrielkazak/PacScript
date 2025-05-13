let proximo = document.querySelector('.next');
let voltar = document.querySelector('.return');
let proximaFase = document.querySelector('.next_level')

let questao = document.querySelector('.questao');
let conteudo = document.querySelector('.conteudo');

let opcoes = document.querySelectorAll('.resposta');

var acertou = false
var pontosUsuario = document.querySelector('.pontosUsuario')


document.addEventListener('DOMContentLoaded', ()=>{
    var pontosLocal = localStorage.getItem('pontuação')
    pontosUsuario.innerHTML = pontosLocal
})

console.log(opcoes)

proximo.addEventListener('click', ()=>{
    questao.style.display = 'block';
    conteudo.style.display = 'none';
    mostrarOpcoes();
    proximaFase.classList.add('desabilitado')
    proximaFase.disabled = true;
})

voltar.addEventListener('click', ()=>{
    questao.style.display = 'none';
    conteudo.style.display = 'flex';
})

let respostas = ['se (pontos >= 180) ganhou',
    'se (vidas = 0) mostrar game over',
     'se (pontuacao >== 100) passar de fase',
     'se (cor diferente "vermelho") mudar cor'];

function mostrarOpcoes() {
    let respostasCopy = [...respostas];
    for (let i = 0; i < respostas.length; i++) {
        let opcao = Math.floor(Math.random() * respostasCopy.length);
        opcoes[i].innerHTML = respostasCopy[opcao];

        // Se a opção for a resposta correta, marca como tal
        if (respostasCopy[opcao] === respostas[0]) {
            opcoes[i].setAttribute('data-correta', 'true');
        } else {
            opcoes[i].removeAttribute('data-correta');
        }

        respostasCopy.splice(opcao, 1);
    }
}

opcoes.forEach(opcao => {
    opcao.addEventListener('click', () => {
        // Verifica se a opção já foi desabilitada
        if (opcao.classList.contains('desabilitado')) return;
        if(opcao.classList.contains('acertou')) return;

        // Verifica se a opção clicada é a correta
        if (opcao.getAttribute('data-correta') === 'true') {
            proximaFase.disabled = false;
            proximaFase.classList.remove('desabilitado');

            if (!acertou) {
                opcao.classList.add('acertou');
                let pontosNumeral = parseInt(pontosUsuario.textContent);
                pontosNumeral += 100;
                pontosUsuario.innerHTML = pontosNumeral;
                localStorage.setItem('pontuação', pontosNumeral);
                const questaoAtual = document.body.dataset.questao;
                localStorage.setItem(questaoAtual, true);
                acertou = true;
            }
        } else {
            if (acertou) return; // Impede que o jogador perca pontos depois de acertar

            let pontosNumeral = parseInt(pontosUsuario.textContent);
            pontosNumeral -= 25;
            pontosUsuario.innerHTML = pontosNumeral;
            localStorage.setItem('pontuação', pontosNumeral);

            // Desabilita a opção errada
            opcao.classList.add('desabilitado');
            opcao.disabled = true;
        }
    });
});


