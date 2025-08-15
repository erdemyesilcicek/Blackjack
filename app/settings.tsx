import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../utils/constants';
import { useLanguage } from '../utils/LanguageContext';

const PLAYER_MONEY_KEY = 'playerMoney';

export default function Settings() {
  const { t, currentLanguage, setLanguage } = useLanguage();
  const handleLanguage = () => {
    Alert.alert(
      t.languageSettings,
      t.selectPreferredLanguage,
      [
        { 
          text: t.english, 
          onPress: async () => {
            await setLanguage('en');
          }
        },
        { 
          text: t.turkish, 
          onPress: async () => {
            await setLanguage('tr');
          }
        },
        { text: t.cancel, style: 'cancel' }
      ]
    );
  };

  const handleTheme = () => {
    const themes = [
      {
        name: t.classicCasinoTheme,
        description: t.classicCasinoThemeDesc
      },
      {
        name: t.modernMinimalTheme,
        description: t.modernMinimalThemeDesc
      },
      {
        name: t.darkTheme,
        description: t.darkThemeDesc
      }
    ];

    // İlk olarak tema listesi göster
    Alert.alert(
      t.themeSettings,
      t.selectPreferredTheme,
      [
        ...themes.map(theme => ({
          text: theme.name,
          onPress: () => {
            // Seçilen tema için detay göster
            Alert.alert(
              theme.name,
              theme.description,
              [
                { text: t.back, style: 'cancel', onPress: () => handleTheme() },
                { 
                  text: t.selectThisTheme, 
                  onPress: () => console.log(`${theme.name} selected`) 
                }
              ]
            );
          }
        })),
        { text: t.cancel, style: 'cancel' }
      ]
    );
  };

  const handleResetGame = () => {
    Alert.alert(
      t.resetGame,
      t.resetGameConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.reset, 
          style: 'destructive',
          onPress: async () => {
            try {
              // Reset player money to default (1000)
              await AsyncStorage.removeItem(PLAYER_MONEY_KEY);
              Alert.alert(t.gameReset, t.gameResetMessage);
              router.back();
            } catch (error) {
              console.error('Error resetting game:', error);
              Alert.alert(t.error, t.failedToReset);
            }
          }
        }
      ]
    );
  };

  const handleAddMoney = () => {
    Alert.alert(
      t.addMoneyTitle,
      t.addMoneyConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.addMoney, 
          onPress: async () => {
            try {
              // Get current money from storage
              const savedMoney = await AsyncStorage.getItem(PLAYER_MONEY_KEY);
              const currentMoney = savedMoney ? JSON.parse(savedMoney) : 10000;

              // Add $50000
              const newMoney = currentMoney + 50000;
              
              // Save to storage
              await AsyncStorage.setItem(PLAYER_MONEY_KEY, JSON.stringify(newMoney));
              
              Alert.alert(t.moneyAdded, `$50000 ${t.moneyAdded.toLowerCase()}. ${t.newBalance} $${newMoney}`);
            } catch (error) {
              console.error('Error adding money:', error);
              Alert.alert(t.error, t.failedToAddMoney);
            }
          }
        }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      t.aboutJackPointTitle,
      t.aboutJackPointText,
      [{ text: t.ok }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>{t.back}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{t.settings}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.preferences}</Text>
            
            <TouchableOpacity style={styles.preferenceButton} onPress={handleLanguage}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>{t.language}</Text>
                <Text style={styles.preferenceSubtitle}>{t.choosePreferredLanguage}</Text>
              </View>
              <Text style={styles.preferenceValue}>
                {currentLanguage === 'tr' ? t.turkish : t.english} ›
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.preferenceButton} onPress={handleTheme}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>{t.theme}</Text>
                <Text style={styles.preferenceSubtitle}>{t.customizeGamingExperience}</Text>
              </View>
              <Text style={styles.preferenceValue}>{t.classicCasinoTheme} ›</Text>
            </TouchableOpacity>
          </View>

          {/* Game Rules */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.gameRules}</Text>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.dealerHitsSoft17}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.blackjackPays}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.doubleAfterSplitAllowed}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.surrenderAvailable}</Text>
            </View>
          </View>

          {/* Gameplay Buttons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.gameplayButtons}</Text>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.hitDescription}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.standDescription}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.doubleDescription}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.splitDescription}</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>{t.surrenderDescription}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.actions}</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleAddMoney}>
              <Text style={styles.actionButtonText}>{t.addMoney}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleResetGame}>
              <Text style={styles.actionButtonText}>{t.resetGameData}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleAbout}>
              <Text style={styles.actionButtonText}>{t.aboutJackPoint}</Text>
            </TouchableOpacity>
          </View>

          {/* Version Info */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>JackPoint v1.0</Text>
            <Text style={styles.versionSubtext}>{t.classicBlackjackExperience}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.casinoGreen,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.casinoGreen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  placeholder: {
    width: 60, // To balance the header
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: 15,
  },
  ruleItem: {
    backgroundColor: COLORS.feltDark,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  ruleText: {
    fontSize: 15,
    color: COLORS.textLight,
  },
  boldText: {
    fontWeight: 'bold',
    color: COLORS.gold,
  },
  preferenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.feltDark,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  preferenceSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    opacity: 0.7,
  },
  preferenceValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gold,
  },
  actionButton: {
    backgroundColor: COLORS.feltDark,
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gold,
    textAlign: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 20,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textLight,
    opacity: 0.8,
  },
  versionSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    opacity: 0.6,
    marginTop: 4,
  },
});
