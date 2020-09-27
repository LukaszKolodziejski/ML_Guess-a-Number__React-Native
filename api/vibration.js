import { Vibration } from "react-native";
const VibrationAlert = () => {
  Vibration.vibrate(100);
  setTimeout(() => {
    Vibration.cancel();
    Vibration.vibrate(200);
  }, 120);
  setTimeout(() => {
    Vibration.cancel();
    Vibration.vibrate(100);
  }, 400);
};

export default VibrationAlert;
