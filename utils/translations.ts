// Çoklu dil desteği için çeviriler
export interface Translations {
  // Ana sayfa
  blackjack: string;
  classicErdemApplication: string;
  yourHand: string;
  dealer: string;
  hand: string;
  phase: string;
  playingHand: string;
  of: string;

  // Oyun kontrolleri
  hit: string;
  stand: string;
  double: string;
  split: string;
  surrender: string;

  // Bahis paneli
  yourMoney: string;
  currentBet: string;
  selectBetAmount: string;
  dealCards: string;
  insufficientFunds: string;
  youOnlyHave: string;

  // Oyun sonuçları
  blackjackWin: string;
  youWin: string;
  youLose: string;
  push: string;
  winnings: string;
  newGame: string;
  bust: string;
  twentyOne: string;

  // El durumları
  soft: string;

  // Ayarlar
  settings: string;
  back: string;
  preferences: string;
  language: string;
  choosePreferredLanguage: string;
  theme: string;
  customizeGamingExperience: string;
  gameRules: string;
  gameplayButtons: string;
  actions: string;
  addMoney: string;
  resetGameData: string;
  aboutJackPoint: string;
  classicBlackjackExperience: string;

  // Oyun kuralları
  dealerHitsSoft17: string;
  blackjackPays: string;
  doubleAfterSplitAllowed: string;
  surrenderAvailable: string;

  // Buton açıklamaları
  hitDescription: string;
  standDescription: string;
  doubleDescription: string;
  splitDescription: string;
  surrenderDescription: string;

  // Dil ayarları
  languageSettings: string;
  selectPreferredLanguage: string;
  english: string;
  turkish: string;
  cancel: string;

  // Tema ayarları
  themeSettings: string;
  selectPreferredTheme: string;
  classicCasinoTheme: string;
  modernMinimalTheme: string;
  darkTheme: string;
  selectThisTheme: string;

  // Tema açıklamaları
  classicCasinoThemeDesc: string;
  modernMinimalThemeDesc: string;
  darkThemeDesc: string;

  // Para ekleme
  addMoneyTitle: string;
  addMoneyConfirm: string;
  moneyAdded: string;
  newBalance: string;
  error: string;
  failedToAddMoney: string;

  // Oyun sıfırlama
  resetGame: string;
  resetGameConfirm: string;
  reset: string;
  gameReset: string;
  gameResetMessage: string;
  failedToReset: string;

  // Hakkında
  aboutJackPointTitle: string;
  aboutJackPointText: string;
  ok: string;

  // Oyun bitimi
  gameOver: string;
  outOfMoney: string;

  // Hata mesajları
  failedToDealCards: string;
}

