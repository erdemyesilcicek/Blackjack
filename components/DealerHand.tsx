import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Hand } from '../types/game';
import { CARD_SPACING, COLORS } from '../utils/constants';
import Card from './Card';

interface DealerHandProps {
  hand: Hand;
  hideSecondCard?: boolean;
  gamePhase: string;
}

const DealerHand: React.FC<DealerHandProps> = ({ 
  hand, 
  hideSecondCard = false,
  gamePhase 
}) => {
  const shouldHideCard = hideSecondCard && gamePhase === 'playing';
  const displayValue = shouldHideCard ? (hand.cards[0]?.value || 0) : hand.value;

  const getHandStatusText = () => {
    if (shouldHideCard) return "";
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

  const statusText = getHandStatusText();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dealer</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {shouldHideCard ? '?' : displayValue}
          </Text>
          {hand.isSoft && !shouldHideCard && (
            <Text style={styles.softIndicator}>soft</Text>
          )}
        </View>
      </View>
      
      <View style={styles.cardsContainer}>
        {hand.cards.map((card, index) => (
          <Card 
            key={`${card.suit}-${card.rank}-${index}`}
            card={card}
            isHidden={shouldHideCard && index === 1}
            style={{ 
              marginLeft: index > 0 ? CARD_SPACING : 0,
              zIndex: hand.cards.length - index
            }}
            animationDelay={index * 150}
          />
        ))}
      </View>
      
      {statusText && (
        <Text style={[styles.statusText, { color: getHandStatusColor() }]}>
          {statusText}
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
  statusText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default DealerHand;
