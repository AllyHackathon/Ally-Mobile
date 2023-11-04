import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(117,1,233,1)",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        paddingTop: 80,
        paddingBottom: 28,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "500",
            alignSelf: "center",
            color: "#fff",
            fontSize: 90,
          }}
        >
          Ally
        </Text>
        <Text
          style={{
            fontWeight: "500",
            alignSelf: "center",
            color: "#fff",
            fontSize: 17,
          }}
        >
          A spark for your conversations
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            paddingVertical: 22,
            backgroundColor: "#000",
            borderRadius: 18,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600", color: "#fff" }}>
            Sign up or Log in with WhatsApp
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
