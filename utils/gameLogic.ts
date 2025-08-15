import { GameAction, GameState, GameStats, Hand } from '../types/game';
import { addCardToHand, canSplitHand, createDeck, createHand, dealCard, splitHand } from './cardUtils';
import { BLACKJACK_PAYOUT, DEALER_HIT_SOFT_17, INITIAL_MONEY, MIN_BET } from './constants';

// Initialize a new game
export const initializeGame = (): GameState => {
  return {
    deck: createDeck(),
    playerHands: [createHand()],
    dealerHand: createHand(),
    currentHandIndex: 0,
    playerMoney: INITIAL_MONEY,
    currentBet: MIN_BET,
    gamePhase: 'betting',
    gameResult: null,
    canDouble: false,
    canSplit: false,
    canSurrender: false,
  };
};

// Start a new hand
export const startNewHand = (gameState: GameState, betAmount: number): GameState => {
  if (betAmount > gameState.playerMoney) {
    throw new Error('Insufficient funds');
  }

  // Create new deck if running low
  let deck = gameState.deck;
  if (deck.length < 20) {
    deck = createDeck();
  }

  // Deal initial cards
  const { card: playerCard1, remainingDeck: deck1 } = dealCard(deck);
  const { card: dealerCard1, remainingDeck: deck2 } = dealCard(deck1);
  const { card: playerCard2, remainingDeck: deck3 } = dealCard(deck2);
  const { card: dealerCard2, remainingDeck: finalDeck } = dealCard(deck3);

  const playerHand = createHand([playerCard1, playerCard2]);
  const dealerHand = createHand([dealerCard1]); // Only one card visible initially

  // Check game options
  const canDouble = true;
  const canSplit = canSplitHand(playerHand);
  const canSurrender = true;

  return {
    ...gameState,
    deck: finalDeck,
    playerHands: [playerHand],
    dealerHand: { ...dealerHand, cards: [dealerCard1, dealerCard2] }, // Keep second card for later
    currentHandIndex: 0,
    currentBet: betAmount,
    playerMoney: gameState.playerMoney - betAmount,
    gamePhase: playerHand.isBlackjack ? 'dealer' : 'playing',
    gameResult: null,
    canDouble,
    canSplit,
    canSurrender,
  };
};

// Execute player action
export const executePlayerAction = (gameState: GameState, action: GameAction): GameState => {
  if (gameState.gamePhase !== 'playing') {
    return gameState;
  }

  const currentHand = gameState.playerHands[gameState.currentHandIndex];
  let newGameState = { ...gameState };

  switch (action) {
    case 'hit':
      newGameState = playerHit(newGameState);
      break;
    case 'stand':
      newGameState = playerStand(newGameState);
      break;
    case 'double':
      newGameState = playerDouble(newGameState);
      break;
    case 'split':
      newGameState = playerSplit(newGameState);
      break;
    case 'surrender':
      newGameState = playerSurrender(newGameState);
      break;
  }

  return newGameState;
};

// Player hits
const playerHit = (gameState: GameState): GameState => {
  const { card, remainingDeck } = dealCard(gameState.deck);
  const currentHand = gameState.playerHands[gameState.currentHandIndex];
  const newHand = addCardToHand(currentHand, card);

  const newPlayerHands = [...gameState.playerHands];
  newPlayerHands[gameState.currentHandIndex] = newHand;

  let newGameState = {
    ...gameState,
    deck: remainingDeck,
    playerHands: newPlayerHands,
    canDouble: false,
    canSplit: false,
    canSurrender: false,
  };

  // Check if busted or need to move to next hand
  if (newHand.isBusted || newHand.value === 21) {
    newGameState = moveToNextHand(newGameState);
  }

  return newGameState;
};

// Player stands
const playerStand = (gameState: GameState): GameState => {
  return moveToNextHand(gameState);
};

// Player doubles down
const playerDouble = (gameState: GameState): GameState => {
  if (!gameState.canDouble || gameState.playerMoney < gameState.currentBet) {
    return gameState;
  }

  const { card, remainingDeck } = dealCard(gameState.deck);
  const currentHand = gameState.playerHands[gameState.currentHandIndex];
  const newHand = addCardToHand(currentHand, card);

  const newPlayerHands = [...gameState.playerHands];
  newPlayerHands[gameState.currentHandIndex] = newHand;

  let newGameState = {
    ...gameState,
    deck: remainingDeck,
    playerHands: newPlayerHands,
    playerMoney: gameState.playerMoney - gameState.currentBet,
    currentBet: gameState.currentBet * 2,
    canDouble: false,
    canSplit: false,
    canSurrender: false,
  };

  return moveToNextHand(newGameState);
};

