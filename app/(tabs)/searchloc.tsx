import { View, StyleSheet  } from "react-native";
import styles from '../theme'
import * as SQLite from 'expo-sqlite';
import { Text, ActivityIndicator, TextInput, Button} from "react-native-paper";
import { Image } from 'react-native';
import { useState, useEffect } from 'react';

const db = SQLite.openDatabaseSync('weather.db')
//db.execSync("DROP TABLE IF EXISTS locations;")

export default function Tab() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bg, setBG] = useState(require('./../../assets/images/day.png'))
  
  const fetchWeather = async () => {
    setLoading(true)
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoRes.json();
    if (!geoData.results) return;
    
    const { latitude, longitude } = geoData.results[0];
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherRes.json();
    setLoading(false)
    setWeather(weatherData.current_weather);
  };

  const saveLocation = () => {
    if(city.length > 0)
    {
      try {
        db.execSync(`INSERT INTO locations (city) VALUES ("${city}");`)
        setSavedCities([...savedCities, city]);
      } catch (error) {
        return
      }
    }
  };

  useEffect(() => {
    (async () => {
      if(weather!==null)
      {
        setWeather(null)
      }
    })();
  }, [city]);

  useEffect(() => {
    (async () => {
      if(weather!==null)
      {
        if(!weather.is_day) setBG(require('./../../assets/images/night.png'));
        else{
          setBG(require('./../../assets/images/day.png'));
        }
      }
      
    })();
  }, [weather]);

  useEffect(() => {
      (async () => {
        if(db!==null)
          {
            setLoading(false);
            db.execSync('CREATE TABLE IF NOT EXISTS "locations" ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [city] TEXT NOT NULL UNIQUE);')
          }
      })();
    }, []);

    if (loading) {
      return <ActivityIndicator color='#99cccc' style={styles.container} size="large" />;
    }
    else {
      return (
        <View style={styles.bg}>
          <View style={styles.txtcontainersmall}>
            <Text style={styles.textPrimary}>Location Weather</Text>
          </View>
          
          <TextInput style={styles.textInput} placeholder="Enter city" onChangeText={setCity} />
          <View style={styles.txtcontainer}>
            
            <Button style={styles.button} onPress={fetchWeather}> Search </Button>
              {weather && <View style={styles.container}>
                            <Image source={bg} style={styles.img}/>
                            <View style={styles.txtcontainer}>
                              <Text style={styles.textPrimary}>Current Weather in {city}</Text>
                              <Text style={styles.textSecondary}>❄️ Temperature: {weather.temperature}°C</Text>
                              <Text style={styles.textSecondary}>☴ Wind Speed: {weather.windspeed} km/h</Text>
                            </View>
                        </View>
              }
            <Button style={styles.button} onPress={saveLocation} disabled={savedCities.length >= 4}>Save Location</Button>
          </View>
        </View>
      );
    }
}