import AuthSession from "expo-auth-session";
import { Authorizer } from "@authorizerdev/authorizer-js";

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
