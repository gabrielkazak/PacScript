document.addEventListener('DOMContentLoaded', () => {

    if(document.referrer.includes('frontend/menu/menu.html')){
      return
    }
    
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
        
        // Define o volume aqui (por exemplo, 50% do volume máximo)
        musica.volume = volume; // Valor entre 0.0 (mudo) e 1.0 (volume máximo)

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