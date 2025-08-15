// Game Constants
export const INITIAL_MONEY = 10000;
export const MIN_BET = 500;
export const MAX_BET = 5000;
export const BLACKJACK_PAYOUT = 1.5;
export const DEALER_HIT_SOFT_17 = false;
export const NUMBER_OF_DECKS = 2;

// Card Suits and Ranks
export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

// Card Values
export const CARD_VALUES = {
  'A': 11,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10,
};

// UI Constants
export const CARD_WIDTH = 65;
export const CARD_HEIGHT = 90;
export const CARD_SPACING = 12;

// Colors for Classic Casino Theme
export const COLORS = {
  // Main casino colors - Klasik casino yeşili
  casinoGreen: '#0F5132',        // Orijinal casino yeşili
  darkGreen: '#0A3D26',          // Koyu gölge tonu
  lightGreen: '#146244',         // Açık vurgu tonu
  
  // Gold and brass - Gerçek casino altın tonları
  gold: '#FFD700',               // Klasik altın
  darkGold: '#DAA520',           // Koyu altın (goldenrod)
  lightGold: '#FFF8DC',          // Açık altın (cornsilk)
  bronzeGold: '#CD7F32',         // Bronz altın ton
  
  // Card colors - Gerçekçi kart renkleri
  cardWhite: '#FEFEFE',          // Saf beyaz kart zemin
  cardRed: '#CC0000',            // Kalp ve karo için koyu kırmızı
  cardBlack: '#1A1A1A',          // Maça ve sinek için siyah
  cardBack: '#1A237E',           // Koyu mavi kart arkası
  cardBackPattern: '#303F9F',    // Açık mavi desen
  
  // Chip colors - Gerçek casino chip renkleri
  chipBlue: '#1976D2',           // Mavi chip (5-10$)
  chipRed: '#D32F2F',            // Kırmızı chip (25$)
  chipGreen: '#388E3C',          // Yeşil chip (50$)
  chipBlack: '#212121',          // Siyah chip (100$)
  chipWhite: '#FAFAFA',          // Beyaz chip (1$)
  chipPurple: '#7B1FA2',         // Mor chip (500$)
  
  // Text colors
  textLight: '#FFFFFF',          // Saf beyaz
  textDark: '#1A1A1A',          // Koyu siyah
  textMuted: '#B0BEC5',         // Gri ton
  textGold: '#FFD700',          // Altın text
  
  // Status colors - Casino tarzı durum renkleri
  danger: '#E53935',            // Kayıp - kırmızı
  success: '#43A047',           // Kazanç - yeşil
  warning: '#FF8F00',           // Uyarı - turuncu
  
  // UI overlays and backgrounds
  overlay: 'rgba(0, 0, 0, 0.85)',
  overlayLight: 'rgba(0, 0, 0, 0.65)',
  panelBackground: 'rgba(0, 0, 0, 0.4)',
  panelBackgroundLight: 'rgba(0, 0, 0, 0.25)',
  buttonDisabled: 'rgba(117, 117, 117, 0.6)',
  borderLight: 'rgba(255, 255, 255, 0.15)',
  shadowColor: '#000000',
  
  // Active states - Altın vurgu efektleri
  activeGlow: 'rgba(255, 215, 0, 0.15)',
  activeGlowBorder: 'rgba(255, 215, 0, 0.4)',
  
  // Felt texture simulation
  feltDark: 'rgba(0, 0, 0, 0.3)',
  feltLight: 'rgba(255, 255, 255, 0.1)',
};
