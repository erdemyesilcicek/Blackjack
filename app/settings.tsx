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

const PLAYER_MONEY_KEY = 'playerMoney';

export default function Settings() {
  const handleLanguage = () => {
    Alert.alert(
      'Language Settings',
      'Select your preferred language:',
      [
        { text: 'English', onPress: () => console.log('English selected') },
        { text: 'Türkçe', onPress: () => console.log('Turkish selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleTheme = () => {
    const themes = [
      {
        name: 'Klasik Casino Teması',
        description: 'Koyu yeşil masa arka planı\nGerçekçi kart tasarımları (kırmızı/siyah)\nAltın renkli çerçeveler ve butonlar\nCasino atmosferi (chips, felt texture)'
      },
      {
        name: 'Modern/Minimal Tema',
        description: 'Temiz, düz renkler\nBasit geometrik kart tasarımı\nBeyaz/gri arka plan\nFlat design butonlar\nTypography odaklı'
      },
      {
        name: 'Dark Theme',
        description: 'Siyah/koyu gri arka plan\nNeon renkli vurgular (mavi, yeşil)\nModern kart tasarımı\nRGB efektleri\nFuturistik görünüm'
      }
    ];

    // İlk olarak tema listesi göster
    Alert.alert(
      'Theme Settings',
      'Select your preferred theme:',
      [
        ...themes.map(theme => ({
          text: theme.name,
          onPress: () => {
            // Seçilen tema için detay göster
            Alert.alert(
              theme.name,
              theme.description,
              [
                { text: 'Back', style: 'cancel', onPress: () => handleTheme() },
                { 
                  text: 'Select This Theme', 
                  onPress: () => console.log(`${theme.name} selected`) 
                }
              ]
            );
          }
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleResetGame = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to reset all game data? This will reset your money to the starting amount.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Reset player money to default (1000)
              await AsyncStorage.removeItem(PLAYER_MONEY_KEY);
              Alert.alert('Game Reset', 'Game data has been reset. Your money has been restored to $1000.');
              router.back();
            } catch (error) {
              console.error('Error resetting game:', error);
              Alert.alert('Error', 'Failed to reset game data.');
            }
          }
        }
      ]
    );
  };

  const handleAddMoney = () => {
    Alert.alert(
      'Add Money',
      'Are you sure you want to add $5000 to your balance?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add $5000', 
          onPress: async () => {
            try {
              // Get current money from storage
              const savedMoney = await AsyncStorage.getItem(PLAYER_MONEY_KEY);
              const currentMoney = savedMoney ? JSON.parse(savedMoney) : 1000;
              
              // Add $5000
              const newMoney = currentMoney + 5000;
              
              // Save to storage
              await AsyncStorage.setItem(PLAYER_MONEY_KEY, JSON.stringify(newMoney));
              
              Alert.alert('Money Added', `$5000 has been added to your balance. New balance: $${newMoney}`);
            } catch (error) {
              console.error('Error adding money:', error);
              Alert.alert('Error', 'Failed to add money to your balance.');
            }
          }
        }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About JackPoint',
      'JackPoint v1.0\n\nA classic Blackjack game built with React Native and Expo.\n\n© 2025 JackPoint Games',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <TouchableOpacity style={styles.preferenceButton} onPress={handleLanguage}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>🌐 Language</Text>
                <Text style={styles.preferenceSubtitle}>Choose your preferred language</Text>
              </View>
              <Text style={styles.preferenceValue}>English ›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.preferenceButton} onPress={handleTheme}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>🎨 Theme</Text>
                <Text style={styles.preferenceSubtitle}>Customize your gaming experience</Text>
              </View>
              <Text style={styles.preferenceValue}>Klasik Casino ›</Text>
            </TouchableOpacity>
          </View>

          {/* Game Rules */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Rules</Text>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>• Dealer hits on soft 17</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>• Blackjack pays 3:2</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>• Double after split allowed</Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleText}>• Surrender available</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actions</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleAddMoney}>
              <Text style={styles.actionButtonText}>💰 Add $5000</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleResetGame}>
              <Text style={styles.actionButtonText}>Reset Game Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleAbout}>
              <Text style={styles.actionButtonText}>About JackPoint</Text>
            </TouchableOpacity>
          </View>

          {/* Version Info */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>JackPoint v1.0</Text>
            <Text style={styles.versionSubtext}>Classic Blackjack Experience</Text>
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
