import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "rgba(142,142,147,0.8)",
  },
  inputContainer: {
    paddingVertical: 12,
    borderWidth: 2,
    paddingHorizontal: 8,
    borderColor: "rgba(142,142,147,1)",
    borderRadius: 14,
    marginBottom: 28,
  },

  optionView: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(242,242,247,1)",
    borderRadius: 10,
    marginBottom: 8,
    marginRight: 16,
  },
  optionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(142,142,147,1)",
  },
});
