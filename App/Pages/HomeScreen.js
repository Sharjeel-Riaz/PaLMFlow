import {
  View,
  Text,
  Image,
  FlatList,
  Touchable,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import Services from "../Shared/Services";
import AuthContext from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
// import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function HomeScreen() {
  //   let [fontsLoaded, fontError] = useFonts({
  //     Poppins_400Regular,
  //   });

  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFaceData, setSelectedChatFaceData] = useState([]);
  const { userData, setUserData } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChatFaceData(ChatFaceData[0]);
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 35,
          paddingLeft: 22,
          paddingRight: 22,
          backgroundColor: "#FFF",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 0,
            paddingTop: 5,
          }}
        >
          {userData?.picture && (
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                padding: 12,
              }}
              source={{ uri: userData?.picture }}
            />
          )}
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Roboto",
              padding: 12,
            }}
          >
            Hello, {userData?.given_name}!
          </Text>
        </View>
        <TouchableOpacity
          title="Logout"
          onPress={() => {
            Services.logout();
            setUserData(null);
          }}
          style={[
            { backgroundColor: selectedChatFaceData.primary },
            {
              width: Dimensions.get("screen").width * 0.26,
              height: 50,
              alignItems: "center",
              borderRadius: 100,
              elevation: 3,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#FFF",
              fontFamily: "Roboto",
              padding: 12,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          paddingTop: 40,
          backgroundColor: "#FFF",
        }}
      >
        <Text
          style={[{ color: selectedChatFaceData.primary }, { fontSize: 35 }]}
        >
          Hello there,
        </Text>
        <Text
          style={[
            { color: selectedChatFaceData.primary },
            {
              fontSize: 40,
              fontWeight: "bold",
              fontFamily: "Roboto",
            },
          ]}
        >
          I am {selectedChatFaceData.name}.{" "}
        </Text>
        {selectedChatFaceData.image && (
          <Image
            source={{ uri: selectedChatFaceData.image }}
            style={{
              width: 150,
              height: 150,
              marginTop: 25,
            }}
          />
        )}
        <Text
          style={{
            fontSize: 30,
            marginTop: 50,
          }}
        >
          How can I help you?
        </Text>

        <View
          style={{
            marginTop: 60,
            backgroundColor: "#F3F3F3",
            alignItems: "center",
            height: 130,
            padding: 10,
            borderRadius: 20,
            elevation: 5,
          }}
        >
          <FlatList
            data={chatFaceData}
            horizontal={true}
            renderItem={({ item }) =>
              selectedChatFaceData.id != item.id && (
                <TouchableOpacity
                  style={{
                    margin: 15,
                  }}
                  onPress={() => setSelectedChatFaceData(item)}
                >
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
              )
            }
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              color: "#B0B0B0",
            }}
          >
            Choose your favourite Chat Buddy!
          </Text>
        </View>

        <TouchableOpacity
          style={[
            { backgroundColor: selectedChatFaceData.primary },
            {
              padding: 17,
              width: Dimensions.get("screen").width * 0.6,
              alignItems: "center",
              borderRadius: 100,
              marginTop: 60,
              elevation: 3,
            },
          ]}
          onPress={() => {
            navigation.navigate("chat", {selectedFace:selectedChatFaceData});
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#FFF",
            }}
          >
            Let's Chat
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
