import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Hand } from '../types/game';
import { CARD_SPACING, COLORS } from '../utils/constants';
import Card from './Card';

interface PlayerHandProps {
  hand: Hand;
  isActive?: boolean;
  title?: string;
  showCards?: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ 
  hand, 
  isActive = false, 
  title = "Your Hand",
  showCards = true 
}) => {
  const getHandStatusText = () => {
    if (hand.isBusted) return "BUST!";
    if (hand.isBlackjack) return "BLACKJACK!";
    if (hand.value === 21) return "21!";
    return "";
  };

  const getHandStatusColor = () => {
    if (hand.isBusted) return COLORS.danger;
    if (hand.isBlackjack || hand.value === 21) return COLORS.success;
    return COLORS.textLight;
  };

  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{hand.value}</Text>
          {hand.isSoft && <Text style={styles.softIndicator}>soft</Text>}
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {showCards && hand.cards.map((card, index) => (
          <Card 
            key={`${card.suit}-${card.rank}-${index}`}
            card={card}
            animationDelay={index * 150} // Her kart 150ms gecikmeli gelir
            style={[
              styles.card,
              { marginLeft: index > 0 ? -CARD_SPACING : 0 }
            ]}
          />
        ))}
      </View>

      {getHandStatusText() && (
        <Text style={[styles.statusText, { color: getHandStatusColor() }]}>
          {getHandStatusText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.feltDark,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  activeContainer: {
    borderWidth: 2,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.activeGlow,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginRight: 5,
  },
  softIndicator: {
    fontSize: 11,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 95,
  },
  card: {
    // Card spacing handled in marginLeft
  },
  statusText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PlayerHand;
