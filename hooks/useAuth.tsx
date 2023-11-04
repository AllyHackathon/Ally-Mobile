// import { View, Text, Alert } from "react-native";
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loadingInitial, setLoadingInitial] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const storeUserCredentials = async (user) => {
//     try {
//       await AsyncStorage.setItem("user", JSON.stringify(user));
//       await AsyncStorage.setItem("user", JSON.stringify(user));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const memoedValue = useMemo(
//     () => ({
//       user,
//       signUp,
//       error,
//       loading
//       onLogout,
//     }),
//     [      user,
//       signUp,
//       error,
//       loading
//       onLogout, currentUser]
//   );

//   return (
//     <AuthContext.Provider value={memoedValue}>
//       {!loadingInitial && children}
//     </AuthContext.Provider>
//   );
// };

// export default function useAuth() {
//   return useContext(AuthContext);
// }
