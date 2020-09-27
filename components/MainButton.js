import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const MainButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.onPress()}
      style={{ ...styles.buttonContainer, ...props.style }}
    >
      <View style={styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  buttonContainer: {},
  button: {
    backgroundColor: "#2a2",
    padding: 12,

    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "open-sans",
  },
});
