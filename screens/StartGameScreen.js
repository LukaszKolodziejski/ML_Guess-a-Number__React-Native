import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import VibrationAlert from "../api/vibration";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const numberInputHandler = (textInput) => {
    setEnteredValue(textInput.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    if (enteredValue === "" || enteredValue == 0) {
      Alert.alert(
        "Invalid Number",
        "Number has be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive" }]
      );
      VibrationAlert();
      setEnteredValue("");
      return;
    }
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
    setConfirmed(true);
    Keyboard.dismiss();
  };

  let confirmedOutput = confirmed ? (
    <Card style={styles.summaryContainer}>
      <Text>You selected !!!</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton
        color={Colors.primary}
        onPress={() => props.onStartGame(selectedNumber)}
      >
        Start Game
      </MainButton>
    </Card>
  ) : null;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            keyboardType="number-pad"
            blurOnSubmit
            autoCorrect={false}
            maxLength={2}
            value={enteredValue}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: { fontSize: 20, marginVertical: 10 },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
  },
  button: {
    width: "42%",
  },
  inputContainer: {
    alignItems: "center",
    width: 300,
    maxWidth: "80%",
  },
  input: {
    width: "40%",
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
    width: 300,
    maxWidth: "60%",
  },
});
