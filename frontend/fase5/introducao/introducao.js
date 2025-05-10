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

let respostas = ['VALOR_PONTO = 10(int)<br>pontuação = 0(int)<br>pontuação = pontuação + VALOR_PONTO',
    'PONTUAÇÃO = 0(int)<br>valor do ponto = 10(int)<br>PONTUAÇÃO = PONTUAÇÃO + valor do ponto',
     'VIDAS_INICIAIS = 3(int)<br>VIDAS_INICIAIS - 1',
     'MAX_VIDAS = 100(int)<br>MAX_MOEDAS = MAX_MOEDAS - 1<br>moedas coletadas = MAX_MOEDAS'];


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