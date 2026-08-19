import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import MyTabs from "./BottomMenu";
import colors from "../theme/colors";
import { s } from "react-native-size-matters";

const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }
            }>
            <Stack.Screen name="Tabs" component={MyTabs} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
                options={
                    {
                        headerShown: true,
                        headerStyle: { backgroundColor: colors.backgroundColor, },
                        headerTitleStyle: { color: colors.textColor, fontSize: s(20) },
                        headerTintColor: colors.textColor,
                        headerBackButtonDisplayMode: 'minimal',
                        title: 'Details',
                    }
                }
                name="DetailsScreen"
                component={DetailsScreen} />
        </Stack.Navigator>
    );
}

export default MainStackNavigator;