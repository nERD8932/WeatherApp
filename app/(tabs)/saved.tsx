import { View, StyleSheet, FlatList  } from "react-native";
import styles from '../theme'
import * as SQLite from 'expo-sqlite';
import { Text, ActivityIndicator, TextInput, Button, } from "react-native-paper";
import { Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";

const db = SQLite.openDatabaseSync('weather.db')

export default function Tab() {
  const [loading, setLoading] = useState(true);
  const [savedCities, setSavedCities] = useState([]);
  const isFocused = useIsFocused();

  const deleteLocation = (id) => {
    db.execSync(`DELETE FROM locations WHERE id = ${id};`);
    setSavedCities(savedCities.filter(city => city.id !== id));
  };

  useEffect(() => {
      (async () => {
        if(db!==null)
        {
          setLoading(false);
          // db.execSync('CREATE TABLE IF NOT EXISTS "locations" ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [city] NVARCHAR(256) NOT NULL);')
          const rows = db.getAllSync("SELECT * FROM locations;")
          setSavedCities(rows);
        }
      })();
    }, []);
    
  useEffect(() => {
    (async () => {
      if(db!==null)
      {
        setLoading(false);
        // db.execSync('CREATE TABLE IF NOT EXISTS "locations" ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [city] NVARCHAR(256) NOT NULL);')
        const rows = db.getAllSync("SELECT * FROM locations;")
        setSavedCities(rows);
      }
    })();
  }, [isFocused]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.textPrimary}>Saved Locations</Text>
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
  );
}