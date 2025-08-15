import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameAction, GameState } from '../types/game';
import { COLORS, MIN_BET } from '../utils/constants';
import { executePlayerAction, initializeGame, playDealerTurn, startNewHand } from '../utils/gameLogic';
import { useLanguage } from '../utils/LanguageContext';

import BettingPanel from '../components/BettingPanel';
import DealerHand from '../components/DealerHand';
import GameControls from '../components/GameControls';
import GameResult from '../components/GameResult';
import PlayerHand from '../components/PlayerHand';

const PLAYER_MONEY_KEY = 'playerMoney';

export default function Index() {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  
  // Load player money from storage on component mount
  useEffect(() => {
    loadPlayerMoney();
  }, []);

  const loadPlayerMoney = async () => {
    try {
      const savedMoney = await AsyncStorage.getItem(PLAYER_MONEY_KEY);
      if (savedMoney !== null) {
        const money = JSON.parse(savedMoney);
        setGameState(prevState => ({
          ...prevState,
          playerMoney: money,
          currentBet: Math.min(prevState.currentBet, money),
        }));
      }
    } catch (error) {
      console.error('Error loading player money:', error);
    }
  };

  const savePlayerMoney = async (money: number) => {
    try {
      await AsyncStorage.setItem(PLAYER_MONEY_KEY, JSON.stringify(money));
    } catch (error) {
      console.error('Error saving player money:', error);
    }
  };
  
  useEffect(() => {
    // Auto-play dealer turn when phase changes to dealer
    if (gameState.gamePhase === 'dealer') {
      const timer = setTimeout(() => {
        setGameState(prevState => playDealerTurn(prevState));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.gamePhase]);

  // Save player money whenever it changes
  useEffect(() => {
    savePlayerMoney(gameState.playerMoney);
  }, [gameState.playerMoney]);

  const handleBetChange = (bet: number) => {
    setGameState(prevState => ({ ...prevState, currentBet: bet }));
  };

  const handleDeal = () => {
    try {
      const newGameState = startNewHand(gameState, gameState.currentBet);
      setGameState(newGameState);
    } catch (error) {
      Alert.alert(t.error, error instanceof Error ? error.message : t.failedToDealCards);
    }
  };

  const handlePlayerAction = (action: GameAction) => {
    const newGameState = executePlayerAction(gameState, action);
    setGameState(newGameState);
  };

  const handleNewGame = () => {
    if (gameState.playerMoney < MIN_BET) {
      Alert.alert(
        t.gameOver, 
        t.outOfMoney,
        [{ 
          text: t.ok, 
          onPress: async () => {
            const newGameState = initializeGame();
            setGameState(newGameState);
            await savePlayerMoney(newGameState.playerMoney);
          }
        }]
      );
    } else {
      // Tamamen yeni bir oyun durumu oluştur, sadece parayı koru
      const newGameState = initializeGame();
      setGameState({
        ...newGameState,
        playerMoney: gameState.playerMoney,
        currentBet: Math.min(gameState.currentBet, gameState.playerMoney),
      });
    }
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const canPlayerAct = gameState.gamePhase === 'playing';
  const currentPlayerHand = gameState.playerHands[gameState.currentHandIndex];

  const calculateWinnings = () => {
    if (!gameState.gameResult) return 0;
    
    const initialMoney = gameState.playerMoney - gameState.currentBet;
    return gameState.playerMoney - initialMoney;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t.blackjack}</Text>
            <Text style={styles.subtitle}>{t.classicErdemApplication}</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Dealer Section */}
        <DealerHand 
          hand={gameState.dealerHand}
          hideSecondCard={gameState.gamePhase === 'playing'}
          gamePhase={gameState.gamePhase}
        />

        {/* Player Sections */}
        <View style={styles.playerSection}>
          {gameState.playerHands.map((hand, index) => (
            <PlayerHand
              key={index}
              hand={hand}
              isActive={index === gameState.currentHandIndex && canPlayerAct}
              title={gameState.playerHands.length > 1 ? `${t.hand} ${index + 1}` : t.yourHand}
              showCards={true}
            />
          ))}
        </View>

        {/* Game Controls */}
        {canPlayerAct && (
          <GameControls
            onAction={handlePlayerAction}
            canHit={!currentPlayerHand.isBusted && currentPlayerHand.value < 21}
            canStand={true}
            canDouble={gameState.canDouble && gameState.playerMoney >= gameState.currentBet}
            canSplit={gameState.canSplit && gameState.playerMoney >= gameState.currentBet}
            canSurrender={gameState.canSurrender}
          />
        )}

        {/* Game Status */}
        {gameState.gamePhase === 'betting' && (
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>
              {t.phase}: {gameState.gamePhase.charAt(0).toUpperCase() + gameState.gamePhase.slice(1)}
            </Text>
          </View>
        )}

        {/* Betting Panel */}
        {gameState.gamePhase === 'betting' && (
          <BettingPanel
            playerMoney={gameState.playerMoney}
            currentBet={gameState.currentBet}
            onBetChange={handleBetChange}
            onDeal={handleDeal}
          />
        )}

        {/* Game Status - Non-betting phases */}
        {gameState.gamePhase !== 'betting' && (
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>
              {t.phase}: {gameState.gamePhase.charAt(0).toUpperCase() + gameState.gamePhase.slice(1)}
            </Text>
            {gameState.gamePhase === 'playing' && gameState.playerHands.length > 1 && (
              <Text style={styles.statusText}>
                {t.playingHand} {gameState.currentHandIndex + 1} {t.of} {gameState.playerHands.length}
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Game Result Overlay */}
      {gameState.gameResult && (
        <GameResult
          result={gameState.gameResult}
          winnings={calculateWinnings()}
          onNewGame={handleNewGame}
        />
      )}
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
  scrollContent: {
    flexGrow: 1,
    padding: 8,
    paddingTop: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.gold,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.lightGold,
    marginTop: 2,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: COLORS.feltDark,
    borderRadius: 18,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  settingsIcon: {
    fontSize: 18,
  },
  playerSection: {
    minHeight: 100,
    marginBottom: 6,
  },
  statusBar: {
    backgroundColor: COLORS.feltDark,
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  statusText: {
    color: COLORS.textLight,
    fontSize: 12,
    textAlign: 'center',
  },
});
