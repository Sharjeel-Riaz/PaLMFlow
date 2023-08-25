import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AuthContext from "./App/Context/AuthContext";
import Services from "./App/Shared/Services";
import Login from "./App/Pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreenNavigation from "./App/Navigation/HomeScreenNavigation";

export default function App() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    Services.getUserAuth().then((resp) => {
      if (resp) {
        setUserData(resp);
      } else {
        setUserData(null);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AuthContext.Provider value={{ userData, setUserData }}>
        {userData ? (
          <NavigationContainer>
            <HomeScreenNavigation />
          </NavigationContainer>
        ) : (
          <Login />
        )}
      </AuthContext.Provider>
    </View>
  );
}
