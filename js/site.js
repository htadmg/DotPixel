const slides = document.querySelectorAll('.solucoes-itens');
let slideAtual = 0;

function mostrarSlides() {
    if (window.matchMedia('(min-width: 970px)').matches) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (let i = slideAtual; i < slideAtual + 4; i++) { // Alterado de 4 para 3
            slides[i % slides.length].style.display = 'block';
        }}
    else if (window.matchMedia('(min-width: 770px)').matches) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (let i = slideAtual; i < slideAtual + 3; i++) { // Alterado de 4 para 3
            slides[i % slides.length].style.display = 'block';
        }
    } else if (window.matchMedia('(min-width: 596px)').matches) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slides[slideAtual].style.display = 'block';
        slides[(slideAtual + 1) % slides.length].style.display = 'block';
    } else {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slides[slideAtual].style.display = 'block';
    }
}

function slideAnterior() {
    slideAtual = (slideAtual - 4 + slides.length) % slides.length;
    mostrarSlides();
}

function proximoSlide() {
    slideAtual = (slideAtual + 4) % slides.length;
    mostrarSlides();
}

document.getElementById('anterior').addEventListener('click', slideAnterior);
document.getElementById('proximo').addEventListener('click', proximoSlide);

mostrarSlides();
window.addEventListener('resize', mostrarSlides);

// função para carrossel das missoes
const carouselItems = document.querySelectorAll('.carrossel-item-superior, .carrossel-item-inferior');

carouselItems.forEach(item => {
    const originalImages = item.querySelectorAll('img');
    const totalImages = originalImages.length;
    let i = 0;

    while (i < totalImages) {
        const clonedImage = originalImages[i].cloneNode(true);
        item.appendChild(clonedImage);
        i++;
    }
});

let slideIndex = 0;
const totalClonedImages = carouselItems[0].querySelectorAll('img').length;
const imageWidth = 100 / totalClonedImages;

function showSlides() {
    slideIndex++;
    const offset = -slideIndex * imageWidth;

    carouselItems.forEach(item => {
        item.style.transition = 'transform 0.5s ease';
        item.style.transform = `translateX(${offset}%)`;
    });

    // Reinicia o loop quando chega ao final das imagens
    if (slideIndex >= totalClonedImages - 1) {
        setTimeout(() => {
            slideIndex = 0;
            carouselItems.forEach(item => {
                item.style.transition = 'none';
                item.style.transform = `translateX(0%)`;
            });
        }, 500); // Tempo para a transição terminar antes de resetar
    }
}

setInterval(showSlides, 1000); // Altera as imagens a cada 3 segundos


//função para abrir e fechar menu burguer

document.addEventListener("DOMContentLoaded", function () {
    const openMenuButton = document.getElementById("openMenu");
    const closeMenuButton = document.getElementById("closeMenu");
    const menu = document.getElementById("menu");

    openMenuButton.addEventListener("click", function () {
        menu.style.display = "flex";
    });

    closeMenuButton.addEventListener("click", function () {
        menu.style.display = "none";
    });
});


//função para enviar email

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contatoForm');
  const responseDiv = document.getElementById('mensagemSucesso');
  responseDiv.id = 'response';

  form.addEventListener('submit', function (e) {
      e.preventDefault(); // Impede o envio padrão do formulário

      // Pega os dados do formulário
      const formData = new FormData(this);

      // Envia os dados para o Formspree via AJAX
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://formspree.io/f/xwkdgkga');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200 || xhr.status === 201) {
                  responseDiv.textContent = 'Mensagem enviada com sucesso! Obrigado por entrar em contato.';
                  responseDiv.style.display = "flex";
                  form.reset(); // Limpa o formulário após o envio bem-sucedido
              } else {
                  responseDiv.textContent = 'Houve um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.';
              }
          }
      };
      xhr.send(formData);

      // Adiciona a resposta do envio do formulário após o formulário
      if (!document.getElementById('response')) {
          document.querySelector('.form-contato').appendChild(responseDiv);
      }
  });
});

// função para colocar o ativo no menu
const linksMenu = document.querySelectorAll('.nav-link a');

// Função para verificar qual seção está visível na tela
function setActiveLink() {
    // Obtém a posição atual da janela
    const scrollPosition = window.scrollY;

    // Itera sobre os links do menu
    linksMenu.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);

        // Verifica se a seção está visível na tela
        if (
            section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
        ) {
            // Remove a classe 'ativo' de todos os links
            linksMenu.forEach(link => {
                link.classList.remove('ativo');
            });

            // Adiciona a classe 'ativo' ao link correspondente à seção visível
            link.classList.add('ativo');
        }
    });
}
// Listener para verificar o scroll e atualizar o menu
window.addEventListener('scroll', setActiveLink);