export const englishTranslations: Translations = {
  // Ana sayfa
  blackjack: '🃏 Blackjack',
  classicErdemApplication: 'Classic Erdem Application',
  yourHand: 'Your Hand',
  dealer: 'Dealer',
  hand: 'Hand',
  phase: 'Phase',
  playingHand: 'Playing Hand',
  of: 'of',

  // Oyun kontrolleri
  hit: 'HIT',
  stand: 'STAND',
  double: 'DOUBLE',
  split: 'SPLIT',
  surrender: 'SURRENDER',

  // Bahis paneli
  yourMoney: 'Your Money:',
  currentBet: 'Current Bet:',
  selectBetAmount: 'Select Bet Amount:',
  dealCards: 'DEAL CARDS',
  insufficientFunds: 'Insufficient Funds',
  youOnlyHave: 'You only have',

  // Oyun sonuçları
  blackjackWin: 'BLACKJACK!',
  youWin: 'YOU WIN!',
  youLose: 'YOU LOSE!',
  push: 'PUSH!',
  winnings: 'Winnings:',
  newGame: 'NEW GAME',
  bust: 'BUST!',
  twentyOne: '21!',

  // El durumları
  soft: 'soft',

  // Ayarlar
  settings: 'Settings',
  back: '← Back',
  preferences: 'Preferences',
  language: '🌐 Language',
  choosePreferredLanguage: 'Choose your preferred language',
  theme: '🎨 Theme',
  customizeGamingExperience: 'Customize your gaming experience',
  gameRules: 'Game Rules',
  gameplayButtons: 'Gameplay Buttons',
  actions: 'Actions',
  addMoney: '💰 Add $50000',
  resetGameData: 'Reset Game Data',
  aboutJackPoint: 'About JackPoint',
  classicBlackjackExperience: 'Classic Blackjack Experience',

  // Oyun kuralları
  dealerHitsSoft17: '• Dealer hits on soft 17',
  blackjackPays: '• Blackjack pays 3:2',
  doubleAfterSplitAllowed: '• Double after split allowed',
  surrenderAvailable: '• Surrender available',

  // Buton açıklamaları
  hitDescription: '• Hit: Draw an additional card',
  standDescription: '• Stand: Keep your current hand total',
  doubleDescription: '• Double: Double your bet and receive exactly one more card',
  splitDescription: '• Split: Split identical cards into two separate hands',
  surrenderDescription: '• Surrender: Give up half your bet and end the hand',

  // Dil ayarları
  languageSettings: 'Language Settings',
  selectPreferredLanguage: 'Select your preferred language:',
  english: 'English',
  turkish: 'Türkçe',
  cancel: 'Cancel',

  // Tema ayarları
  themeSettings: 'Theme Settings',
  selectPreferredTheme: 'Select your preferred theme:',
  classicCasinoTheme: 'Casino Theme',
  modernMinimalTheme: 'Modern/Minimal Theme',
  darkTheme: 'Dark Theme',
  selectThisTheme: 'Select This Theme',

  // Tema açıklamaları
  classicCasinoThemeDesc: 'Koyu yeşil masa arka planı\nGerçekçi kart tasarımları (kırmızı/siyah)\nAltın renkli çerçeveler ve butonlar\nCasino atmosferi (chips, felt texture)',
  modernMinimalThemeDesc: 'Temiz, düz renkler\nBasit geometrik kart tasarımı\nBeyaz/gri arka plan\nFlat design butonlar\nTypography odaklı',
  darkThemeDesc: 'Siyah/koyu gri arka plan\nNeon renkli vurgular (mavi, yeşil)\nModern kart tasarımı\nRGB efektleri\nFuturistik görünüm',

  // Para ekleme
  addMoneyTitle: 'Add Money',
  addMoneyConfirm: 'Are you sure you want to add $5000 to your balance?',
  moneyAdded: 'Money Added',
  newBalance: 'New balance:',
  error: 'Error',
  failedToAddMoney: 'Failed to add money to your balance.',

  // Oyun sıfırlama
  resetGame: 'Reset Game',
  resetGameConfirm: 'Are you sure you want to reset all game data? This will reset your money to the starting amount.',
  reset: 'Reset',
  gameReset: 'Game Reset',
  gameResetMessage: 'Game data has been reset. Your money has been restored to $1000.',
  failedToReset: 'Failed to reset game data.',

  // Hakkında
  aboutJackPointTitle: 'About JackPoint',
  aboutJackPointText: 'JackPoint v1.0\n\nA classic Blackjack game built with React Native and Expo.\n\n© 2025 JackPoint Games',
  ok: 'OK',

  // Oyun bitimi
  gameOver: 'Game Over',
  outOfMoney: 'You are out of money! Starting new game with fresh funds.',

  // Hata mesajları
  failedToDealCards: 'Failed to deal cards',
};

