document.addEventListener("DOMContentLoaded", () => {
    const itensMenu = document.querySelectorAll(".menu_opcoes_item");
    let angulo = 5;
    let invertido = false;

    setInterval(() => {
        const rotacao = invertido ? -angulo : angulo;

        itensMenu.forEach(item => {
            item.style.transform = `rotate(${rotacao}deg)`;
        });

        invertido = !invertido;
    }, 4000);
});

document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector(".menu_titulo");
    let angulo = 5;
    let invertido = false;

    setInterval(() => {
        const rotacao = invertido ? -angulo : angulo;

        titulo.style.transform = `rotate(${rotacao}deg)`;
    

        invertido = !invertido;
    }, 6000);
});



document.addEventListener("DOMContentLoaded", () => {
    let pontuacao = localStorage.getItem('pontuação')

    if(pontuacao == null){
        return
    }
    
    document.querySelector('.continuar').style.display = 'block'
    
    const body = document.body;

    let volume = localStorage.getItem('Volume');
      if(volume){
        const musica = document.getElementById("musicaFundo");
        volume = volume * 0.01
        musica.volume = volume;
        musica.play(); 
    }
    
    let cor = localStorage.getItem('Cor');
    if(cor){
        if(cor === 'Fundo Escuro Plano'){
            body.style.background = 'rgb(22, 22, 22)'
        } else if(cor == 'Fundo Roxo Plano'){
            body.style.background = 'rgb(85, 2, 91)'
        }
    }

    const ultimoCaminho = localStorage.getItem('ultimoCaminho');
    if (ultimoCaminho) {
        document.querySelector('.continuar').addEventListener('click', () => {
        window.location.href = ultimoCaminho;
      });
    }
});

document.querySelector('.novoJogo').addEventListener("click", () => {

    const fonte = localStorage.getItem('Fonte');
    const cor = localStorage.getItem('Cor');
    const volume = localStorage.getItem('Volume');

    localStorage.clear();

    localStorage.setItem('Fonte', fonte);
    localStorage.setItem('Cor', cor);
    localStorage.setItem('Volume', volume);

    localStorage.setItem('pontuação', 0);
});


const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Pacman {
    constructor(startX, startY, speed, directionX, directionY, offsetX, offsetY) {
        this.startX = startX;
        this.startY = startY;
        this.x = startX;
        this.y = startY;
        this.speed = speed;
        this.directionX = directionX;
        this.directionY = directionY;
        this.offsetX = offsetX * this.speed;
        this.offsetY = offsetY * this.speed;
        this.size = 20;
        this.frame = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#FAD210";

        let mouthOffset = 0.3 * Math.PI * Math.abs(Math.sin(this.frame * 0.2));

        let angleStart, angleEnd;

        if (this.directionX === 1) {
            angleStart = mouthOffset;
            angleEnd = 2 * Math.PI - mouthOffset;
        } else if (this.directionX === -1) {
            angleStart = Math.PI + mouthOffset;
            angleEnd = Math.PI - mouthOffset;
        } else if (this.directionY === 1) {
            angleStart = 0.5 * Math.PI + mouthOffset;
            angleEnd = 2.5 * Math.PI - mouthOffset;
        } else { // Indo para cima
            angleStart = -0.5 * Math.PI + mouthOffset;
            angleEnd = 1.5 * Math.PI - mouthOffset;
        }

        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.size, angleStart, angleEnd);
        ctx.fill();
    }

    update() {
        this.x += this.speed * this.directionX;
        this.y += this.speed * this.directionY;

        // Controle do reaparecimento na posição original
        if (this.directionX === 1 && this.x > canvas.width + this.size) { 
            this.x = this.startX;
            this.y += this.offsetY;
        } 
        else if (this.directionX === -1 && this.x < -this.size) { 
            this.x = this.startX;
            this.y -= this.offsetY;
        } 
        else if (this.directionY === 1 && this.y > canvas.height + this.size) { 
            this.y = this.startY;
            this.x += this.offsetX;
        } 
        else if (this.directionY === -1 && this.y < -this.size) { 
            this.y = this.startY;
            this.x -= this.offsetX;
        }

        this.frame++;
    }
}

const pacmans = [
    new Pacman(-20, canvas.height * 0.25, 3, 1, 0, 0, 3),
    new Pacman(canvas.width + 20, canvas.height * 0.85, 2, -1, 0, 0, 3.5),
    new Pacman(canvas.width * 0.2, -20, 2.5, 0, 1, 3, 0),
    new Pacman(canvas.width * 0.9, canvas.height + 20, 3.5, 0, -1, 2.5, 0)
];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    pacmans.forEach(pac => {
        pac.update();
        pac.draw();
    });

    requestAnimationFrame(animate);
}

animate();

