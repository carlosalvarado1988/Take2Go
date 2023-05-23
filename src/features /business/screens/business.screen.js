import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { SafeAreaView, View, StyleSheet, StatusBar } from "react-native";
import { BusinessInfoCard } from "../components/businessInfoCard.component";

export const BusinessScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.list}>
        <BusinessInfoCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: {
    padding: 10,
  },
  list: {
    flex: 1,
    padding: 5,
    backgroundColor: "green",
  },
});
