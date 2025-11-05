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
        console.log("Mensagem:", erro.message);
        console.log("Tipo:", erro.name);
        console.log("Stack:", erro.stack);
    });
});
