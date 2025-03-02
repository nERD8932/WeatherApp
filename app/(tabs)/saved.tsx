import { View, StyleSheet  } from "react-native";
import { Text } from "react-native-paper";
import styles from '../theme'

export default function Tab() {
    return (
      <View style={styles.container}>
        <Text style={styles.textPrimary}>Saved Locations</Text>
      </View>
    );
}