import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "react-native-size-matters";
import colors from "../theme/colors";
import CategoriesScreen from "../screens/CategoriesScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.backgroundColor, },
                headerTitleStyle: { color: colors.textColor, fontSize: s(24) },
                headerTintColor: colors.textColor,
                tabBarStyle: { backgroundColor: colors.backgroundColor, height: s(65), borderTopColor: colors.borderColor },
                tabBarActiveTintColor: colors.activeColor,
                tabBarInactiveTintColor: colors.inactiveColor,
                tabBarLabelStyle: { fontSize: s(10), fontWeight: 'bold' },
                tabBarIcon: ({ color, size, focused }) => null
            }
            }>
            <Tab.Screen
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={s(22)} color={color} />
                    ),
                }}
                name="HomeScreen" component={HomeScreen} />
            <Tab.Screen
                options={{
                    title: 'Categories',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="albums" size={s(22)} color={color} />
                    ),
                }}
                name="CategoriesScreen" component={CategoriesScreen} />
            <Tab.Screen
                options={{
                    title: 'Saved',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="bookmark" size={s(22)} color={color} />
                    ),
                }}
                name="SavedScreen" component={HomeScreen} />
        </Tab.Navigator>
    );
}

export default MyTabs;

