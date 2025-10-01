# BulbeShop React

Uma aplicação de e-commerce moderna construída com React, mantendo a identidade visual original do projeto BulbeShop.

## 🚀 Características

- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela (mobile, tablet, desktop)
- **Carrossel Interativo**: Navegação suave entre produtos com botões de controle inteligentes
- **Busca em Tempo Real**: Filtro instantâneo de produtos com debounce
- **Animações Fluidas**: Transições suaves e micro-interações usando Framer Motion
- **Identidade Visual Preservada**: Mantém todas as características visuais do projeto original
- **UX Aprimorada**: Loading states, empty states e feedback visual
- **Performance Otimizada**: Carregamento rápido e animações suaves

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca principal para interface de usuário
- **Vite**: Build tool moderno e rápido
- **Framer Motion**: Biblioteca de animações
- **CSS3**: Estilos customizados com variáveis CSS
- **Google Fonts**: Fonte Poppins para tipografia

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd bulbeshop-react
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 🎨 Componentes

### Header
- Barra de pesquisa com funcionalidade de busca em tempo real
- Ícone de menu interativo
- Design fixo no topo da página

### Carousel
- Carrossel principal com produtos em destaque
- Carrossel secundário com produtos eletrônicos
- Navegação por botões laterais
- Scroll suave e responsivo

### ProductCard
- Card de produto com animações hover
- Informações de nome, preço e descrição
- Imagens otimizadas
- Suporte para diferentes tamanhos (grande/pequeno)

### Footer
- Navegação fixa na parte inferior
- Logo centralizado com animações
- Ícones de navegação interativos

## 🎯 Funcionalidades

- **Busca Inteligente**: Filtra produtos por nome e descrição
- **Navegação por Carrossel**: Botões de navegação que aparecem/desaparecem conforme necessário
- **Animações de Entrada**: Elementos aparecem com animações suaves
- **Hover Effects**: Interações visuais em cards e botões
- **Responsividade**: Adaptação automática para mobile e desktop

## 🎨 Identidade Visual

O projeto mantém fielmente a identidade visual original:
- **Cores**: Paleta de cores preservada com variáveis CSS
- **Tipografia**: Fonte Poppins em todos os pesos
- **Layout**: Estrutura e espaçamentos originais
- **Elementos Visuais**: Ícones, logo e elementos gráficos mantidos

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablets e desktops
- **Touch Friendly**: Navegação otimizada para touch
- **Performance**: Carregamento rápido em todos os dispositivos

## 🔧 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria build de produção
- `npm run preview`: Visualiza o build de produção
- `npm run lint`: Executa o linter

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx          # Cabeçalho com busca
│   ├── Header.css          # Estilos do cabeçalho
│   ├── Carousel.jsx        # Componente de carrossel
│   ├── ProductCard.jsx     # Card de produto
│   └── Footer.jsx          # Rodapé
├── styles/
│   └── App.css             # Estilos globais
├── App.jsx                 # Componente principal
└── main.jsx                # Ponto de entrada
```

## 🚀 Melhorias Implementadas

### 🎨 **Identidade Visual Aprimorada**
- Layout centralizado e bem estruturado
- Cores e tipografia preservadas com melhor contraste
- Sombras e bordas refinadas para profundidade visual
- Gradientes sutis para modernidade

### 📱 **Responsividade Completa**
- Design mobile-first otimizado
- Breakpoints para tablet (768px) e desktop (1024px)
- Carrosséis adaptativos com tamanhos de slide dinâmicos
- Header e footer responsivos

### ⚡ **Interatividade e Animações**
- Animações de entrada escalonadas para produtos
- Hover effects com transformações 3D sutis
- Transições suaves em todos os elementos
- Micro-interações em botões e cards

### 🔍 **Experiência de Busca**
- Busca em tempo real com debounce
- Estados de loading e empty state
- Feedback visual durante a busca
- Filtros inteligentes por nome e descrição

### 🎯 **Performance e UX**
- Loading states para melhor percepção de velocidade
- Animações otimizadas com Framer Motion
- Scroll suave nos carrosséis
- Botões de navegação inteligentes (aparecem/desaparecem)

### 🛠️ **Arquitetura**
- Componentes modulares e reutilizáveis
- Código limpo e bem documentado
- Constantes centralizadas
- Estrutura escalável

## 📄 Licença

Este projeto é parte do trabalho acadêmico do Grupo 5 - IBMEC.