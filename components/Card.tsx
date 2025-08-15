import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Card as CardType } from '../types/game';
import { getCardColor, getCardSymbol } from '../utils/cardUtils';
import { CARD_HEIGHT, CARD_WIDTH, COLORS } from '../utils/constants';

interface CardProps {
  card: CardType | null;
  isHidden?: boolean;
  style?: any;
  animationDelay?: number;
}

const Card: React.FC<CardProps> = ({ card, isHidden = false, style, animationDelay = 0 }) => {
  const slideAnim = useRef(new Animated.Value(50)).current; // Start position (off screen)
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Start small
  const opacityAnim = useRef(new Animated.Value(0)).current; // Start transparent

  useEffect(() => {
    // Kart yoksa animasyon çalıştırma
    if (!card) return;

    // Reset animations when card changes
    slideAnim.setValue(50);
    scaleAnim.setValue(0.5);
    opacityAnim.setValue(0);

    // Start the animation sequence
    const animationSequence = Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: animationDelay,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        delay: animationDelay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: animationDelay,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start();
  }, [card, slideAnim, scaleAnim, opacityAnim, animationDelay]);

  const animatedStyle = {
    transform: [
      { translateY: slideAnim },
      { scale: scaleAnim },
    ],
    opacity: opacityAnim,
  };
  if (!card || isHidden) {
    return (
      <Animated.View style={[
        styles.card, 
        styles.cardBack, 
        style, 
        card ? animatedStyle : { opacity: 1 } // Kart varsa animasyon, yoksa direkt görünür
      ]}>
        <View style={styles.cardBackPattern}>
          <Text style={styles.cardBackText}>🂠</Text>
        </View>
      </Animated.View>
    );
  }

  const symbol = getCardSymbol(card.suit);
  const color = getCardColor(card.suit);
  const textColor = color === 'red' ? COLORS.cardRed : COLORS.cardBlack;

  return (
    <Animated.View style={[styles.card, styles.cardFront, style, animatedStyle]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.rank, { color: textColor }]}>{card.rank}</Text>
        <Text style={[styles.suit, { color: textColor }]}>{symbol}</Text>
      </View>
      
      <View style={styles.cardCenter}>
        <Text style={[styles.centerSuit, { color: textColor }]}>{symbol}</Text>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={[styles.rank, styles.rankFlipped, { color: textColor }]}>{card.rank}</Text>
        <Text style={[styles.suit, styles.suitFlipped, { color: textColor }]}>{symbol}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    marginHorizontal: 2,
    elevation: 4,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
  },
  cardFront: {
    backgroundColor: COLORS.cardWhite,
    borderWidth: 1.5,
    borderColor: COLORS.textMuted,
    padding: 4,
  },
  cardBack: {
    backgroundColor: COLORS.cardBack,
    borderWidth: 1.5,
    borderColor: COLORS.cardBackPattern,
  },
  cardBackPattern: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackPattern,
    borderRadius: 6,
    margin: 2,
  },
  cardBackText: {
    fontSize: 28,
    color: COLORS.textLight,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    transform: [{ rotate: '180deg' }],
  },
  rank: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  rankFlipped: {
    transform: [{ rotate: '180deg' }],
  },
  suit: {
    fontSize: 10,
    lineHeight: 10,
  },
  suitFlipped: {
    transform: [{ rotate: '180deg' }],
  },
  centerSuit: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default Card;
