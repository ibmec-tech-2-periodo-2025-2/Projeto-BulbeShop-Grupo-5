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
      document.getElementById("avaliacao-produto").innerHTML = `<h1>${produto.totalstar}</h1> <img src="/assets/img/Icon.png" alt="⭐" /> <p>(${produto.totalavali})</p>`;





const analises = document.getElementById("analises");

enviar.addEventListener("click", ()=> {
  if (nome.value !== null && comenta.value !== null ) 
    {
      produto.comentarios.push(`{"nome":"${nome.value}",
      "nota": ${nota},
      "comentario": ${comenta.value}
      }`)
        console.log(produto.comentarios)
  }

  const avalia = document.createElement("div")
  avalia.innerHTML = `<div class="nome-tempo">
              <h1>augusto</h1> 
              <h2>tempo</h2>
            </div>
              <div class="nota"></div>
              <h1>oi</h1>`;
  analises.appendChild(avalia)


})





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





const sim = document.getElementById("sim");
const nao = document.getElementById("nao");
const fundo = document.getElementById("fundo");
const fundoRedi = document.getElementsByClassName("fundoRedi")[0];
const buttonPop = document.getElementById("buttonPop")


nao.addEventListener("click", () => {
  fundo.classList.toggle("blur");
  fundoRedi.classList.toggle("off");
})

buttonPop.addEventListener("click", () => {
  fundo.classList.toggle("blur");
  fundoRedi.classList.toggle("off");
})


//Funcionamento do botão de favoritos
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
  
  // NOVAS CONSTANTES PARA OS ÍCONES
  const ICONE_PADRAO = "/assets/img/Component.png";
  const ICONE_FAVORITO = "/assets/img/icon-favorito-completo.png";
  
  // NOVA FUNÇÃO PARA ATUALIZAR O ÍCONE
  function atualizarIcone() {
    // Verifica se a classe 'favorito' está presente para definir a imagem
    if (bookmarkEl.classList.contains("favorito")) {
      bookmarkEl.src = ICONE_FAVORITO;
      bookmarkEl.alt = "Remover dos Favoritos";
    } else {
      bookmarkEl.src = ICONE_PADRAO;
      bookmarkEl.alt = "Favoritar";
    }
  }

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
        atualizarIcone(); // CHAMADA ADICIONADA: volta para o ícone padrão
        // feedback mínimo (pode ser substituído por um elemento UI)
