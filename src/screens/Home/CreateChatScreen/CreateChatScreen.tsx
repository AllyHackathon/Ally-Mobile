import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { rel_types, tone } from "../../../../components/data";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";

const CreateChatScreen = () => {
  const [complete, setComplete] = useState<boolean>(true);
  const [relType, setRelType] = useState<string>("");
  const [chatTone, setChatTone] = useState<string>("");

  const { bottom } = useSafeAreaInsets();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: complete ? "rgba(117,1,233,1)" : "rgba(117,1,233,0.3)",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, complete]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.subHeader}>Invitee Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            selectionColor={"rgba(117,1,233,1)"}
            style={{
              fontSize: 17,
              fontWeight: "700",
            }}
            placeholder="0737347437"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.subHeader}>Relationship type</Text>
        <View style={{ marginBottom: 28 }}>
          {rel_types.map((rel, index) => (
            <TouchableOpacity
              onPress={() => {
                relType == rel ? setRelType("") : setRelType(rel);
              }}
              key={index}
              style={[
                styles.optionView,
                relType == rel && { backgroundColor: "rgba(117,1,233,1)" },
              ]}
            >
              <Text
                style={[styles.optionText, relType == rel && { color: "#fff" }]}
              >
                {rel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.subHeader}>Tone</Text>
        {tone.map((tone, index) => (
          <Pressable
            onPress={() => {
              chatTone == tone ? setChatTone("") : setChatTone(tone);
            }}
            key={index}
            style={[
              styles.optionView,
              chatTone == tone && { backgroundColor: "rgba(117,1,233,1)" },
            ]}
          >
            <Text
              style={[styles.optionText, chatTone == tone && { color: "#fff" }]}
            >
              {tone}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingVertical: 18,
          backgroundColor: complete
            ? "rgba(117,1,233,1)"
            : "rgba(117,1,233,0.3)",
          marginBottom: bottom,
          borderRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, color: "#fff", fontWeight: "700" }}>
          Create Chat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateChatScreen;
