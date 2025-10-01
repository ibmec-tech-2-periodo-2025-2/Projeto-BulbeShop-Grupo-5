import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerItems = [
    { id: 1, name: 'Home', icon: 'home' },
    { id: 2, name: 'Search', icon: 'search' },
    { id: 3, name: 'Cart', icon: 'cart' },
    { id: 4, name: 'Profile', icon: 'profile' }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {footerItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="footer-item"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: index * 0.1 }}
        >
          <div className="footer-icon"></div>
          <div className="footer-text">{item.name}</div>
        </motion.div>
      ))}
      
      <motion.div
        className="footer-logo-container"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={{ delay: 0.4 }}
      >
        <div className="footer-logo"></div>
      </motion.div>
      
      {footerItems.map((item, index) => (
        <motion.div
          key={`right-${item.id}`}
          className="footer-item"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: (index + 4) * 0.1 }}
        >
          <div className="footer-icon"></div>
          <div className="footer-text">{item.name}</div>
        </motion.div>
      ))}
    </motion.footer>
  );
};

export default Footer;