//         alert("Produto removido dos favoritos.");
      } else {
        // adicionar produto completo (com características)
        favoritos.push(produto);
        salvarFavoritos(favoritos);
        bookmarkEl.classList.add("favorito");
        atualizarIcone(); // CHAMADA ADICIONADA: muda para o ícone de favorito
//         alert("Produto adicionado aos favoritos.");
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
      // Adiciona a classe, mas não muda o ícone imediatamente
      if (favoritos.find(f => f.id == id)) bookmarkEl.classList.add("favorito");
      
      // CHAMADA ADICIONADA: Define o ícone correto baseado no estado inicial
      atualizarIcone(); 
    } catch (err) {
      console.error(err);
    }
  })();
});

  const botaoVoltar = document.getElementById("seta");
  if (botaoVoltar) {
    botaoVoltar.addEventListener('click', () => {
      window.history.back();
    });
  }







 document.addEventListener("DOMContentLoaded", () => {
  // --- CONSTANTES E SELETORES ---
  const STORAGE_KEY = "avaliacoes_bulbe";
  const urlParams = new URLSearchParams(window.location.search);
  const PRODUTO_ID = urlParams.get("id");

  const ui = {
    btnAbrir: document.getElementById("abrir"),
    formContainer: document.getElementById("form"),
    containerAnalises: document.getElementById("analises"),
    starsContainer: document.getElementById("stars"),
    stars: document.querySelectorAll(".star"),
    btnEnviar: document.getElementById("enviar"),
    inputNome: document.getElementById("name"),
    inputComentario: document.getElementById("comenta"),
  };

  let notaSelecionada = 0;

  // --- 1. FUNÇÕES DE DADOS (LOCALSTORAGE) ---
  const getAvaliacoes = () => {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  };

  const saveAvaliacoes = (lista) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  };

  const adicionarAvaliacaoNoBanco = (avaliacao) => {
    const lista = getAvaliacoes();
    lista.push(avaliacao);
    saveAvaliacoes(lista);
  };

  // --- 2. FUNÇÕES DE INTERFACE (UI) ---
  
  // Alterna visualização do formulário
  const toggleFormulario = () => {
    const isFlex = ui.formContainer.style.display === "flex";
    ui.formContainer.style.display = isFlex ? "none" : "flex";
    ui.btnAbrir.textContent = isFlex ? "Adicionar avaliação" : "Cancelar";
  };

  // Atualiza a cor das estrelas no formulário
  const atualizarEstrelas = (valor) => {
    notaSelecionada = valor;
    ui.stars.forEach((s) => {
      const valorEstrela = parseInt(s.value);
      s.classList.toggle("gold", valorEstrela <= valor);
    });
  };

  // Limpa os campos após enviar
  const resetarFormulario = () => {
    ui.inputNome.value = "";
    ui.inputComentario.value = "";
    atualizarEstrelas(0);
    toggleFormulario();
  };

  // Cria o card de avaliação (Com proteção XSS simples)
  const criarCardHTML = (av) => {
    const div = document.createElement("div");
    div.classList.add("avalia");

    // Usamos textContent para evitar injeção de HTML malicioso
    
    const nomeEl = document.createElement("h3");
    nomeEl.textContent = av.nome;

    const dataEl = document.createElement("h5");
    dataEl.textContent = av.data;


    const comentarioEl = document.createElement("h4");
    comentarioEl.textContent = av.texto;

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("nome-tempo");
    headerDiv.appendChild(nomeEl);
    headerDiv.appendChild(dataEl);

    const notaDiv = document.createElement("div");
    notaDiv.classList.add("nota");
    notaDiv.style.color = "gold";
    notaDiv.style.marginBottom = "5px";
    notaDiv.textContent = "⭐".repeat(av.nota);

    div.appendChild(headerDiv);
    div.appendChild(notaDiv);
    div.appendChild(comentarioEl);

    return div;
  };

  // --- 3. LÓGICA PRINCIPAL ---

  const carregarAvaliacoesNaTela = () => {
    ui.containerAnalises.innerHTML = ""; // Limpa lista atual
    const todas = getAvaliacoes();
    const doProduto = todas.filter((a) => a.produtoId === PRODUTO_ID);

    if (doProduto.length == 0) {
      ui.containerAnalises.innerHTML =
        "<p style='padding:20px; color:#666'>Seja o primeiro a avaliar este produto!</p>";
      return;
    }

    // Prepend para os mais novos aparecerem primeiro (opcional, use appendChild para ordem cronológica)
    doProduto.forEach((av) => {
      ui.containerAnalises.prepend(criarCardHTML(av));
    });
  };

  const processarEnvio = () => {
    const nome = ui.inputNome.value.trim();
    const texto = ui.inputComentario.value.trim();

    if (!nome || !texto || notaSelecionada === 0) {
      alert("Preencha todos os campos e selecione uma nota!");
      return;
    }

    const novaAvaliacao = {
      id: Date.now(), // ID único para a avaliação
      produtoId: PRODUTO_ID,
      nome,
      texto,
      nota: notaSelecionada,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    

    adicionarAvaliacaoNoBanco(novaAvaliacao);
    ui.containerAnalises.prepend(criarCardHTML(novaAvaliacao));
    
    // Remove msg de "Seja o primeiro" se existir
    const msgVazia = ui.containerAnalises.querySelector("p");
    if (msgVazia) msgVazia.remove();

    resetarFormulario();
  };

  // --- 4. EVENT LISTENERS ---
  
  ui.btnAbrir.addEventListener("click", toggleFormulario);
  
  ui.btnEnviar.addEventListener("click", processarEnvio);

  ui.stars.forEach((star) => {
    star.addEventListener("click", (e) => {
      atualizarEstrelas(parseInt(e.target.value));
    });
  });

  // --- INICIALIZAÇÃO ---
  carregarAvaliacoesNaTela();
});

