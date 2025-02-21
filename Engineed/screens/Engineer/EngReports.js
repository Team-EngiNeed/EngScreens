import React from "react";
import { View, StyleSheet, Text } from "react-native";

const EngReports = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Submissions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default EngReports;
