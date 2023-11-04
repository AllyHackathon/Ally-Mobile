import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../src/screens/Home/HomeScreen/HomeScreen";
import CreateChatScreen from "../src/screens/Home/CreateChatScreen/CreateChatScreen";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
