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

let respostas = ['inteiro, booleano, caractere, float',
    'string, float, objeto, inteiro',
     'função, inteiro, lista, booleano',
     'booleano, array, float, string'];


function mostrarOpcoes(){
    let respostasCopy = [...respostas]
    for(let i = 0; i<respostas.length;i++){
        let opcao = Math.floor(Math.random() * respostasCopy.length);
        opcoes[i].innerHTML = respostasCopy[opcao]
        respostasCopy.splice(opcao, 1);
    }
}

opcoes.forEach(opcao => {
    opcao.addEventListener('click', () => {
        if(opcao.classList.contains('desabilitado')) return;
        if(opcao.classList.contains('acertou')) return;

        if (opcao.innerHTML === respostas[0]) {
            proximaFase.disabled = false;
            proximaFase.classList.remove('desabilitado')
            if(!acertou){
                opcao.classList.add('acertou')
                let pontosNumeral = parseInt(pontosUsuario.textContent);
                pontosNumeral += 100;
                pontosUsuario.innerHTML = pontosNumeral
                localStorage.setItem('pontuação', pontosNumeral);
                const questaoAtual = document.body.dataset.questao;
                localStorage.setItem(questaoAtual, true);
                acertou = true
            } 
        } else{
            if(acertou){
                return
            }
            let pontosNumeral = parseInt(pontosUsuario.textContent);
                pontosNumeral -= 25;
                pontosUsuario.innerHTML = pontosNumeral
                localStorage.setItem('pontuação', pontosNumeral);
                opcao.classList.add('desabilitado');
                opcao.disabled = true;
        }
    });
});

