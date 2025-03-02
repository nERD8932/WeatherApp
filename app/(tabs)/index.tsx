import { View, StyleSheet, Image } from 'react-native';
import { Text, ActivityIndicator } from "react-native-paper";
import styles from '../theme'

import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default function Tab() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bg, setBG] = useState(require('./../../assets/images/day.png'))

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.coords.latitude}&longitude=${loc.coords.longitude}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
          setWeather(data.current_weather);
          setLoading(false);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if(!weather.is_day) setBG(require('./../../assets/images/night.png'));
      else{
        setBG(require('./../../assets/images/day.png'));
      }
    })();
  }, [weather]);

  useEffect(() => {
    
  }, [weather])

  if (loading) {
    return <ActivityIndicator color='#99cccc' style={styles.container} size="large" />;
  }
  else {
    return (
    <View style={styles.container}>
        <Image source={bg} style={styles.img}/>
        <View style={styles.txtcontainer}>
          <Text style={styles.textPrimary}>Current Weather</Text>
          <Text style={styles.textSecondary}>❄️ Temperature: {weather.temperature}°C</Text>
          <Text style={styles.textSecondary}>☴ Wind Speed: {weather.windspeed} km/h</Text>
        </View>
    </View>
    );
  }
  
}