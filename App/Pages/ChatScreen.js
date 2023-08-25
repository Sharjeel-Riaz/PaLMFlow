import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import GlobalApi from "../Services/GlobalApi";

export default function ChatScreen() {
  const param = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text:
          "Hello, I'm " + param.selectedFace?.name + ". How can I help you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: param.selectedFace?.image,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    setLoading(true);

    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = (message) => {
    GlobalApi.getBardApi(message)
      .then((resp) => {
        if (resp.data.resp[1].content) {
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: resp.data.resp[1].content,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: param.selectedFace?.image,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAPIResp)
          );
          setLoading(false);
        } else {
          setLoading(false);
          const errorMessage =
            "Sorry, I can't help you with it. Please try again later!";
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: errorMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: param.selectedFace?.image,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAPIResp)
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage =
          "Sorry, an error occurred. Please try again later!";
        const chatAPIResp = {
          _id: Math.random() * (9999999 - 1),
          text: errorMessage,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: param.selectedFace?.image,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatAPIResp)
        );
      });
  };

  // Custom Input Toolbar
  function renderInputToolbar(props) {
    return <InputToolbar {...props} containerStyle={styles.toolbar} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("home");
        }}
      >
        <Image
          source={require("../Assets/back-btn.png")}
          style={{
            margin: 10,
            marginTop: 20,
          }}
        />
      </TouchableOpacity>
      <GiftedChat
        renderInputToolbar={renderInputToolbar}
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  toolbar: {
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    borderColor: "transparent",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 3,
  },
});
