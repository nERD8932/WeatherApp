import { View, StyleSheet, FlatList  } from "react-native";
import styles from '../theme'
import * as SQLite from 'expo-sqlite';
import { Text, ActivityIndicator, TextInput, Button, } from "react-native-paper";
import { Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";


// Open connection to SQLite DB
const db = SQLite.openDatabaseSync('weather.db')

export default function Tab() {
  // Using use state to define variabls used in render calls
  const [loading, setLoading] = useState(true);
  const [savedCities, setSavedCities] = useState([]);
  const isFocused = useIsFocused(); // Check if tab is in focus

  // Delete button to remove saved cities
  const deleteLocation = (id) => {
    db.execSync(`DELETE FROM locations WHERE id = ${id};`);
    setSavedCities(savedCities.filter(city => city.id !== id));
  };

  // Get all existing rows
  useEffect(() => {
      (async () => {
        if(db!==null)
        {
          setLoading(false);
          
          try {
            const rows = db.getAllSync("SELECT * FROM locations;")
            setSavedCities(rows);
          } catch (error) {
            // Recreate table on error
            db.execSync('CREATE TABLE "locations" ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [city] NVARCHAR(256) NOT NULL);')
            setSavedCities([]);
          }
        }
      })();
    }, [isFocused]); // Run if tab is in focus

     // Show loading screen before informaiton has been loaded
    if (loading) {
      return <ActivityIndicator color='#99cccc' style={styles.container} size="large" />;
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.textPrimary}>Saved Locations</Text>
          {/* Create a Flat list of saved cities with delete buttons if the length of the list is not 0*/}
          {savedCities.length > 0 && <FlatList
                                          data={savedCities}
                                          keyExtractor={(item) => item.id.toString()}
                                          renderItem={({ item }) => (
                                            <View style={styles.list}>
                                              <Text style={styles.textSecondary}>{item.city}</Text>
                                              <Button style={styles.delete} onPress={() => {deleteLocation(item.id)}}>🗑️</Button>
                                            </View>
                                          )}/>}
        </View>
  );}
}