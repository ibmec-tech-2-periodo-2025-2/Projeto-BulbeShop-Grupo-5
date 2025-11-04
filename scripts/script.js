document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("pesquisa");
  const container = document.getElementById("container-produtos-pesquisa");

  if (!searchBar || !container) {
    console.error("Erro: elementos de pesquisa não encontrados.");
    return;
  }

  let produtos = [];

  // 1️⃣ Carregar o JSON de produtos
  fetch("/data/produtos.json")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar produtos.json");
      return res.json();
    })
    .then(data => {
      produtos = data;
    })
    .catch(err => {
      console.error("Erro ao buscar produtos:", err);
    });

  // 2️⃣ Função para criar o card do produto
  function criarCard(produto) {
    const card = document.createElement("a");
    card.classList.add("card-produto");
    card.href = produto.pagina;
    card.innerHTML = `
      <div class="imagem-card" style="background-image: url('${produto.imagem}')"></div>
      <div class="info-card">
        <div class="nome-produto-card">${produto.nome}</div>
        <div class="preco-produto-card">R$ ${produto.preco.toFixed(2)}</div>
      </div>
    `;
    return card;
  }

  // 3️⃣ Função para renderizar os produtos filtrados
  function renderizarProdutos(lista) {
    container.innerHTML = "";

    if (lista.length === 0) {
      container.innerHTML = "<p style='text-align:center;color:#666;'>Nenhum produto encontrado.</p>";
      return;
    }

    lista.forEach(prod => container.appendChild(criarCard(prod)));
  }

  // 4️⃣ Evento de digitação na barra de busca
  searchBar.addEventListener("input", e => {
    const texto = e.target.value.trim().toLowerCase();

    if (texto === "") {
      container.style.opacity = "0";
      setTimeout(() => {
        container.style.display = "none";
        container.innerHTML = "";
      }, 200);
      return;
    }

    container.style.display = "flex";
    setTimeout(() => (container.style.opacity = "1"), 10);

    const filtrados = produtos.filter(p =>
      p.nome.toLowerCase().includes(texto) ||
      p.descricao.toLowerCase().includes(texto)
    );

    renderizarProdutos(filtrados);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".carrossel"); // onde os cards vão aparecer

  fetch("./data/produtos.json")
    .then(response => response.json())
    .then(produtos => {
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("smallItem");
        card.innerHTML = `
        
            <a href="${produto.pagina}">
            <div class="card-produto">
              <div class="imagem-card">
              <img src="/assets/img/${produto.imagem}" alt="${produto.nome}" class="imagem-card" /></div>
              <div class="info-card">
                <div class="info-one">
                  <div class="nome-produto-card">${produto.nome}</div>
                  
                </div>
                <div class="info-two">
                  <div class="preco-produto-card">R$ ${produto.preco.toFixed(2)}</div>
                  
                    <div class="botao-produto">Ver Produto</div>
                  
                </div>
              </div>
            </div>
          
            </a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Erro ao carregar produtos:", err));
});


            
            
        //  <div class="avaliacao">
        //             ${"⭐".repeat(Math.round(produto.avaliacao))}
        //           </div>   