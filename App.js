import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import MyStack from "./src/NavigationRouter/navigationRouter";
import { auth } from "./src/Firebase/Firebase.config";
import { db } from "./src/Firebase/Firebase.config1";

const App = () => {
  return (
    <MyStack />
  )
}

export default App;