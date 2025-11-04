document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");

  const titulo = document.getElementById("classe");
  const lista = document.getElementById("lista-produtos");

  if (!categoria) {
    titulo.textContent = "Categoria não encontrada";
    return;
  }

  titulo.textContent = categoria.replace("-", " ");

  fetch("/data/produtos.json")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar produtos.json");
      return res.json();
    })
    .then(produtos => {
      const filtrados = produtos.filter(p => p.categoria === categoria);
      lista.innerHTML = "";

      if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
      }

      filtrados.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto");
        card.innerHTML = `
          <div class="ftproduto">
            <img src="/assets/img/${produto.imagem}" alt="${produto.nome}" class="fotoproduto" />
          </div>
          <div class="espe">
            <h2 class="nome-produto">${produto.nome}</h2>
            <h2 class="preco">R$ ${produto.preco.toFixed(2)}</h2>
            <a href="/paginas/produto.html?id=${produto.id}">
              <button>Comprar</button>
            </a>
          </div>
        `;
        lista.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar produtos:", err);
      lista.innerHTML = "<p>Erro ao carregar produtos.</p>";
    });
});
