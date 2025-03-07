import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4", // Light gray for a modern look
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0077cc",
    textAlign: "center",
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: "40%",
    alignSelf: "center"
  },
  picker: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: "40%",
    alignSelf: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#0077cc",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0077cc",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#ff5252",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  descriptionBox: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    flexWrap: "wrap",
  },
  
});
