import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Button,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCENT } from "../../assets/misc/colors";
import * as Font from "expo-font";
import api from "../../api";

const EngProfile = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editableData, setEditableData] = useState({});

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Outfit: require("../../assets/fonts/Outfit-VariableFont_wght.ttf"),
      });
      setFontsLoaded(true);
    }

    async function fetchUserProfile() {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
          setEditableData(parsedData);
        } else {
          const response = await api.get("api/user/profile/");
          setUserData(response.data);
          setEditableData(response.data);
          await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFonts();
    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    setUserData(editableData);
    setIsModalVisible(false);
    await AsyncStorage.setItem("userData", JSON.stringify(editableData));
  };

  if (!fontsLoaded || loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/ENGINEED LOGO.png")}
      />
      <Text style={styles.greeting}>Hello, {userData.name || "[User]"}!</Text>
      <Text style={styles.date}>{today}</Text>

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/images/user-placeholder.png")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>{userData.name || "Name"}</Text>
            <Text style={styles.role}>{userData.role || "[Role]"}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editableData.name}
              onChangeText={(text) =>
                setEditableData({ ...editableData, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              value={editableData.role}
              onChangeText={(text) =>
                setEditableData({ ...editableData, role: text })
              }
            />

            <Button title="Save Changes" onPress={handleSave} color="#5A54F9" />
            <Button
              title="Cancel"
              onPress={() => setIsModalVisible(false)}
              color="#888"
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit a Report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>How to Use?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL("https://valmasciengineed.com");
        }}
      >
        <Text style={styles.buttonText}>EngiNeed Website</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Linking.openURL("mailto:teamengineed@gmail.com");
        }}
      >
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5A54F9",
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Outfit",
    textAlign: "left",
    marginTop: -45,
  },
  date: {
    fontSize: 18,
    color: "#fff",
    textAlign: "left",
    fontFamily: "Outfit",
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Outfit",
  },
  role: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Outfit",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 25,
    marginVertical: 5,
  },
  buttonText: {
    textAlign: "center",
    color: ACCENT,
    fontFamily: "Outfit",
    fontWeight: "bold",
    fontSize: 18,
    color: "#5A54F9",
  },
  logo: {
    width: width * 0.85,
    height: width * 0.5,
    resizeMode: "contain",
    marginTop: -50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default EngProfile;
