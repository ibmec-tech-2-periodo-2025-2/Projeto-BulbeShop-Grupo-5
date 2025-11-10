// favoritos.js

fetch('./data/produtos.json')
  .then(response => response.json())
  .then(produtos => {
    const favoritos = obterFavoritosDoLocalStorage();
    const produtosFavoritos = produtos.filter(produto => 
      favoritos.some(favorito => favorito.id === produto.id)
    );

    produtosContainer.innerHTML = ''; // limpa conteúdo estático

    if (produtosFavoritos.length === 0) {
      produtosContainer.innerHTML = '<div>Nenhum produto favorito</div>';
      return;
    }

    produtosFavoritos.forEach(item => {
      const produtoDiv = document.createElement('div');
      produtoDiv.classList.add('produto');
      produtoDiv.dataset.id = item.id;

      produtoDiv.innerHTML = `
        <img src="${item.imagem ? item.imagem : 'default-image.jpg'}" alt="${escapeHtml(item.nome || '')}">
        <span class="nome">${escapeHtml(item.nome || '')}</span>
        <span class="preco">${escapeHtml(item.preco || '')}</span>
        <button class="x">X</button>
        <button class="comprar">Comprar</button>
      `;
      produtosContainer.appendChild(produtoDiv);
    });
  })
  .catch(error => console.error('Erro ao carregar produtos:', error));
let produtosContainer = document.querySelector('.caixa');

document.addEventListener('DOMContentLoaded', () => {
  if (!produtosContainer) {
    console.error('Container de produtos não encontrado.');
    return;
  }
  const botaoMais = document.querySelector('.botao-mais');

  if (botaoMais) {
    botaoMais.addEventListener('click', () => {
      window.location.href = '/index.html';
    });
  }

  carregarFavoritos();
  if (produtosContainer) {
    configurarListenersDoContainer(produtosContainer);
  }
});

function obterFavoritosDoLocalStorage() {
  try {
    const json = localStorage.getItem('favoritos');
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Erro ao ler favoritos do localStorage', e);
    return [];
  }
}

function salvarFavoritosNoLocalStorage(favoritos) {
  try {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  } catch (e) {
    console.error('Erro ao salvar favoritos no localStorage', e);
  }
}

function carregarFavoritos() {
  if (!produtosContainer) return;
  const favoritos = obterFavoritosDoLocalStorage();

  produtosContainer.innerHTML = ''; // limpa conteúdo estático

  if (!favoritos || favoritos.length === 0) {
    produtosContainer.innerHTML = '<div>Nenhum produto favorito</div>';
    return;
  }

  favoritos.forEach(item => {
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');
    if (item.id !== undefined) produtoDiv.dataset.id = item.id;

    produtoDiv.innerHTML = `
      <img src="${item.imagem || ''}" alt="${escapeHtml(item.nome || '')}">
      <span class="nome">${escapeHtml(item.nome || '')}</span>
      <span class="preco">${escapeHtml(item.preco || '')}</span>
      <button class="x">X</button>
      <button class="comprar">Comprar</button>
    `;
    produtosContainer.appendChild(produtoDiv);
  });
}

// Atualiza o localStorage com base nos elementos .produto atualmente no DOM
function salvarFavoritosAPartirDoDOM() {
  if (!produtosContainer) return;
  const produtos = Array.from(produtosContainer.querySelectorAll('.produto'));
  const favoritos = produtos.map(produto => {
    return {
      id: produto.dataset.id,
      nome: produto.querySelector('.nome') ? produto.querySelector('.nome').textContent : '',
      preco: produto.querySelector('.preco') ? produto.querySelector('.preco').textContent : '',
      imagem: produto.querySelector('img') ? produto.querySelector('img').src : ''
    };
  });
  salvarFavoritosNoLocalStorage(favoritos);
  if (favoritos.length === 0) {
    produtosContainer.innerHTML = '<div>Nenhum produto favorito</div>';
  }
}

function configurarListenersDoContainer(container) {
  container.addEventListener('click', (e) => {
    const produto = e.target.closest('.produto');

    if (e.target.classList.contains('x')) {
      // Remover favorito
      if (produto) {
        produto.remove();
        salvarFavoritosAPartirDoDOM();
      }
      return;
    }

    if (e.target.classList.contains('comprar')) {
      // Redirecionar para página do produto
      if (produto) {
        const id = produto.dataset.id;
        if (id) {
          window.location.href = `/produtos.html?id=${encodeURIComponent(id)}`;
        } else {
          // sem id, redireciona para produtos gerais
          window.location.href = '/produtos.html';
        }
      }
      return;
    }

    // Clique em produto (abrir modal)
    if (produto && !e.target.classList.contains('x') && !e.target.classList.contains('comprar')) {
      const img = produto.querySelector('img');
      const src = img ? img.src : '';
      abrirModalImagem(src);
    }
  });
}

function abrirModalImagem(src) {
  if (!src) return;
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${src}" alt="Imagem do produto">
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) modal.remove();
  });
}

// Pequena função para escapar texto em inserções HTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


























