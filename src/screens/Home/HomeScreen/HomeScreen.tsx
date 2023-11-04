import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Ionicons } from "react-native-vector-icons";

const HomeScreen = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [relType, setRelType] = useState<string>("");

  const userImage = null;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.container, { paddingHorizontal: 16 }]}>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 44,
          }}
        >
          {userImage ? (
            <Image style={styles.profilePic} />
          ) : (
            <View
              style={[
                styles.profilePic,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <Ionicons name="person" color={"rgba(174,174,178,1)"} size={34} />
            </View>
          )}

          <Text
            style={{ fontSize: 22, textAlign: "center", fontWeight: "800" }}
          >
            @username
          </Text>
        </View>
        {/* chat rating  */}
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.subHeader}>Chat rating</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {chat_rating.map((rating, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  setSelectedMood(
                    selectedMood == rating.title ? "" : rating.title
                  )
                }
                style={[
                  styles.moodView,
                  selectedMood == rating.title && {
                    backgroundColor: "rgba(117,1,233,1)",
                  },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{rating.emoji}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* rel type */}

        <View style={{ marginBottom: 44 }}>
          <Text style={styles.subHeader}>Relationship Type</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ flexDirection: "row" }}
          >
            {rel_types.map((rel, index) => (
              <Pressable
                onPress={() => {
                  relType == rel ? setRelType("") : setRelType(rel);
                }}
                key={index}
                style={[
                  styles.relView,
                  relType == rel && { backgroundColor: "rgba(117,1,233,1)" },
                ]}
              >
                <Text
                  style={[styles.relText, relType == rel && { color: "#fff" }]}
                >
                  {rel}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* chat summaries  */}

        <View>
          <Text style={styles.subHeader}>Current chats</Text>
          <View>
            {chats_summary.map((chats, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ChatSummary", { chat: chats })
                }
                key={index}
                style={[
                  {
                    paddingVertical: 22,
                    borderTopWidth: 1,
                    borderColor: "rgba(199,199,204,0.41)",
                  },
                  index == 0 && { borderTopWidth: 0 },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "800",
                      color: "rgba(117,1,233,1)",
                      marginBottom: 4,
                    }}
                  >
                    @{chats.otherUser}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "rgba(174,174,178,1)",
                    }}
                  >
                    {chats.lastUpdate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      padding: 6,
                      backgroundColor: "rgba(242,242,247,1)",
                      marginBottom: 4,
                      alignSelf: "flex-start",
                      borderRadius: 3,
                      marginRight: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: "rgba(174,174,178,1)",
                      }}
                    >
                      {chats.relType}
                    </Text>
                  </View>
                  <Text>{chats.rating.emoji}</Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "800",
                    color: "#000",
                  }}
                >
                  {chats.summary}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 12,
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "rgba(242,242,247,0.71)",
          opacity: 5,
        }}
      >
        <Pressable
          style={{
            height: 58,
            width: 58,
            borderRadius: 29,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(117,1,233,1)",
          }}
          onPress={() => navigation.navigate("CreateChat")}
        >
          <Ionicons name="add" color={"#fff"} size={34} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const rel_types = [
  "VC - FOUNDER",
  "MENTOR - MENTEE",
  "RECRUITER - STUDENT",
  "FRIENDS",
  "ROMANCE - RIZZ",
];
const chat_rating = [
  {
    title: "good",
    emoji: "😁",
  },
  {
    title: "mid",
    emoji: "😐",
  },
  {
    title: "bad",
    emoji: "💀",
  },
];

const chats_summary = [
  {
    otherUser: "jeffB",
    summary: "You have set a meeting for next Saturday",
    lastUpdate: "4m ago",
    rating: {
      title: "good",
      emoji: "😁",
    },
    relType: "Investor",
  },
  {
    summary: "summary 2",
    otherUser: "moritz",
    lastUpdate: "2hrs ago",
    rating: {
      title: "good",
      emoji: "😁",
    },
    relType: "Friend",
  },
  {
    summary: "This conversation seems like it's not going anywhere my guy",
    otherUser: "paul",
    lastUpdate: "3 days ago",
    rating: {
      title: "bad",
      emoji: "💀",
    },
    relType: "Investor",
  },
  {
    otherUser: "tim",
    summary: "You have set a meeting for next Saturday",
    lastUpdate: "4 days ago",
    rating: {
      title: "mid",
      emoji: "😐",
    },
    relType: "Investor",
  },
  {
    summary: "summary 2",
    otherUser: "mickey",
    lastUpdate: "1 month ago",
    rating: {
      title: "good",
      emoji: "😁",
    },
    relType: "Friend",
  },
  {
    summary: "This conversation seems like it's not going anywhere",
    otherUser: "minnie",
    lastUpdate: "12 weeks ago",
    rating: {
      title: "bad",
      emoji: "💀",
    },
    relType: "Investor",
  },
];
