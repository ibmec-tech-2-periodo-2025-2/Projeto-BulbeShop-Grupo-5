// --- Variáveis globais (para evitar múltiplas queries no DOM) ---
let produtosContainer;

document.addEventListener("DOMContentLoaded", () => {
  // Define o contêiner principal (.caixa na sua estrutura HTML)
  produtosContainer = document.querySelector('.caixa');
  const botaoMais = document.querySelector(".botao-mais");
  
  if (botaoMais) {
    botaoMais.addEventListener("click", () => {
      window.location.href = "/index.html";
    });
  }

  // 1. Carrega os produtos e injeta no DOM
  carregarFavoritos();
  
  // 2. Configura o listener de eventos delegado UMA ÚNICA VEZ no container
  if (produtosContainer) {
    configurarListenersDoContainer(produtosContainer);
  } else {
      console.error("Erro: Container '.caixa' não encontrado na página.");
  }
});


/**
 * Salva o estado atual dos produtos visíveis no DOM para o localStorage.
 * Esta função é chamada após remover um item.
 */
function salvarFavoritos() {
  // Note: Selecionamos .produto dentro do container .caixa para maior precisão
  const produtos = produtosContainer ? produtosContainer.querySelectorAll('.produto') : [];
  
  const favoritos = Array.from(produtos).map(produto => {
    // Usamos .nome e .preco, que são as classes geradas na função carregarFavoritos
    return {
      id: produto.dataset.id,
      nome: produto.querySelector('.nome').textContent,
      preco: produto.querySelector('.preco').textContent,
      imagem: produto.querySelector('img').src
    };
  });
  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  // Atualiza a mensagem se a lista ficar vazia após a remoção
  if (produtos.length === 0 && produtosContainer) {
      produtosContainer.innerHTML = '<div>Nenhum produto favorito</div>';
  }
}

/**
 * Carrega os favoritos do localStorage e renderiza no DOM.
 */
function carregarFavoritos() {
  const favoritosJSON = localStorage.getItem('favoritos');

  if (!produtosContainer) return; 

  if (favoritosJSON) {
    const favoritos = JSON.parse(favoritosJSON);
    productosContainer.innerHTML = ''; // Limpa o conteúdo estático do HTML
    
    favoritos.forEach(item => {
      const produtoDiv = document.createElement('div');
      produtoDiv.classList.add('produto');
      // É crucial ter um ID válido aqui, obtido do localStorage
      produtoDiv.dataset.id = item.id;
      
      // Estrutura HTML do produto, garantindo que as classes .nome e .preco existam
      produtoDiv.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <span class="nome">${item.nome}</span>
        <span class="preco">${item.preco}</span>
        <button class="x">X</button>
        <button class="comprar">Comprar</button> 
      `;
      
      produtosContainer.appendChild(produtoDiv);
    });
    
    if (produtosContainer.children.length === 0) {
      produtosContainer.innerHTML = '<div>Nenhum produto favorito</div>';
    }
  } else {
      produtosContainer.innerHTML = '<div>Nenhum produto favorito</div>';
  }
}

/**
 * Configura o listener de eventos delegado (anexado apenas uma vez).
 * O uso de delegação garante que os eventos funcionem em elementos adicionados dinamicamente.
 */
function configurarListenersDoContainer(container) {
    container.addEventListener('click', (e) => {
        const produto = e.target.closest('.produto');

        // 1. Lógica do Botão 'X' (Remover)
        if (e.target.classList.contains('x')) {
          if (produto) {
            produto.remove();
            salvarFavoritos(); // Salva a lista atualizada no LocalStorage
          }
        } 
        
        // 2. Lógica do Botão 'Comprar' (Redirecionar)
        // ESTA É A LÓGICA QUE AGORA FUNCIONARÁ PARA TODOS OS BOTÕES
        else if (e.target.classList.contains('comprar')) {
          if (produto) {
            const id = produto.dataset.id;
            
            // Redireciona para a página de produtos passando o ID do item como parâmetro
            window.location.href = `/produtos.html?id=${id}`;
          }
        }
        
        // 3. Lógica do Modal (Clicar na imagem/produto)
        else if (produto) {
            // O target não foi 'x' nem 'comprar', mas está dentro de um produto.
            // Verifica se o clique não foi diretamente em um botão para evitar duplicidade
            if (!e.target.classList.contains('x') && !e.target.classList.contains('comprar')) {
                const imagem = produto.querySelector('img') ? produto.querySelector('img').src : '';
                
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
        }
    });
}