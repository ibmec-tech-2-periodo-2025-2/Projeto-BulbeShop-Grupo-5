import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const Carousel = ({ 
  products, 
  isLarge = false, 
  title,
  onProductClick 
}) => {
  const carouselRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => carousel.removeEventListener('scroll', checkScrollPosition);
    }
  }, [products]);

  const scrollTo = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = isLarge ? 300 : 200;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="carousel-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {title && (
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
      )}
      
      <div className="carousel-container">
        {!isAtStart && (
          <button 
            className="carousel-button carousel-button-left"
            onClick={() => scrollTo('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}
        
        <div 
          ref={carouselRef}
          className={isLarge ? 'carousel' : 'carousel-small'}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isLarge={isLarge}
              index={index}
              onClick={() => onProductClick && onProductClick(product)}
            />
          ))}
        </div>
        
        {!isAtEnd && (
          <button 
            className="carousel-button carousel-button-right"
            onClick={() => scrollTo('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Carousel;
