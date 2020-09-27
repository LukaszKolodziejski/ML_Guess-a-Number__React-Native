import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    // IOS only >>>
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // IOS only <<<

    // Android only >>>
    elevation: 6,
    borderRadius: 10,
  },
});
