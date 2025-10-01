import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ 
  product, 
  isLarge = false, 
  index = 0,
  onClick 
}) => {
  const {
    id,
    name,
    price,
    description,
    image,
    category
  } = product;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.03,
      rotateX: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      filter: "brightness(1.1) contrast(1.05)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={isLarge ? 'slide' : 'slide-small'}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <motion.div className="image-container" variants={imageVariants}>
        <img src={image} alt={name} />
      </motion.div>
      
      <motion.div 
        className={isLarge ? 'product-specs' : 'product-specs-small'}
        variants={textVariants}
      >
        <div className="product-name">
          <h2>{name}</h2>
        </div>
        <div className="price">
          <h2>R$ {price}</h2>
        </div>
      </motion.div>
      
      <motion.div 
        className={isLarge ? 'product-description' : 'product-description-small'}
        variants={textVariants}
      >
        {description}
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
