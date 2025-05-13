document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('origem') === 'menu')return
    
    const faseAtual = document.body.dataset.fase;
    const campoCodigo = document.getElementById('codigoUsuario');
    const botaoAvancar = document.getElementById('avancar');
    const teste = document.getElementById('botao')
  
    const codigoSalvo = localStorage.getItem(faseAtual);
    window.faseValidaPorPersistencia = false;
  
    if (codigoSalvo) {
      campoCodigo.value = codigoSalvo;
      botaoAvancar.style.display = 'block';
      teste.style.display = 'none';
      window.faseValidaPorPersistencia = true;
    }
});

document.addEventListener('DOMContentLoaded', ()=>{
  const body = document.body;
  const instrucao = document.querySelector('.instrucao')
  const input = document.querySelector('.input')

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
        input.style.fontSize = '22px'
      } else if(fonte === 'Pequena'){
        instrucao.style.fontSize = '14px'
        input.style.fontSize = '14px'
      }
    }
})