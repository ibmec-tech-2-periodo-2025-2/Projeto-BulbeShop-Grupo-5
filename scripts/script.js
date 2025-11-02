document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".sessao-card"); // onde os cards vão aparecer

  fetch("./data/produtos.json")
    .then(response => response.json())
    .then(produtos => {
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("card-produto");
        card.innerHTML = `
          <div class="imagem-card" style="background-image: url('${produto.imagem}')"></div>
          <div class="info-card">
            <h3 class="nome-produto-card">${produto.nome}</h3>
            <p class="preco-produto-card">R$ ${produto.preco.toFixed(2)}</p>
            <div class="avaliacao">
              ${"⭐".repeat(Math.round(produto.avaliacao))}
            </div>
            <a href="${produto.linkAfiliado}" class="botao-produto" target="_blank">
              Ver produto
            </a>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Erro ao carregar produtos:", err));
});
