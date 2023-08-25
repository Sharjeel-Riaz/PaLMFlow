import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../Context/AuthContext";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Services from "../Shared/Services";

const screenWidth = Dimensions.get("window").width;
const bannerImageHeight = Dimensions.get("window").height / 3.2;

export default function Login() {
  WebBrowser.maybeCompleteAuthSession();

  const [userInfo, setUserInfo] = useState();
  const { userData, setUserData } = useContext(AuthContext);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  // To handle respon se from authentication
  useEffect(() => {
    if (response?.type == "success") {
      getUserData();
    }
  }, [response]);

  // To get user data
  const getUserData = async () => {
    try {
      const resp = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${response.authentication.accessToken}`,
        },
      });

      const user = await resp.json();
      setUserInfo(user);
      setUserData(user);
      await Services.setUserAuth(user); // Storing the data in local storage
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../Assets/login-banner.jpg")}
        style={styles.bannerImage}
      />
      <View style={styles.containerRound}>
        <Image
          source={require("../Assets/logo.png")}
          style={styles.logoImage}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: 80,
            fontSize: 22,
            fontFamily: "sans-serif",
          }}
        >
          Login / Signup
        </Text>

        <LinearGradient
          colors={["#eb3941", "#f15e64", "#e14e53", "#e2373f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientContainer}
        >
          <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
            <AntDesign
              name="google"
              size={24}
              color="white"
              style={{
                marginRight: 12,
              }}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#FFF",
              }}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <View
          style={{
            position: "absolute",
            bottom: -70,
            left: -20,
            width: 120,
            height: 120,
            backgroundColor: "#d3e3fc",
            borderRadius: 80,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: -40,
            right: -50,
            width: 180,
            height: 180,
            backgroundColor: "rgba(211, 227, 252, 0.6)",
            borderRadius: 90,
          }}
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: screenWidth,
    height: bannerImageHeight,
  },
  containerRound: {
    height:
      Dimensions.get("window").height -
      (bannerImageHeight - Dimensions.get("window").height * 0.04),
    width: screenWidth,
    paddingTop: 30,
    marginTop: -35,
    backgroundColor: "#FFF",
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    elevation: 20,
  },
  gradientContainer: {
    padding: 15,
    margin: 65,
    marginTop: 30,
    borderRadius: 20,
    elevation: 5,
  },
  logoImage: {
    width: 275,
    height: 60,
    margin: 40,
    marginBottom: 60,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "transparent",
    justifyContent: "center",
    fontFamily: "sans-serif",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
