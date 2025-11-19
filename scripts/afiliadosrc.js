document.addEventListener("DOMContentLoaded", () => {
  // --- 1. IDENTIFICAR A PÁGINA ---
  // Pega o nome do afiliado do HTML (ex: "Amazon" ou "Leroy Merlin")
  const nomeAfiliadoElement = document.querySelector(".nome-empresa-afiliado");
  if (!nomeAfiliadoElement) {
    console.error("Elemento .nome-empresa-afiliado não encontrado!");
    return;
  }
  const NOME_AFILIADO = nomeAfiliadoElement.textContent.trim();

  // --- 2. SELECIONAR OS CONTÊINERES ---
  const carrosselContainer = document.getElementById("carrossel-principal");
  const listaContainer = document.getElementById("carrosselDois");

  if (!carrosselContainer || !listaContainer) {
    console.error("Contêineres de produtos não encontrados!");
    return;
  }

  // --- 3. FUNÇÕES PARA CRIAR OS CARDS ---

  // Cria o HTML para os itens grandes do carrossel do topo
function criarCardPrincipal(produto) {
  // Removi o target="_blank" da linha abaixo
  return `
    <a href="${produto.pagina}"> 
    <div class="card-produto big">
      <img src="/assets/img/${produto.imagem}" alt="imagem-${produto.id}">
      
      <div class="info-card">
        <div class="nomeNota">
          <h1 class="nome">${produto.nome}</h1>
        </div>
        <h1 class="preco">R$ ${produto.preco.toFixed(2)}</h1>
      </div>
    </div>
    </a>
  `;
}

  // Cria o HTML para os itens pequenos da lista de baixo
  function criarCardOutros(produto) {
    // Reutilizei a estrutura .card-produto que você já tem na home
    return `
      <a href="${produto.pagina}" target="_blank">
      <div class="card-produto small">
        <div class="imagem-card">
        <img src="/assets/img/${produto.imagem}" alt="imagem-${produto.id}">
        </div>
        <div class="info-card">
          <div class="nomeNota">
            <h1 class="nome">${produto.nome}</h1>
          </div>
          <div class="info">
            <h1 class="preco">R$ ${produto.preco.toFixed(2)}</h1>
            <div class="botao-produto">Ver Produto</div>
          </div>
        </div>
        <div class="info">
          <h1 class="preco">R$ ${produto.preco.toFixed(2)}</h1>
          <div class="botao-produto">Ver Produto</div>
        </div>
      </div>
    </div>
    </a>
  `;
}

  // --- 4. BUSCAR E DISTRIBUIR OS PRODUTOS ---
  fetch("/data/produtos.json")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar produtos.json");
      return response.json();
    })
    .then(todosOsProdutos => {
      
      // Filtra APENAS os produtos do afiliado desta página
      const produtosDoAfiliado = todosOsProdutos.filter(
        p => p.loja === NOME_AFILIADO
      );

      // Separa os produtos em duas listas
      const produtosPrincipais = produtosDoAfiliado.filter(
        p => p.tags_home && p.tags_home.includes('Princpal')
      );
      
      const outrosProdutos = produtosDoAfiliado.filter(
        p => p.tags_home !== 'Princpal'
      );

      // --- 5. POPULAR O HTML ---
      
      // Limpa os contêineres (para o caso de ter algo)
      carrosselContainer.innerHTML = "";
      listaContainer.innerHTML = "";

      // Popula o carrossel principal
      if (produtosPrincipais.length > 0) {
        produtosPrincipais.forEach(produto => {
          carrosselContainer.innerHTML += criarCardPrincipal(produto);
        });
      } else {
        carrosselContainer.innerHTML = "<p>Nenhum produto principal encontrado.</p>";
      }

      // Popula a lista de outros produtos
      if (outrosProdutos.length > 0) {
        outrosProdutos.forEach(produto => {
          listaContainer.innerHTML += criarCardOutros(produto);
        });
      } else {
        listaContainer.innerHTML = "<p>Nenhum outro produto encontrado.</p>";
      }
    })
    .catch(error => {
      console.error("Erro no fetch:", error);
      carrosselContainer.innerHTML = "<p>Erro ao carregar produtos.</p>";
      listaContainer.innerHTML = "<p>Erro ao carregar produtos.</p>";
    });
});

  const botaoVoltar = document.getElementById("seta");
  if (botaoVoltar) {
    botaoVoltar.addEventListener('click', () => {
      window.history.back();
    });
  }