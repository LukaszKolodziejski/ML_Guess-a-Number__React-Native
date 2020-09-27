import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  // --- Fonts ---
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  // -------------

  const startGameHandler = (selectedNumber) => setUserNumber(selectedNumber);
  const endGameHandler = () => setGameOver(true);

  const resetGameHandler = () => {
    setUserNumber(null);
    setGameOver(false);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber) {
    content = <GameScreen userChoice={userNumber} onEndGame={endGameHandler} />;
  }
  gameOver
    ? (content = <GameOverScreen onResetGame={resetGameHandler} />)
    : null;

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
