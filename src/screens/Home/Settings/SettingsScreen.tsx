import { View, Text } from "react-native";
import React from "react";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View
        style={{
          paddingVertical: 12,
          borderRadius: 18,
          backgroundColor: "red",
          alignItems: "center",
        }}
      >
        <Text style={styles.subHeader}>Log out</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