let botaoFases = document.querySelector('.fases')
let menu = document.querySelector('.container')
let fases = document.querySelector('.container_fases')
let cards = document.querySelector('.cards')

botaoFases.addEventListener('click', () => {
    menu.style.display = 'none';
    fases.style.display = 'block';

    cards.innerHTML = '';

    class Fase {
        constructor(nome, rota, descricao) {
            this.nome = nome;
            this.rota = rota;
            this.descricao = descricao;
        }
    }

    const listaFases = [
        new Fase('Fase 1', '../fase1/fase1.html', 'Lógica'),
        new Fase('Fase 2', '../fase2/fase2.html', 'Pseudocódigo'),
        new Fase('Fase 3', '../fase3/fase3.html', 'Variáveis'),
        new Fase('Fase 4', '../fase4/fase4.html', 'Tipos de Dados'),
        new Fase('Fase 5', '../fase5/fase5.html', 'Constantes'),
        new Fase('Fase 6', '../fase6/fase6.html', 'Atribuição'),
        new Fase('Fase 7', '../fase7/fase7.html', 'Comparação'),
        new Fase('Fase 8', '../fase8/fase8.html', 'Lógicos'),
        new Fase('Fase 9', '../fase9/fase9.html', 'Revisão'),
        new Fase('Fase 10', '../fase10/fase10.html', 'Jogo Original')
    ];

    listaFases.forEach((fase, index) => {
        const faseSalva = localStorage.getItem(`fase${index + 1}`);

        if (faseSalva !== null) {
            const card = document.createElement('div');
            card.classList.add('card_fase');

            const nomeFase = document.createElement('p');
            nomeFase.classList.add('numero_fase');
            nomeFase.textContent = fase.nome;

            const descricaoFase = document.createElement('p');
            descricaoFase.classList.add('topico_fase');
            descricaoFase.textContent = fase.descricao;

            card.appendChild(nomeFase);
            card.appendChild(descricaoFase);

            card.addEventListener('click', () => {
                window.location.href = fase.rota;
                localStorage.setItem('veioDoMenu', 'true');
            });

            cards.appendChild(card);
        }
    });
});

document.querySelector('.voltar-fases').addEventListener('click', ()=>{
    menu.style.display = 'flex';
    fases.style.display = 'none';
})

let botaoConfigs = document.querySelector('.configs')
let configs = document.querySelector('.container_config')

botaoConfigs.addEventListener('click', ()=>{
    menu.style.display = 'none';
    configs.style.display = 'block';
})

document.querySelector('.voltar-configs').addEventListener('click', ()=>{
    menu.style.display = 'flex';
    configs.style.display = 'none';
})

function initializeDropdown(dropdownId, type, valorSalvo) {
    const dropdown = document.querySelector(`#${dropdownId}`);
    const selected = dropdown.querySelector('.dropdown-selected');
    const optionsContainer = dropdown.querySelector('.dropdown-options');
    const options = dropdown.querySelectorAll('.dropdown-option');

    if (valorSalvo) {
        options.forEach(option => {
            if (option.textContent === valorSalvo) {
                selected.textContent = valorSalvo;
                option.classList.add('selected');
                if (type === 'font-size') {
                    if (valorSalvo === 'Pequena') selected.style.fontSize = '14px';
                    else if (valorSalvo === 'Grande') selected.style.fontSize = '22px';
                    else selected.style.fontSize = '18px';
                }
            }
        });
    }

    selected.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.textContent = option.textContent;

            if (type === 'font-size') {
                if (option.textContent === 'Pequena') selected.style.fontSize = '14px';
                else if (option.textContent === 'Grande') selected.style.fontSize = '22px';
                else selected.style.fontSize = '18px';
            }

            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            optionsContainer.style.display = 'none';
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            optionsContainer.style.display = 'none';
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const valorFonte = localStorage.getItem('Fonte');
    const valorCor = localStorage.getItem('Cor');

    initializeDropdown('font-size-dropdown', 'font-size', valorFonte);
    initializeDropdown('background-color-dropdown', 'background-color', valorCor);
});

const slider = document.getElementById('volume');
const volumeValue = document.getElementById('volume-value');

slider.addEventListener('input', () => {
  volumeValue.textContent = slider.value;
  
});

document.querySelector('.alterar').addEventListener('click', () => {
 
    const fontSizeDropdown = document.querySelector('#font-size-dropdown .dropdown-selected');
    const tamanhoFonte = fontSizeDropdown.textContent.trim();

    const backgroundColorDropdown = document.querySelector('#background-color-dropdown .dropdown-selected');
    const corFundo = backgroundColorDropdown.textContent.trim();

    const valorVolume = document.querySelector('#volume').value;

    localStorage.setItem('Fonte', tamanhoFonte);
    localStorage.setItem('Cor', corFundo);
    localStorage.setItem('Volume', valorVolume);

    window.location.reload();
});

