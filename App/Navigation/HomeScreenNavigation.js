import React from "react";
import HomeScreen from "../Pages/HomeScreen";
import ChatScreen from "../Pages/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ contentStyle: { backgroundColor: "white" } }}
      />
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={{ contentStyle: { backgroundColor: "white" } }}
      />
    </Stack.Navigator>
  );
}
