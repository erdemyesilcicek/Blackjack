import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../utils/constants';
import { useLanguage } from '../utils/LanguageContext';

interface BettingPanelProps {
  playerMoney: number;
  currentBet: number;
  onBetChange: (bet: number) => void;
  onDeal: () => void;
  disabled?: boolean;
}

const BettingPanel: React.FC<BettingPanelProps> = ({
  playerMoney,
  currentBet,
  onBetChange,
  onDeal,
  disabled = false,
}) => {
  const { t } = useLanguage();
  const [selectedBet, setSelectedBet] = useState(currentBet);

  useEffect(() => {
    setSelectedBet(currentBet);
  }, [currentBet]);

  const betAmounts = [500, 1000, 1500, 2500, 3500, 5000].filter(amount => amount <= playerMoney);

  const handleBetSelect = (amount: number) => {
    if (amount > playerMoney) {
      Alert.alert(t.insufficientFunds, `${t.youOnlyHave} $${playerMoney}`);
      return;
    }
    setSelectedBet(amount);
    onBetChange(amount);
  };

  const handleDeal = () => {
    if (selectedBet > playerMoney) {
      Alert.alert(t.insufficientFunds, `${t.youOnlyHave} $${playerMoney}`);
      return;
    }
    onDeal();
  };

  const ChipButton: React.FC<{ amount: number }> = ({ amount }) => {
    const isSelected = selectedBet === amount;
    const canAfford = amount <= playerMoney;
    
    // Chip rengini değere göre belirle
    const getChipColor = () => {
      if (amount <= 500) return COLORS.chipWhite;
      if (amount <= 1000) return COLORS.chipRed;
      if (amount <= 1500) return COLORS.chipGreen;
      if (amount <= 2500) return COLORS.chipBlue;
      if (amount <= 3500) return COLORS.chipBlack;
      if (amount <= 5000) return COLORS.chipPurple;
      return COLORS.gold; // En yüksek miktarlar için altın renk
    };

    const getChipTextColor = () => {
      if (amount <= 500) return COLORS.textDark;
      if (amount >= 5000) return COLORS.textDark; // Mor chip için koyu text
      return COLORS.textLight;
    };
    
    return (
      <TouchableOpacity
        style={[
          styles.chip,
          { backgroundColor: getChipColor() },
          !canAfford && styles.chipDisabled,
          isSelected && styles.chipSelected,
        ]}
        onPress={() => canAfford && handleBetSelect(amount)}
        disabled={!canAfford || disabled}
      >
        <Text style={[
          styles.chipText,
          { color: getChipTextColor() },
          !canAfford && styles.chipTextDisabled,
          isSelected && styles.chipTextSelected,
        ]}>
          ${amount}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.moneyInfo}>
        <Text style={styles.moneyLabel}>{t.yourMoney}</Text>
        <Text style={styles.moneyAmount}>${playerMoney}</Text>
      </View>

      <View style={styles.betInfo}>
        <Text style={styles.betLabel}>{t.currentBet}</Text>
        <Text style={styles.betAmount}>${selectedBet}</Text>
      </View>

      <View style={styles.chipsContainer}>
        <Text style={styles.chipsLabel}>{t.selectBetAmount}</Text>
        <View style={styles.chipsGrid}>
          {betAmounts.map(amount => (
            <ChipButton key={amount} amount={amount} />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.dealButton,
          (disabled || selectedBet > playerMoney) && styles.dealButtonDisabled,
        ]}
        onPress={handleDeal}
        disabled={disabled || selectedBet > playerMoney}
      >
        <Text style={[
          styles.dealButtonText,
          (disabled || selectedBet > playerMoney) && styles.dealButtonTextDisabled,
        ]}>
          {t.dealCards}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: COLORS.feltDark,
    borderRadius: 12,
    marginTop: 3,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
  },
  moneyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  moneyLabel: {
    fontSize: 15,
    color: COLORS.textLight,
  },
  moneyAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  betInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  betLabel: {
    fontSize: 15,
    color: COLORS.textLight,
  },
  betAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.gold,
  },
  chipsContainer: {
    marginBottom: 12,
  },
  chipsLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 10,
    textAlign: 'center',
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    maxWidth: '100%',
  },
  chip: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.textLight,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
  },
  chipSelected: {
    borderColor: COLORS.gold,
    borderWidth: 3,
    transform: [{ scale: 1.15 }],
    elevation: 6,
    shadowOpacity: 0.4,
  },
  chipDisabled: {
    backgroundColor: COLORS.buttonDisabled,
    borderColor: COLORS.textMuted,
  },
  chipText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  chipTextSelected: {
    color: COLORS.textGold,
    fontSize: 10,
  },
  chipTextDisabled: {
    color: COLORS.textMuted,
  },
  dealButton: {
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.textLight,
    elevation: 3,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dealButtonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
    borderColor: COLORS.textMuted,
  },
  dealButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  dealButtonTextDisabled: {
    color: COLORS.textMuted,
  },
});

export default BettingPanel;
