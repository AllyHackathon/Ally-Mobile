import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { styles } from "./styles";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [relType, setRelType] = useState<string>("");
  const [user, setUser] = useState();
  const [chats, setChats] = useState();

  const [currentUserChats, setCurrentUserChats] = useState();

  const userImage = true;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="cog-outline" color={"#000"} size={32} />
        </TouchableOpacity>
      ),
    });
  }, []);

  // var requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  // };

  // fetch(
  //   "https://328df9ffbf16.ngrok.app/users/6546c7fc0fd58a14f9ddabe6",
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => {
  //     setUser(result);
  //   })
  //   .catch((error) => console.log("error", error));

  // fetch("https://328df9ffbf16.ngrok.app/chats/", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => {
  //     setChats(result);
  //   })
  //   .catch((error) => console.log("error", error));

  // console.log(chats);

  // const myChats = chats?.filter(
  //   (chat) => chat.owner.authorizer_id == user?.authorizer_id
  // );

  async function getUserAndChats(page = 1, pageSize = 10) {
    const userResponse = await fetch(
      "https://328df9ffbf16.ngrok.app/users/6546c7fc0fd58a14f9ddabe6"
    );
    const user = await userResponse.json();
    setUser(user);

    const chatsResponse = await fetch(
      `https://328df9ffbf16.ngrok.app/chats/?page=${page}&pageSize=${pageSize}`
    );
    const chats = await chatsResponse.json();

    const myChats = chats.filter(
      (chat) => chat.owner.authorizer_id === user.authorizer_id
    );

    console.log(myChats);
    setChats(myChats);
  }

  // getUserAndChats();

  useEffect(() => {
    getUserAndChats(1, 10);
  }, []);

  console.log("chats", chats);

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
            <Image
              source={require("../../../../assets/image.png")}
              style={styles.profilePic}
            />
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
            {user?.full_name}
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
            {(selectedMood == "" && relType == "") ||
            (selectedMood == "good" &&
              (relType == "" || relType == "VC - FOUNDER")) ||
            (relType == "VC - FOUNDER" &&
              (selectedMood == "good" || selectedMood == "")) ? (
              chats?.map((chatsMap, index) => {
                console.log("item", chatsMap?.history);
                let otheruser =
                  index == 0
                    ? "michael"
                    : chatsMap.score == 5
                    ? "jane"
                    : "steve";
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ChatSummary", {
                        chat: chatsMap,
                        name: otheruser,
                      })
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
                        @{otheruser}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "rgba(174,174,178,1)",
                        }}
                      >
                        {chatsMap?.created_at.slice(0, 10)}
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
                          {chatsMap?.relationship}
                        </Text>
                      </View>

                      <Text>
                        {chatsMap?.score >= 7
                          ? "😁"
                          : chatsMap?.score >= 5
                          ? "😐"
                          : "💀"}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: "#000",
                      }}
                    >
                      This chat has a score of {chatsMap?.score}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : selectedMood == "mid" ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ChatSummary", {
                    chat: chats[2],
                    name: "jane",
                  })
                }
                style={[
                  {
                    paddingVertical: 22,
                    borderTopWidth: 1,
                    borderColor: "rgba(199,199,204,0.41)",
                  },
                  { borderTopWidth: 0 },
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
                    @{"jane"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "rgba(174,174,178,1)",
                    }}
                  >
                    {chats[2]?.created_at.slice(0, 10)}
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
                      {chats[2]?.relationship}
                    </Text>
                  </View>

                  <Text>
                    {chats[2]?.score >= 7
                      ? "😁"
                      : chats[2]?.score >= 5
                      ? "😐"
                      : "💀"}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "800",
                    color: "#000",
                  }}
                >
                  This chat has a score of {chats[2]?.score}
                </Text>
              </TouchableOpacity>
            ) : null}
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
