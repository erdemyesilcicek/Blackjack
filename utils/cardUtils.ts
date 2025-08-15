import { Card, Hand } from '../types/game';
import { CARD_VALUES, NUMBER_OF_DECKS, RANKS, SUITS } from './constants';

// Create a fresh deck of cards
export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  
  for (let deckCount = 0; deckCount < NUMBER_OF_DECKS; deckCount++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push({
          suit,
          rank,
          value: CARD_VALUES[rank],
          isAce: rank === 'A'
        });
      }
    }
  }
  
  return shuffleDeck(deck);
};

// Shuffle deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Calculate hand value and determine if it's soft
export const calculateHandValue = (cards: Card[]): { value: number; isSoft: boolean } => {
  let value = 0;
  let aces = 0;
  
  // Count non-ace cards first
  for (const card of cards) {
    if (card.isAce) {
      aces++;
    } else {
      value += card.value;
    }
  }
  
  // Add aces
  for (let i = 0; i < aces; i++) {
    if (value + 11 + (aces - i - 1) <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }
  
  // Check if hand is soft (has an ace counted as 11)
  const isSoft = aces > 0 && value <= 21 && value + 10 > 21;
  
  return { value, isSoft };
};

// Create a hand from cards
export const createHand = (cards: Card[] = []): Hand => {
  const { value, isSoft } = calculateHandValue(cards);
  const isBusted = value > 21;
  const isBlackjack = cards.length === 2 && value === 21;
  
  return {
    cards,
    value,
    isSoft,
    isBusted,
    isBlackjack
  };
};

// Deal a card from deck
export const dealCard = (deck: Card[]): { card: Card; remainingDeck: Card[] } => {
  if (deck.length === 0) {
    throw new Error('Cannot deal from empty deck');
  }
  
  const card = deck[0];
  const remainingDeck = deck.slice(1);
  
  return { card, remainingDeck };
};

// Add card to hand
export const addCardToHand = (hand: Hand, card: Card): Hand => {
  const newCards = [...hand.cards, card];
  return createHand(newCards);
};

// Check if hand can be split
export const canSplitHand = (hand: Hand): boolean => {
  return hand.cards.length === 2 && 
         CARD_VALUES[hand.cards[0].rank] === CARD_VALUES[hand.cards[1].rank];
};

// Split a hand into two hands
export const splitHand = (hand: Hand): { hand1: Hand; hand2: Hand } => {
  if (!canSplitHand(hand)) {
    throw new Error('Cannot split this hand');
  }
  
  const hand1 = createHand([hand.cards[0]]);
  const hand2 = createHand([hand.cards[1]]);
  
  return { hand1, hand2 };
};

// Get card symbol for display
export const getCardSymbol = (suit: Card['suit']): string => {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
    default: return '';
  }
};

// Get card color
export const getCardColor = (suit: Card['suit']): 'red' | 'black' => {
  return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
};
