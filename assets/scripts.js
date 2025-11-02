// Lista de produtos (É para vir da API depois)
const produtos = [
    { id: 1, nome: 'Echo Dot', descricao: 'Assistente virtual inteligente', preco: 'R$ 56,05' },
    { id: 2, nome: 'Smart TV', descricao: 'Televisão 4K com HDR', preco: 'R$ 2.500,00' },
    { id: 3, nome: 'Smartphone', descricao: 'Celular com câmera de alta resolução', preco: 'R$ 1.200,00' },
    { id: 4, nome: 'Lâmpada Inteligente', descricao: 'Controle por aplicativo', preco: 'R$ 80,00' },
    { id: 5, nome: 'Fone Bluetooth', descricao: 'Fone de ouvido sem fio', preco: 'R$ 150,00' },
];

// Seleciona elementos
const searchBar = document.getElementById("pesquisa");
const container = document.getElementById("container-produtos-pesquisa");

// Garante que os elementos existem
if (!searchBar || !container) {
    console.error('Erro: elementos #pesquisa ou #container-produtos-pesquisa não encontrados.');
} else {

    // Cria o card do produto
    function criarCard(produto) {
        const card = document.createElement('div');
        card.classList.add('card-produto');

        card.innerHTML = `
            <div class="imagem-card"></div>
            <div class="info-card">
                <div>
                    <div class="nome-produto-card">${produto.nome}</div>
                    <div class="avaliacao">
                        <div class="estrela"></div>
                        <div class="estrela"></div>
                        <div class="estrela"></div>
                        <div class="estrela"></div>
                        <div class="estrela"></div>
                    </div>
                </div>
                <div>
                    <div class="preco-produto-card">${produto.preco}</div>
                    <div class="botao-produto">Ver Produto</div>
                </div>
            </div>
        `;
        return card;
    }

    // Renderiza os produtos filtrados
    function renderizarProdutos(listaProdutos) {
        container.innerHTML = ''; // limpa antes de renderizar

        if (listaProdutos.length === 0) {
            const aviso = document.createElement('div');
            aviso.textContent = 'Nenhum produto encontrado.';
            aviso.style.padding = '10px';
            aviso.style.textAlign = 'center';
            aviso.style.color = '#555';
            container.appendChild(aviso);
            return;
        }

        listaProdutos.forEach(produto => {
            const card = criarCard(produto);
            container.appendChild(card);
        });
    }

    // Evento de digitação
    searchBar.addEventListener('input', (event) => {
        const texto = event.target.value.trim().toLowerCase();
    
        if (texto === "") {
            container.style.opacity = "0";
            setTimeout(() => {
                container.style.display = "none";
                container.innerHTML = "";
            }, 200);
            return;
        }
    
        // Exibe o container com transição
        container.style.display = "flex";
        setTimeout(() => (container.style.opacity = "1"), 10);
    
        // Filtra produtos
        const filtrados = produtos.filter(p =>
            p.nome.toLowerCase().includes(texto) ||
            p.descricao.toLowerCase().includes(texto)
        );
    
        renderizarProdutos(filtrados);
    });
}
