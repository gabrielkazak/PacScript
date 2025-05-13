document.addEventListener('DOMContentLoaded', () => {

    if(document.referrer.includes('frontend/menu/menu.html')){
        return
      }
      
    const faseAtual = document.body.dataset.fase;
    const botaoAvancar = document.getElementById('avancar');
    const teste = document.getElementById('botao')
  
    const codigoSalvo = localStorage.getItem(faseAtual);

    let fase4Resp = ['string', 'int', 'float', 'booleano'];
    let fase8Resp = ['&&', '||', '&& !'];
    let resp;
  
    if (codigoSalvo){
        if(faseAtual == 'fase4'){
            resp = fase4Resp;
        }
        if(faseAtual == 'fase8'){
            resp = fase8Resp;
        }
        const selects = document.querySelectorAll('.options');
        for (let i = 0; i < selects.length; i++) {
                selects[i].value = resp[i];
                selects[i].disabled = true;
                selects[i].classList.add('lockado');
        }
      botaoAvancar.style.display = 'block';
      teste.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', ()=>{
    const body = document.body;
    const instrucao = document.querySelector('.instrucao')
  
      let fonte = localStorage.getItem('Fonte')
      let cor = localStorage.getItem('Cor');
  
      let volume = localStorage.getItem('Volume');

      if(volume){
        const musica = document.getElementById("musicaFundo");

        volume = volume * 0.01
        
        musica.volume = volume;

        musica.play(); 
    }

      if(cor){
          if(cor === 'Fundo Escuro Plano'){
              body.style.background = 'rgb(22, 22, 22)'
          } else if(cor == 'Fundo Roxo Plano'){
              body.style.background = 'rgb(85, 2, 91)'
          }
      }
  
      if(fonte){
        if(fonte === 'Grande'){
          instrucao.style.fontSize = '22px'
        } else if(fonte === 'Pequena'){
          instrucao.style.fontSize = '14px'
        }
      }
  })