document.addEventListener("DOMContentLoaded", () => {
  // --- CONSTANTES ---
  const STORAGE_KEY = "avaliacoes_bulbe";
  const urlParams = new URLSearchParams(window.location.search);
  const PRODUTO_ID = urlParams.get("id"); // O ID vem como string da URL (ex: "12")

  const ui = {
    // ... seus seletores existentes ...
    mediaContainer: document.getElementById("avaliacao-produto"),
    // Adicione este seletor para exibir o total numérico se quiser
    // totalReviewsContainer: document.getElementById("total-reviews-count") 
  };

  // --- FUNÇÕES AUXILIARES ---
  const getAvaliacoesLocais = () => {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  };

  // --- LÓGICA INTELIGENTE DE MÉDIA ---
  const calcularExibirMedia = async () => {
    
    // 1. Busca os dados "Base" do JSON (O histórico antigo)
    let baseCount = 0;
    let baseMedia = 0;

    try {
      const res = await fetch("/data/produtos.json");
      const produtos = await res.json();
      // Encontra o produto atual no JSON (converte ID para string para garantir a comparação)
      const produtoJson = produtos.find(p => String(p.id) === String(PRODUTO_ID));

      if (produtoJson) {
        baseCount = produtoJson.totalavali || 0; // Ex: 13
        baseMedia = produtoJson.totalstar || 0;  // Ex: 4.4
      }
    } catch (erro) {
      console.error("Erro ao ler JSON base:", erro);
    }

    // 2. Busca os dados "Novos" do LocalStorage
    const todasLocais = getAvaliacoesLocais();
    // Filtra apenas as avaliações deste produto específico
    const novasDoProduto = todasLocais.filter(a => String(a.produtoId) === String(PRODUTO_ID));
    
    const novosCount = novasDoProduto.length;
    // Soma todas as notas novas (ex: 5 + 4 + 5...)
    const somaNovasNotas = novasDoProduto.reduce((acc, item) => acc + item.nota, 0);

    // 3. Matemática da Fusão (Média Ponderada)
    const totalFinalReviews = baseCount + novosCount;
    
    let mediaFinal = 0;
    if (totalFinalReviews > 0) {
      // ( (13 * 4.4) + (14) ) / (13 + 3)
      const somaTotalDasNotas = (baseCount * baseMedia) + somaNovasNotas;
      mediaFinal = somaTotalDasNotas / totalFinalReviews;
    }

    // 4. Renderizar na Tela
    renderizarEstrelasTopo(mediaFinal, totalFinalReviews);
  };

  const renderizarEstrelasTopo = (media, total) => {
    if (!ui.mediaContainer) return;

    // Arredonda para desenhar as estrelas (ex: 4.4 vira 4 estrelas cheias)
    const estrelasCheias = Math.round(media); 
    
    const estrelasHTML = "★".repeat(estrelasCheias) + "☆".repeat(5 - estrelasCheias);
    
    ui.mediaContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:5px;">
        <span style="color: #FFD700; font-size: 18px; letter-spacing: 1px;">${estrelasHTML}</span>
        <span style="font-size: 16px; font-weight: bold; color: #333;">${media.toFixed(1)}</span>
        <span style="font-size: 12px; color: #888;">(${total} avaliações)</span>
      </div>
    `;
  };

  // ... O RESTANTE DAS SUAS FUNÇÕES (toggleFormulario, processarEnvio, etc) ...

  // ATENÇÃO: Atualize o seu "processarEnvio" para chamar a nova função de cálculo
  /* No final da função processarEnvio(), onde antes você chamava atualizarMediaNoTopo(),
     agora chame: 
     calcularExibirMedia(); 
  */

  // --- INICIALIZAÇÃO ---
  calcularExibirMedia(); // Chama a função inteligente ao carregar a página
  // carregarAvaliacoesNaTela(); // (Sua função de carregar os comentários em texto)
});