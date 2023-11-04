import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { rel_types } from "../../../../components/data";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";

const CreateChatScreen = () => {
  const [complete, setComplete] = useState<boolean>(true);

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
          />
        </View>
        <Text style={styles.subHeader}>Invitee name</Text>

        <View style={styles.inputContainer}>
          <TextInput
            selectionColor={"rgba(117,1,233,1)"}
            style={{
              fontSize: 17,
              fontWeight: "700",
            }}
            placeholder="Augustus Caesar"
          />
        </View>

        <Text style={styles.subHeader}>Relationship type</Text>
        <View style={{ marginBottom: 28 }}>
          {rel_types.map((rel, index) => (
            <View key={index} style={[styles.optionView]}>
              <Text style={styles.optionText}>{rel}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.subHeader}>Tone</Text>
        <View style={styles.optionView}>
          <Text style={styles.optionText}>Formal</Text>
        </View>
        <View style={styles.optionView}>
          <Text style={styles.optionText}> Casual</Text>
        </View>
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
