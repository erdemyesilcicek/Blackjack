import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../utils/constants';

interface GameResultProps {
  result: 'win' | 'lose' | 'push' | 'blackjack' | null;
  winnings: number;
  onNewGame: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ result, winnings, onNewGame }) => {
  if (!result) return null;

  const getResultText = () => {
    switch (result) {
      case 'blackjack':
        return 'BLACKJACK!';
      case 'win':
        return 'YOU WIN!';
      case 'lose':
        return 'YOU LOSE!';
      case 'push':
        return 'PUSH!';
      default:
        return '';
    }
  };

  const getResultColor = () => {
    switch (result) {
      case 'blackjack':
      case 'win':
        return COLORS.success;
      case 'lose':
        return COLORS.danger;
      case 'push':
        return COLORS.warning;
      default:
        return COLORS.textLight;
    }
  };

  const getWinningsText = () => {
    if (winnings > 0) {
      return `+$${winnings}`;
    } else if (winnings < 0) {
      return `-$${Math.abs(winnings)}`;
    } else {
      return '$0';
    }
  };

  const getWinningsColor = () => {
    if (winnings > 0) return COLORS.success;
    if (winnings < 0) return COLORS.danger;
    return COLORS.textLight;
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={[styles.resultText, { color: getResultColor() }]}>
          {getResultText()}
        </Text>
        
        <View style={styles.winningsContainer}>
          <Text style={styles.winningsLabel}>Winnings:</Text>
          <Text style={[styles.winningsAmount, { color: getWinningsColor() }]}>
            {getWinningsText()}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.newGameButton} onPress={onNewGame}>
          <Text style={styles.newGameButtonText}>NEW GAME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: COLORS.darkGreen,
    padding: 35,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.gold,
    minWidth: 280,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  winningsContainer: {
    marginBottom: 20,
  },
  winningsLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 5,
  },
  winningsAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newGameButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.textLight,
    elevation: 3,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  newGameButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameResult;
