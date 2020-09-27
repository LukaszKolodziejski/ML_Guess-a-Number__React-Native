import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import Card from "../components/Card";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Image
        style={styles.tinyLogo}
        source={require("../assets/success.png")}
        resizeMode="stretch"
      />
      <Card style={styles.gameOverContainer}>
        <NumberContainer>Congratulation !!!</NumberContainer>
        <MainButton color={Colors.primary} onPress={() => props.onResetGame()}>
          New Game!!!
        </MainButton>
      </Card>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  gameOverContainer: {
    alignItems: "center",
    width: 300,
    maxWidth: "70%",
  },
  tinyLogo: {
    width: "80%",
    height: 300,
    borderRadius: 30,
  },
});
