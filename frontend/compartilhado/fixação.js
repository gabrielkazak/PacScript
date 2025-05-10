document.querySelector('.next').addEventListener('click', () => {
    setTimeout(()=>{
        const questaoAtual = document.body.dataset.questao;
        const botaoAvancar = document.querySelector('.next_level');
        const opcoes = document.querySelectorAll('.resposta');
      
        const codigoSalvo = localStorage.getItem(questaoAtual);
        window.faseValidaPorPersistencia = false;
      
        // Todas as respostas corretas por ordem de fase
        const respostas = {
          questao2: 'início<br>mostrar "Olá mundo!"<br>fim',
          questao3: 'criar variável contador com valor 0<br>contador igual a contador + 1',
          questao4: 'inteiro, booleano, caractere, float',
          questao5: 'VALOR_PONTO = 10(int)<br>pontuação = 0(int)<br>pontuação = pontuação + VALOR_PONTO',
          questao6: 'contador = 0(int)<br>contador += 1',
          questao7: 'se (pontos &gt;= 180) ganhou',
          questao8: 'se (vidas &gt; 0 &amp;&amp; powerUpColetado == true)'
        };
      
        if (codigoSalvo && respostas[questaoAtual]) {
          for (let i = 0; i < opcoes.length; i++) {
            if (opcoes[i].innerHTML === respostas[questaoAtual]) {
                console.log(opcoes[i].innerHTML)
                opcoes[i].classList.add('acertou');
            } else{
              console.log(opcoes[i].innerHTML)
                opcoes[i].classList.add('desabilitado');
                opcoes[i].disabled = true;
            }
          }
          botaoAvancar.disabled = false;
          botaoAvancar.classList.remove('desabilitado');
          window.faseValidaPorPersistencia = true;
        }
    },250)
  });

  document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.querySelector('.container')
    const body = document.body;
  
      let cor = localStorage.getItem('Cor');

      let volume = localStorage.getItem('Volume');

      if(volume){
        const musica = document.getElementById("musicaFundo");

        volume = volume * 0.01
        
        // Define o volume aqui (por exemplo, 50% do volume máximo)
        musica.volume = volume; // Valor entre 0.0 (mudo) e 1.0 (volume máximo)

        musica.play(); 
    }

      if(cor){
          if(cor === 'Fundo Escuro Plano'){
              body.style.background = 'rgb(22, 22, 22)'
              container.style.background = 'rgb(22, 22, 22)'
          } else if(cor == 'Fundo Roxo Plano'){
              body.style.background = 'rgb(85, 2, 91)'
              container.style.background = 'rgb(85, 2, 91)'
          }
      }
  })
  