export const turkishTranslations: Translations = {
  // Ana sayfa
  blackjack: '🃏 Blackjack',
  classicErdemApplication: 'Klasik Erdem Uygulaması',
  yourHand: 'Eliniz',
  dealer: 'Krupiye',
  hand: 'El',
  phase: 'Aşama',
  playingHand: 'Oynanan El',
  of: '/',

  // Oyun kontrolleri
  hit: 'KART ÇEK',
  stand: 'PAS',
  double: 'İKİYE KATLA',
  split: 'AYIR',
  surrender: 'PES ET',

  // Bahis paneli
  yourMoney: 'Paranız:',
  currentBet: 'Mevcut Bahis:',
  selectBetAmount: 'Bahis Miktarını Seçin:',
  dealCards: 'KART DAĞıT',
  insufficientFunds: 'Yetersiz Bakiye',
  youOnlyHave: 'Sadece',

  // Oyun sonuçları
  blackjackWin: 'BLACKJACK!',
  youWin: 'KAZANDINIZ!',
  youLose: 'KAYBETTİNİZ!',
  push: 'BERABERLİK!',
  winnings: 'Kazanç:',
  newGame: 'YENİ OYUN',
  bust: 'YAKTIN!',
  twentyOne: '21!',

  // El durumları
  soft: 'yumuşak',

  // Ayarlar
  settings: 'Ayarlar',
  back: '← Geri',
  preferences: 'Tercihler',
  language: '🌐 Dil',
  choosePreferredLanguage: 'Tercih ettiğiniz dili seçin',
  theme: '🎨 Tema',
  customizeGamingExperience: 'Oyun deneyiminizi özelleştirin',
  gameRules: 'Oyun Kuralları',
  gameplayButtons: 'Oyun Butonları',
  actions: 'İşlemler',
  addMoney: '💰 $5000 Ekle',
  resetGameData: 'Oyun Verilerini Sıfırla',
  aboutJackPoint: 'JackPoint Hakkında',
  classicBlackjackExperience: 'Klasik Blackjack Deneyimi',

  // Oyun kuralları
  dealerHitsSoft17: '• Krupiye yumuşak 17\'de kart çeker',
  blackjackPays: '• Blackjack 3:2 öder',
  doubleAfterSplitAllowed: '• Ayırdıktan sonra ikiye katlama izinli',
  surrenderAvailable: '• Pes etme mevcut',

  // Buton açıklamaları
  hitDescription: '• Kart Çek: Ek bir kart çek',
  standDescription: '• Pas: Mevcut elinizi koruyun',
  doubleDescription: '• İkiye Katla: Bahsinizi ikiye katlayın ve tam olarak bir kart daha alın',
  splitDescription: '• Ayır: Aynı kartları iki ayrı ele ayırın',
  surrenderDescription: '• Pes Et: Bahsinizin yarısını verin ve eli bitirin',

  // Dil ayarları
  languageSettings: 'Dil Ayarları',
  selectPreferredLanguage: 'Tercih ettiğiniz dili seçin:',
  english: 'İngilizce',
  turkish: 'Türkçe',
  cancel: 'İptal',

  // Tema ayarları
  themeSettings: 'Tema Ayarları',
  selectPreferredTheme: 'Tercih ettiğiniz temayı seçin:',
  classicCasinoTheme: 'Klasik Casino Teması',
  modernMinimalTheme: 'Modern/Minimal Tema',
  darkTheme: 'Koyu Tema',
  selectThisTheme: 'Bu Temayı Seç',

  // Tema açıklamaları
  classicCasinoThemeDesc: 'Koyu yeşil masa arka planı\nGerçekçi kart tasarımları (kırmızı/siyah)\nAltın renkli çerçeveler ve butonlar\nCasino atmosferi (chips, felt texture)',
  modernMinimalThemeDesc: 'Temiz, düz renkler\nBasit geometrik kart tasarımı\nBeyaz/gri arka plan\nFlat design butonlar\nTypography odaklı',
  darkThemeDesc: 'Siyah/koyu gri arka plan\nNeon renkli vurgular (mavi, yeşil)\nModern kart tasarımı\nRGB efektleri\nFuturistik görünüm',

  // Para ekleme
  addMoneyTitle: 'Para Ekle',
  addMoneyConfirm: 'Bakiyenize $50000 eklemek istediğinizden emin misiniz?',
  moneyAdded: 'Para eklendi',
  newBalance: 'Yeni bakiye:',
  error: 'Hata',
  failedToAddMoney: 'Bakiyenize para eklenemedi.',

  // Oyun sıfırlama
  resetGame: 'Oyunu Sıfırla',
  resetGameConfirm: 'Tüm oyun verilerini sıfırlamak istediğinizden emin misiniz? Bu paranızı başlangıç miktarına sıfırlayacak.',
  reset: 'Sıfırla',
  gameReset: 'Oyun Sıfırlandı',
  gameResetMessage: 'Oyun verileri sıfırlandı. Paranız $1000\'e geri yüklendi.',
  failedToReset: 'Oyun verileri sıfırlanamadı.',

  // Hakkında
  aboutJackPointTitle: 'JackPoint Hakkında',
  aboutJackPointText: 'JackPoint v1.0\n\nReact Native ve Expo ile yapılmış klasik bir Blackjack oyunu.\n\n© 2025 JackPoint Games',
  ok: 'Tamam',

  // Oyun bitimi
  gameOver: 'Oyun Bitti',
  outOfMoney: 'Paranız bitti! Yeni para ile yeni oyun başlatılıyor.',

  // Hata mesajları
  failedToDealCards: 'Kart dağıtılamadı',
};

export const translations = {
  en: englishTranslations,
  tr: turkishTranslations,
};

export type LanguageCode = keyof typeof translations;
