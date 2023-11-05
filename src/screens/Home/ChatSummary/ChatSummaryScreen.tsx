import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ChatSummaryScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const { bottom } = useSafeAreaInsets();
  const datesMarked =
    params.name == "steve"
      ? {
          "2023-10-30": { selected: true },
          "2023-11-01": { selected: true },
          "2023-11-02": { selected: true },
          "2023-11-03": { selected: true },
          "2023-11-05": { selected: true },
        }
      : {
          "2023-11-02": { selected: true },
          "2023-11-03": { selected: true },
          "2023-11-04": { selected: true },
          "2023-11-05": { selected: true },
        };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        paddingBottom: bottom + 28,
        paddingHorizontal: 16,
      }}
    >
      <Calendar
        theme={{
          arrowColor: "rgba(117,1,233,1)",
          textMonthFontWeight: "700",
          textDayFontWeight: "500",
          todayTextColor: "rgba(117,1,233,1)",
          selectedDayBackgroundColor: "rgba(117,1,233,1)",
        }}
        enableSwipeMonths={true}
        markedDates={datesMarked}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingVertical: 18,
          backgroundColor: "rgba(117,1,233,1)",
          borderRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, color: "#fff", fontWeight: "700" }}>
          Go to chat with @{params.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatSummaryScreen;
