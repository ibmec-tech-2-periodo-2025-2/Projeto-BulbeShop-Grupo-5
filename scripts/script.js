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
  // 1. Pegue os contêineres de destino
  const containerPrincipal = document.getElementById("carrossel-principais");
  const containerLancamentos = document.getElementById("carrossel-lançamentos");
  const containerEco = document.getElementById("carrossel-eco");

  // 2. Função REUTILIZÁVEL para criar o card
  //    (Você já tem uma parecida no seu script de busca, pode adaptar)
  function criarCardProduto(produto) {
    const card = document.createElement("div");
    card.classList.add("card-produto");
    
    // Usei a estrutura do seu outro script
    card.innerHTML = `
      <div class="imagem-card">
        <img src="/assets/img/${produto.imagem}" alt="imagem-${produto.id}">
      </div>
      
      <div class="info-card">
        <div>
          <div class="nome-produto-card">${produto.nome}</div>
          <div class="avaliacao">
             ${"<div></div>".repeat(5)} </div>
        </div>
        <div>
          <div class="preco-produto-card">R$ ${produto.preco.toFixed(2)}</div>
          <a href="${produto.pagina || '#'}" class="botao-produto">Ver Produto</a>
        </div>
      </div>
    `;
    return card;
  }

  // 3. Carregue o JSON e DISTRIBUA os produtos
  fetch("./data/produtos.json")
    .then(response => response.json())
    .then(todosOsProdutos => {
      
      // Filtra os produtos para cada seção
      const principal = todosOsProdutos.filter(p => p.tags_home && p.tags_home.includes('Princpal'));
      const lancamentos = todosOsProdutos.filter(p => p.tags_home && p.tags_home.includes('lançamentos'));
      const eco = todosOsProdutos.filter(p => p.tags_home && p.tags_home.includes('eco'));

      // 4. Popula cada contêiner
      principal.forEach(produto => {
        containerPrincipal.appendChild(criarCardProduto(produto));
      });
      
      lancamentos.forEach(produto => {
        containerLancamentos.appendChild(criarCardProduto(produto));
      });
      
      eco.forEach(produto => {
        containerEco.appendChild(criarCardProduto(produto));
      });

    })
    .catch(err => console.error("Erro ao carregar e distribuir produtos:", err));
});

const carrossel = document.querySelector(".carrossel-categorias");
const categorias = document.querySelectorAll(".icone-texto-categoria");

function atualizarCentro() {
  let centroTela = window.innerWidth / 2;
  let ativo = null;
  let menorDist = Infinity;

  categorias.forEach(categoria => {
    const rect = categoria.getBoundingClientRect();
    const centroItem = rect.left + rect.width / 2;
    const dist = Math.abs(centroItem - centroTela);
    if (dist < menorDist) {
      menorDist = dist;
      ativo = categoria;
    }
  });

  categorias.forEach(c => c.classList.remove("ativo"));
  if (ativo) ativo.classList.add("ativo");
}

carrossel.addEventListener("scroll", atualizarCentro);

window.addEventListener("resize", atualizarCentro);
atualizarCentro();

const botaoVoltar = document.getElementById("seta");
if (botaoVoltar) {
  botaoVoltar.addEventListener('click', () => {
    window.history.back();
  });
}
