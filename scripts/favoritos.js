document.addEventListener("DOMContentLoaded", () => {

const botoesRemover = document.querySelectorAll(".x");


botoesRemover.forEach(botao => {
    botao.addEventListener("click", () => {
      const produto = botao.closest(".produto");
      if (produto) {
        produto.remove();
      }
    });
  });

const botaoMais = document.querySelector(".botao-mais");

botaoMais.addEventListener("click", () => {
    window.location.href = "/index.html";
  });
});

