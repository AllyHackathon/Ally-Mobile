import { View, Text, Alert } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import AuthSession from "expo-auth-session";
import { Authorizer } from "@authorizerdev/authorizer-js";

import { jwtDecode } from "jwt-decode";
import SecureStore from "expo-secure-store";

const useProxy = false;
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

const authorizerClientID = "YOUR_CLIENT_ID";
const authorizerURL = "YOUR_AUTHORIZER_INSTANCE_URL";
const authorizationEndpoint = `${authorizerURL}/authorize`;
const authorizerRef = new Authorizer({
  clientID: authorizerClientID,
  authorizerURL: authorizerURL,
  redirectURL: redirectUri,
});

const authorizerRefreshTokenKey = `authorizer_refresh_token`;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loadingInitial, setLoadingInitial] = useState();

  const signUp = {};

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

  const memoedValue = useMemo(
    () => ({
      //   user,
      //   signUp,
      request,
      result,
      promptAsync,
    }),
    [
      // user, signUp,
      request,
      result,
      promptAsync,
    ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
