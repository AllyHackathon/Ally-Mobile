import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profilePic: {
    height: 88,
    width: 88,
    borderRadius: 88,
    backgroundColor: "rgba(242,242,247,1)",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "rgba(142,142,147,0.8)",
  },
  moodView: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 3,
    borderRadius: 14,
    borderColor: "rgba(117,1,233,1)",
    backgroundColor: "rgba(117,1,233,0.1)",
  },
  relView: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    //borderWidth: 2,
    borderRadius: 8,
    // borderColor: "rgba(117,1,233,1)",
    backgroundColor: "rgba(117,1,233,0.1)",
    marginRight: 4,
  },
  relText: {
    fontSize: 12,
    fontWeight: "800",
    color: "rgba(117,1,233,1)",
  },
});
