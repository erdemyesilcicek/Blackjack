export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  value: number;
  isAce: boolean;
}

export interface Hand {
  cards: Card[];
  value: number;
  isSoft: boolean; // Has an ace counted as 11
  isBusted: boolean;
  isBlackjack: boolean;
}

export interface GameState {
  deck: Card[];
  playerHands: Hand[];
  dealerHand: Hand;
  currentHandIndex: number;
  playerMoney: number;
  currentBet: number;
  gamePhase: 'betting' | 'dealing' | 'playing' | 'dealer' | 'finished';
  gameResult: 'win' | 'lose' | 'push' | 'blackjack' | null;
  canDouble: boolean;
  canSplit: boolean;
  canSurrender: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  blackjacks: number;
  totalWinnings: number;
  biggestWin: number;
  currentStreak: number;
  bestStreak: number;
}

export type GameAction = 'hit' | 'stand' | 'double' | 'split' | 'surrender';
