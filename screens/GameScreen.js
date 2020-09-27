import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import VibrationAlert from "../api/vibration";

const generateRandomBeetwen = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (exclude === rndNum) {
    return generateRandomBeetwen(min, max, exclude);
  } else return rndNum;
};

const renderListItem = (value, numOfRound, array) => (
  <NumberContainer key={value}>
    #{array.length - numOfRound}: ({value})
  </NumberContainer>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBeetwen(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [passGuesses, setPassGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onEndGame } = props;

  useEffect(() => {
    userChoice === currentGuess ? onEndGame() : null;
  }, [currentGuess, userChoice, onEndGame]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "Lower" && currentGuess <= userChoice) ||
      (direction === "Greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Wrong Hint", "Don't lie and give correct hint.", [
        { text: "Okay", style: "cancel" },
      ]);
      VibrationAlert();
      return;
    }
    switch (direction) {
      case "Lower":
        currentHigh.current = currentGuess;
        break;
      case "Greater":
        currentLow.current = currentGuess;
        break;
    }
    const newGuess = generateRandomBeetwen(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(newGuess);
    setPassGuesses((curPastGuesses) => [newGuess, ...curPastGuesses]);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler("Lower")}>
          <Feather name="chevrons-down" size={30} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("Greater")}>
          <Feather name="chevrons-up" size={30} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView style={styles.listItem} fadingEdgeLength={100}>
          {passGuesses.map((guess, index, array) =>
            renderListItem(guess, index, array)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  card: {
    marginBottom: 100,
    alignItems: "center",
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  list: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "20%",
  },
  listItem: {},
});