// Player splits
const playerSplit = (gameState: GameState): GameState => {
  if (!gameState.canSplit || gameState.playerMoney < gameState.currentBet) {
    return gameState;
  }

  const currentHand = gameState.playerHands[gameState.currentHandIndex];
  const { hand1, hand2 } = splitHand(currentHand);

  const newPlayerHands = [...gameState.playerHands];
  newPlayerHands[gameState.currentHandIndex] = hand1;
  newPlayerHands.splice(gameState.currentHandIndex + 1, 0, hand2);

  return {
    ...gameState,
    playerHands: newPlayerHands,
    playerMoney: gameState.playerMoney - gameState.currentBet,
    canDouble: true,
    canSplit: false,
    canSurrender: false,
  };
};

// Player surrenders
const playerSurrender = (gameState: GameState): GameState => {
  return {
    ...gameState,
    gamePhase: 'finished',
    gameResult: 'lose',
    playerMoney: gameState.playerMoney + (gameState.currentBet / 2),
  };
};

// Move to next hand or dealer turn
const moveToNextHand = (gameState: GameState): GameState => {
  if (gameState.currentHandIndex < gameState.playerHands.length - 1) {
    return {
      ...gameState,
      currentHandIndex: gameState.currentHandIndex + 1,
      canDouble: gameState.playerHands[gameState.currentHandIndex + 1].cards.length === 1,
      canSplit: false,
      canSurrender: false,
    };
  } else {
    return {
      ...gameState,
      gamePhase: 'dealer',
      currentHandIndex: 0,
    };
  }
};

// Play dealer turn
export const playDealerTurn = (gameState: GameState): GameState => {
  if (gameState.gamePhase !== 'dealer') {
    return gameState;
  }

  let dealerHand = { ...gameState.dealerHand };
  dealerHand.cards = [...dealerHand.cards]; // Reveal second card
  dealerHand = createHand(dealerHand.cards);

  let deck = gameState.deck;

  // Dealer hits until 17 or busts
  while (dealerHand.value < 17 || (DEALER_HIT_SOFT_17 && dealerHand.isSoft && dealerHand.value === 17)) {
    const { card, remainingDeck } = dealCard(deck);
    dealerHand = addCardToHand(dealerHand, card);
    deck = remainingDeck;
  }

  const newGameState = {
    ...gameState,
    deck,
    dealerHand,
    gamePhase: 'finished' as const,
  };

  return calculateResults(newGameState);
};

// Calculate game results
const calculateResults = (gameState: GameState): GameState => {
  let totalWinnings = 0;
  let gameResult: 'win' | 'lose' | 'push' | 'blackjack' = 'lose';

  for (const playerHand of gameState.playerHands) {
    const handResult = getHandResult(playerHand, gameState.dealerHand);
    
    if (handResult === 'blackjack') {
      totalWinnings += gameState.currentBet * BLACKJACK_PAYOUT;
      gameResult = 'blackjack';
    } else if (handResult === 'win') {
      totalWinnings += gameState.currentBet;
      gameResult = 'win';
    } else if (handResult === 'push') {
      // Return bet
      totalWinnings += 0;
      if (gameResult !== 'win' && gameResult !== 'blackjack') {
        gameResult = 'push';
      }
    }
    // Lose: no winnings added
  }

  return {
    ...gameState,
    playerMoney: gameState.playerMoney + totalWinnings + (gameResult !== 'lose' ? gameState.currentBet : 0),
    gameResult,
  };
};

// Get result for a single hand
const getHandResult = (playerHand: Hand, dealerHand: Hand): 'win' | 'lose' | 'push' | 'blackjack' => {
  if (playerHand.isBusted) {
    return 'lose';
  }

  if (playerHand.isBlackjack && !dealerHand.isBlackjack) {
    return 'blackjack';
  }

  if (dealerHand.isBusted) {
    return 'win';
  }

  if (playerHand.isBlackjack && dealerHand.isBlackjack) {
    return 'push';
  }

  if (playerHand.value > dealerHand.value) {
    return 'win';
  } else if (playerHand.value < dealerHand.value) {
    return 'lose';
  } else {
    return 'push';
  }
};

// Initialize game stats
export const initializeStats = (): GameStats => {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    blackjacks: 0,
    totalWinnings: 0,
    biggestWin: 0,
    currentStreak: 0,
    bestStreak: 0,
  };
};
