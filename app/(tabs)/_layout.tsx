import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable } from "react-native";
import { useTheme } from "react-native-paper";



export default function TabLayout() {
    const theme = useTheme();
    return (
        <Tabs screenOptions={{
            tabBarStyle: { backgroundColor: theme.colors.surface },
            tabBarActiveTintColor: '#99cccc',
            tabBarInactiveTintColor: theme.colors.onSurfaceDisabled, 
            tabBarLabelStyle: { fontSize: 12 }, 
            tabBarIconStyle: { marginBottom: -3 },
            headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="searchloc"
                options={{
                title: 'Search Location',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                title: 'Saved Locations',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
                }}
            />
        </Tabs>
    );
}
