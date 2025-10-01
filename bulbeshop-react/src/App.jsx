import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - substitua por dados reais da API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      
      // Simula carregamento de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts = [
        {
          id: 1,
          name: 'Smartphone Galaxy',
          price: '1.299,00',
          description: 'Smartphone com tela de 6.1" e câmera de 64MP',
          image: '/assets/img/img1.png',
          category: 'eletronicos'
        },
        {
          id: 2,
          name: 'Notebook Gamer',
          price: '2.499,00',
          description: 'Notebook para jogos com RTX 3060',
          image: '/assets/img/img2.png',
          category: 'eletronicos'
        },
        {
          id: 3,
          name: 'Fone Bluetooth',
          price: '199,00',
          description: 'Fone sem fio com cancelamento de ruído',
          image: '/assets/img/img3.png',
          category: 'eletronicos'
        },
        {
          id: 4,
          name: 'Smartwatch',
          price: '599,00',
          description: 'Relógio inteligente com monitor de saúde',
          image: '/assets/img/img4.png',
          category: 'eletronicos'
        },
        {
          id: 5,
          name: 'Tablet Pro',
          price: '899,00',
          description: 'Tablet de 10.9" para produtividade',
          image: '/assets/img/img1.png',
          category: 'eletronicos'
        },
        {
          id: 6,
          name: 'Câmera DSLR',
          price: '1.799,00',
          description: 'Câmera profissional 24MP',
          image: '/assets/img/img2.png',
          category: 'eletronicos'
        }
      ];
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    };
    
    loadProducts();
  }, []);

  // Filtrar produtos baseado na busca
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleProductClick = (product) => {
    console.log('Produto clicado:', product);
    // Aqui você pode implementar navegação para página de detalhes
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <Header onSearch={handleSearch} />
        <div className="space-superior"></div>
        <div className="loading">
          Carregando produtos...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div 
      className="app"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Header onSearch={handleSearch} />
      
      <div className="space-superior"></div>
      
      <main className="main-content">
        <motion.div 
          className="carousel-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            products={filteredProducts.slice(0, 4)}
            isLarge={true}
            onProductClick={handleProductClick}
          />
        </motion.div>

        <div className="separator"></div>

        <motion.div
          className="carousel-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProducts.length > 0 ? (
            <Carousel
              products={filteredProducts}
              isLarge={false}
              title="Produtos Eletrônicos"
              onProductClick={handleProductClick}
            />
          ) : (
            <div className="empty-state">
              <h3>Nenhum produto encontrado</h3>
              <p>Tente ajustar os termos da sua busca</p>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default App;