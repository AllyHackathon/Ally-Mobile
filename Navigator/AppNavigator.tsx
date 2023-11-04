import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../src/screens/Home/HomeScreen/HomeScreen";
import CreateChatScreen from "../src/screens/Home/CreateChatScreen/CreateChatScreen";
import SignUpScreen from "../src/screens/Auth/SignUpScreen/SignUpScreen";
import ChatSummaryScreen from "../src/screens/Home/ChatSummary/ChatSummaryScreen";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const user = "him";
  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{}}>
          <Stack.Screen
            name="Home"
            options={{
              title: "Ally",
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "light",
            }}
            component={HomeScreen}
          />

          <Stack.Screen
            name="CreateChat"
            options={{
              title: "Create New Chat",
              presentation: "formSheet",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "800",
              },
            }}
            component={CreateChatScreen}
          />

          <Stack.Screen
            options={{
              presentation: "formSheet",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "800",
              },
              title: "Chat Summary",
            }}
            name="ChatSummary"
            component={ChatSummaryScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
