import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

import * as WebBrowser from "expo-web-browser";
import { Authorizer } from "@authorizerdev/authorizer-js";
import { AuthorizerSocialLogin } from "@authorizerdev/authorizer-react";

import HomeScreen from "../src/screens/Home/HomeScreen/HomeScreen";
import CreateChatScreen from "../src/screens/Home/CreateChatScreen/CreateChatScreen";
import SignUpScreen from "../src/screens/Auth/SignUpScreen/SignUpScreen";
import ChatSummaryScreen from "../src/screens/Home/ChatSummary/ChatSummaryScreen";
import SettingsScreen from "../src/screens/Home/Settings/SettingsScreen";

// You need to swap out the Authorizer client id and domain with the one from your Authorizer client.
// In your Authorizer client, you need to also add a url to your authorized redirect urls.

const useProxy = false;
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
console.log(redirectUri);

const authorizerClientID = "96fed66c-9779-4694-a79a-260fc489ce33";
const authorizerURL = "https://demo.authorizer.dev";
const authorizationEndpoint = `${authorizerURL}/authorize`;
const authorizerRef = new Authorizer({
  clientID: authorizerClientID,
  authorizerURL: authorizerURL,
  redirectURL: redirectUri,
});

const authorizerRefreshTokenKey = `authorizer_refresh_token`;

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const user = "him";
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: authorizerClientID,
      // id_token will return a JWT token
      responseType: "token",
      // use offline access to get a refresh token and perform silent refresh in background
      scopes: ["openid", "profile", "email", "offline_access"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  // on init silently refresh token if it exists
  useEffect(() => {
    async function silentRefresh() {
      try {
        const refreshToken = await SecureStore.getItemAsync(
          authorizerRefreshTokenKey
        );
        console.log(refreshToken);
        if (refreshToken) {
          try {
            const res = await authorizerRef.getToken({
              grant_type: "refresh_token",
              refresh_token: refreshToken,
            });
            console.log({ res });
            await SecureStore.setItemAsync(
              "authorizer_refresh_token",
              res.refresh_token
            );

            setEmail(jwtDecode(res.id_token).email);
          } catch (err) {
            console.error(JSON.stringify(err));
            await SecureStore.deleteItemAsync(authorizerRefreshTokenKey);
          }
        }
      } catch (error) {
        setEmail(null);
        await SecureStore.deleteItemAsync(authorizerRefreshTokenKey);
      } finally {
        setLoading(false);
      }
    }
    silentRefresh();
  }, []);

  useEffect(() => {
    async function setResult() {
      if (result) {
        if (result.params.refresh_token) {
          await SecureStore.setItemAsync(
            authorizerRefreshTokenKey,
            result.params.refresh_token
          );
        }

        if (result.error) {
          Alert.alert(
            "Authentication error",
            result.params.error_description || "something went wrong"
          );
          return;
        }

        if (result.type === "success") {
          // Retrieve the JWT token and decode it
          const jwtToken = result.params.id_token;
          const decoded = jwtDecode(jwtToken);

          const { email } = decoded;
          setEmail(email);
        }
      }
    }
    setResult();
  }, [result]);

  const handleLogout = async () => {
    setLoading(true);
    setEmail(null);

    try {
      const refreshToken = await SecureStore.getItemAsync(
        authorizerRefreshTokenKey
      );
      await authorizerRef.revokeToken({
        refresh_token: refreshToken,
      });
      await SecureStore.deleteItemAsync(authorizerRefreshTokenKey);
      await WebBrowser.openAuthSessionAsync(
        `${authorizerURL}/logout?redirect_uri=${redirectUri}`,
        "redirectUrl"
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return email ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        disabled={!request}
        title="Log in with Authorizer"
        onPress={() => promptAsync({ useProxy })}
      />
    </View>
  ) : (
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
            name="Settings"
            options={{
              headerTitleStyle: {
                fontWeight: "800",
                color: "#000",
              },
              headerTintColor: "rgba(117,1,233,1)",
              headerShadowVisible: false,
            }}
            component={SettingsScreen}
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
