import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import Card from "../components/Card";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );

  const updateLayout = () => {
    setDeviceWidth(Dimensions.get("window").width);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", updateLayout);
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  let image;
  let responsiveLayout;
  if (deviceWidth < 500) {
    responsiveLayout = styles.portraitScreen;
    image = (
      <Image
        style={styles.portraitLogo}
        source={require("../assets/success.png")}
        resizeMode="stretch"
      />
    );
  } else {
    responsiveLayout = styles.landscapeScreen;
    image = (
      <Image
        style={styles.landscapeLogo}
        source={require("../assets/success.png")}
        resizeMode="cover"
      />
    );
  }
  return (
    <ScrollView>
      <View style={responsiveLayout}>
        {image}
        <Card style={styles.gameOverContainer}>
          <NumberContainer>Congratulation !!!</NumberContainer>
          <MainButton
            color={Colors.primary}
            onPress={() => props.onResetGame()}
          >
            New Game!!!
          </MainButton>
        </Card>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  portraitScreen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  landscapeScreen: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gameOverContainer: {
    alignItems: "center",
    width: 300,
    maxWidth: "70%",
  },
  portraitLogo: {
    width: "80%",
    height: 300,
    borderRadius: 30,
  },
  landscapeLogo: {
    width: "40%",
    height: 200,
    borderRadius: 10,
    marginRight: 20,
  },
});
