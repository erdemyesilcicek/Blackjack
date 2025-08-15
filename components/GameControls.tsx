import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameAction } from '../types/game';
import { COLORS } from '../utils/constants';
import { useLanguage } from '../utils/LanguageContext';

interface GameControlsProps {
  onAction: (action: GameAction) => void;
  canHit: boolean;
  canStand: boolean;
  canDouble: boolean;
  canSplit: boolean;
  canSurrender: boolean;
  disabled?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onAction,
  canHit,
  canStand,
  canDouble,
  canSplit,
  canSurrender,
  disabled = false,
}) => {
  const { t } = useLanguage();
  const ActionButton: React.FC<{
    title: string;
    action: GameAction;
    enabled: boolean;
    style?: any;
  }> = ({ title, action, enabled, style }) => {
    const isEnabled = enabled && !disabled;
    
    return (
      <TouchableOpacity
        style={[
          styles.button,
          !isEnabled && styles.buttonDisabled,
          style,
        ]}
        onPress={() => isEnabled && onAction(action)}
        disabled={!isEnabled}
      >
        <Text
          style={[
            styles.buttonText,
            !isEnabled && styles.buttonTextDisabled,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <ActionButton
          title={t.hit}
          action="hit"
          enabled={canHit}
        />
        <ActionButton
          title={t.stand}
          action="stand"
          enabled={canStand}
        />
        <ActionButton
          title={t.double}
          action="double"
          enabled={canDouble}
          style={styles.specialButton}
        />
        <ActionButton
          title={t.split}
          action="split"
          enabled={canSplit}
          style={styles.specialButton}
        />
        <ActionButton
          title={t.surrender}
          action="surrender"
          enabled={canSurrender}
          style={styles.dangerButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    backgroundColor: COLORS.chipBlue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.textLight,
    minWidth: 75,
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
    borderColor: COLORS.textMuted,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: COLORS.textMuted,
  },
  specialButton: {
    backgroundColor: COLORS.bronzeGold,
  },
  dangerButton: {
    backgroundColor: COLORS.danger,
  },
});

export default GameControls;
