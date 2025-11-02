// Caminho para o JSON
const urlProdutos = "/data/afiliado.json";

// Seleciona o container onde os cards serão inseridos
const container = document.querySelector(".sessao-card");

// Busca os produtos do JSON e cria os cards
fetch(urlProdutos)
  .then(response => response.json())
  .then(produtos => {
    produtos.forEach(produto => {
      const card = document.createElement("div");
      card.classList.add("card-produto");

      card.innerHTML = `
        <div class="imagem-card" style="background-image: url('${produto.imagem}')"></div>
        <div class="info-card">
          <div class="nome-produto-card">${produto.nome}</div>
          <div class="preco-produto-card">R$ ${produto.preco.toFixed(2)}</div>
          <a href="${produto.link}" target="_blank" class="botao-produto">Ver produto</a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error("Erro ao carregar produtos:", error));
