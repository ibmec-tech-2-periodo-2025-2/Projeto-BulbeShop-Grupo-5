// Constantes da aplicação
export const APP_CONFIG = {
  CAROUSEL: {
    LARGE_SLIDE_WIDTH: '85%',
    SMALL_SLIDE_WIDTH: '40%',
    SCROLL_AMOUNT: 300,
    SCROLL_AMOUNT_MOBILE: 200,
  },
  ANIMATION: {
    DURATION: 0.6,
    DELAY: 0.08,
    EASING: [0.4, 0, 0.2, 1],
  },
  BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
  },
  SEARCH: {
    DEBOUNCE_DELAY: 300,
    MIN_LENGTH: 2,
  }
};

export const PRODUCT_CATEGORIES = {
  ELETRONICOS: 'eletronicos',
  CASA: 'casa',
  MODA: 'moda',
  ESPORTE: 'esporte',
};

export const ROUTES = {
  HOME: '/',
  PRODUCT: '/produto',
  CART: '/carrinho',
  PROFILE: '/perfil',
};
