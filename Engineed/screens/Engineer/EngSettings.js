import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EngSettings = (props) => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn"); // Remove only the login status
    navigation.replace("Account"); // Redirect back to Account (login) screen
  };  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.button}>
          <Feather name="bell" size={20} color="#000" />
          <Text style={styles.buttonText}>Enable Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Feather name="alert-circle" size={20} color="#000" />
          <Text style={styles.buttonText}>Report a Problem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Feather name="thumbs-up" size={20} color="#000" />
          <Text style={styles.buttonText}>Request a Feature</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("https://valmasciengineed.com/")}
        >
          <Feather name="globe" size={20} color="#000" />
          <Text style={styles.buttonText}>Website</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("mailto:teamengineed@gmail.com")}
        >
          <MaterialIcons name="email" size={20} color="#000" />
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
        <Feather name="log-out" size={20} color="#5A54F9" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are You Sure? You will no longer be logged in on this device.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#5A54F9",
    fontSize: 18,
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  modalButtonText: {
    color: "#5A54F9",
    fontSize: 16,
  },
});

export default EngSettings;
