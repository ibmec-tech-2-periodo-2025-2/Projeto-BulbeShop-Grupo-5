document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Pegar o ID da URL (?id=1)
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    console.error("Nenhum ID de produto encontrado na URL.");
    document.getElementById("nome-produto").textContent = "Produto não encontrado.";
    return;
  }

  // 2️⃣ Buscar os produtos do JSON (lista simples)
  fetch("/data/produtos.json")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar produtos.json");
      return response.json();
    })
    .then(produtos => {
      // 3️⃣ Encontrar o produto pelo ID
      const produto = produtos.find(p => p.id == id);

      if (!produto) {
        document.getElementById("nome-produto").textContent = "Produto não encontrado.";
        return;
      }

      // 4️⃣ Preencher os dados no HTML
      document.getElementById("nome-produto").textContent = produto.nome;
      document.getElementById("descricao-produto").textContent = produto.descricao;
      document.getElementById("preco-produto").textContent = `R$ ${produto.preco.toFixed(2)}`;
      document.getElementById("foto-principal").src = `/assets/img/${produto.imagem}`;
      document.getElementById("link-afiliado").href = produto.linkAfiliado;
      document.getElementById("logo-marca").src = `/assets/img/${produto.lojalogo}`;


      // 5️⃣ Tratar imagem ausente
      document.getElementById("foto-principal").addEventListener("error", () => {
        document.getElementById("foto-principal").src = "/assets/img/placeholder.jpg";
      });
    })
    .catch(error => {
      console.error("Erro ao carregar produto:", error);
      document.getElementById("nome-produto").textContent = "Erro ao carregar produto.";
        console.log("Mensagem:", error.message);
        console.log("Tipo:", error.name);
        console.log("Stack:", error.stack);
    });
});


//Funcionamente do botão de favoritos
document.addEventListener("DOMContentLoaded", () => {
// Seleciona a imagem dentro da div .bookmark (ou a própria div se não houver img)
  const bookmarkEl = document.querySelector(".bookmark img") || document.querySelector(".bookmark");
  if (!bookmarkEl) return;

  bookmarkEl.style.cursor = "pointer";
  bookmarkEl.setAttribute("role", "button");
  bookmarkEl.tabIndex = 0;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const FAVORITES_KEY = "favoritos";

  // Função que busca o produto pelo id e retorna o objeto
  async function fetchProdutoPorId(produtoId) {
    const resp = await fetch("/data/produtos.json");
    if (!resp.ok) throw new Error("Erro ao carregar produtos.json");
    const produtos = await resp.json();
    return produtos.find(p => p.id == produtoId);
  }

  // Lê favoritos do localStorage
  function lerFavoritos() {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // Salva favoritos no localStorage
  function salvarFavoritos(list) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  }

  // Alterna favorito: adiciona ou remove
  async function toggleFavorito() {
    try {
      const produto = await fetchProdutoPorId(id);
      if (!produto) {
        console.error("Produto não encontrado para favoritar.");
        return;
      }

      const favoritos = lerFavoritos();
      const idx = favoritos.findIndex(f => f.id == produto.id);

      if (idx > -1) {
        // já é favorito -> remover
        favoritos.splice(idx, 1);
        salvarFavoritos(favoritos);
        bookmarkEl.classList.remove("favorito");
        // feedback mínimo (pode ser substituído por um elemento UI)
        alert("Produto removido dos favoritos.");
      } else {
        // adicionar produto completo (com características)
        favoritos.push(produto);
        salvarFavoritos(favoritos);
        bookmarkEl.classList.add("favorito");
        alert("Produto adicionado aos favoritos.");
      }
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
    }
  }

  // Ativa a ação no clique e na tecla Enter/Espaço para acessibilidade
  bookmarkEl.addEventListener("click", toggleFavorito);
  bookmarkEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFavorito();
    }
  });

  // Estado inicial: marca se já estiver nos favoritos
  (async () => {
    try {
      const favoritos = lerFavoritos();
      if (favoritos.find(f => f.id == id)) bookmarkEl.classList.add("favorito");
    } catch (err) {
      console.error(err);
    }
  })();
});

