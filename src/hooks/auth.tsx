import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  userStorageLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const userLS = await AsyncStorage.getItem("@gofanances:user");
      if (userLS) {
        const userParse = JSON.parse(userLS);
        setUser(userParse);
      }
      setUserStorageLoading(false);
    })();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "786733409201-7dr6g3118g9ne7p2rgad5s8uj52lhqef.apps.googleusercontent.com",
        androidClientId:
          "786733409201-cb6mm20l6sdp11iso6b5dt5qmd4ur5uc.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const userLogger = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!,
        };

        setUser(userLogger);
        await AsyncStorage.setItem(
          "@gofanances:user",
          JSON.stringify(userLogger)
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const userLogger = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo: `http://ui-avatars.com/api/?name=${name}&length=1`,
        };

        setUser(userLogger);
        await AsyncStorage.setItem(
          "@gofanances:user",
          JSON.stringify(userLogger)
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    setUser({} as User);
    await AsyncStorage.removeItem("@gofanances:user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStorageLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
