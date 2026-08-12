import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "react-native-size-matters";
import colors from "../theme/colors";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.backgroundColor, },
                headerTitleStyle: { color: colors.textColor, fontSize: s(20) },
                headerTintColor: colors.textColor,
                tabBarStyle: { backgroundColor: colors.backgroundColor, height: s(60), borderTopColor: colors.borderColor },
                tabBarActiveTintColor: colors.activeColor,
                tabBarInactiveTintColor: colors.inactiveColor,
                tabBarIcon: ({ color, size, focused }) => null
            }
            }>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={s(20)} color={color} />
                    ),
                }}
                name="HomeScreen" component={HomeScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="albums" size={s(20)} color={color} />
                    ),
                }}
                name="CategoriesScreen" component={HomeScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="bookmark" size={s(20)} color={color} />
                    ),
                }}
                name="SavedScreen" component={HomeScreen} />
        </Tab.Navigator>
    );
}

export default MyTabs;

