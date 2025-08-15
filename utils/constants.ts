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

// Colors for Purple Casino Theme
export const COLORS = {
  // Main casino colors - Mor casino teması
  casinoGreen: '#4A148C',        // Ana mor renk (deep purple)
  darkGreen: '#2E0854',          // Koyu mor gölge tonu
  lightGreen: '#6A1B9A',         // Açık mor vurgu tonu
  
  // Gold and brass - Mor ile uyumlu altın tonları
  gold: '#E1BEE7',               // Açık mor altın
  darkGold: '#BA68C8',           // Orta mor (medium purple)
  lightGold: '#F3E5F5',          // Çok açık mor
  bronzeGold: '#9C27B0',         // Bronz mor ton
  
  // Card colors - Gerçekçi kart renkleri
  cardWhite: '#FEFEFE',          // Saf beyaz kart zemin
  cardRed: '#CC0000',            // Kalp ve karo için koyu kırmızı
  cardBlack: '#1A1A1A',          // Maça ve sinek için siyah
  cardBack: '#1A237E',           // Koyu mavi kart arkası
  cardBackPattern: '#303F9F',    // Açık mavi desen
  
  // Chip colors - Mor tema casino chip renkleri
  chipBlue: '#7E57C2',           // Mor mavi chip (5-10$)
  chipRed: '#AD1457',            // Koyu pembe chip (25$)
  chipGreen: '#8E24AA',          // Mor yeşil chip (50$)
  chipBlack: '#4A148C',          // Koyu mor chip (100$)
  chipWhite: '#F3E5F5',          // Açık mor beyaz chip (1$)
  chipPurple: '#9C27B0',         // Ana mor chip (500$)
  
  // Text colors - Mor tema text renkleri
  textLight: '#FFFFFF',          // Saf beyaz
  textDark: '#1A1A1A',          // Koyu siyah
  textMuted: '#B39DDB',         // Mor gri ton
  textGold: '#E1BEE7',          // Mor altın text
  
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
  
  // Active states - Mor vurgu efektleri
  activeGlow: 'rgba(156, 39, 176, 0.15)',      // Mor glow efekti
  activeGlowBorder: 'rgba(156, 39, 176, 0.4)', // Mor glow border
  
  // Felt texture simulation
  feltDark: 'rgba(0, 0, 0, 0.3)',
  feltLight: 'rgba(255, 255, 255, 0.1)',
};
