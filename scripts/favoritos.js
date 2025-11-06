document.addEventListener("DOMContentLoaded", () => {

const botoesRemover = document.querySelectorAll(".x");


botoesRemover.forEach(botao => {
    botao.addEventListener("click", () => {
      const produto = botao.closest(".produto");
      if (produto) {
        produto.remove();
      }
    });
  });

const botaoMais = document.querySelector(".botao-mais");

botaoMais.addEventListener("click", () => {
    window.location.href = "/index.html";
  });
});

//início Web Storage JS
function salvarFavoritos() {
  const produtos = document.querySelectorAll('.produto');
  const favoritos = Array.from(produtos).map(produto => {
    return {
      id: produto.dataset.id,
      nome: produto.querySelector('.nome').textContent,
      preco: produto.querySelector('.preco').textContent,
      imagem: produto.querySelector('img').src
    };
  });
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

document.addEventListener('DOMContentLoaded', () => {
  const favoritosJSON = localStorage.getItem('favoritos');
  if (favoritosJSON) {
    const favoritos = JSON.parse(favoritosJSON);
    const container = document.querySelector('.produtos-container');
    favoritos.forEach(item => {
      container.innerHTML += `
        <div class="produto" data-id="${item.id}">
          <img src="${item.imagem}" alt="${item.nome}">
          <span class="nome">${item.nome}</span>
          <span class="preco">${item.preco}</span>
          <button class="x">X</button>
        </div>`;
    });
  }
});

//Início captura das imagens no srquivo JSON para alocação na página de favoritos
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('x')) {
    salvarFavoritos();
  }
});


const container = document.querySelector('.produtos-container');
const favoritosJSON = localStorage.getItem('favoritos');
if (favoritosJSON) {
  const favoritos = JSON.parse(favoritosJSON);
  favoritos.forEach(item => {
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');
    produtoDiv.dataset.id = item.id;
    produtoDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <span class="nome">${item.nome}</span>
      <span class="preco">${item.preco}</span>
      <button class="x">X</button>
    `;
    container.appendChild(produtoDiv);
  });
}
if (container.children.length === 0) {
  const mensagem = document.createElement('div');
  mensagem.textContent = 'Produto não encontrado';
  container.appendChild(mensagem);
} else {
  container.addEventListener('click', (e) => {
    if (e.target.closest('.produto')) {
      const produto = e.target.closest('.produto');
      const imagem = produto.querySelector('img').src;
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <img src="${imagem}" alt="Imagem do produto">
        </div>`;
      document.body.appendChild(modal);

      modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
      });
    }
  });
}
