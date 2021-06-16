import React, { createContext, useCallback, useContext, useState } from "react";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

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

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
