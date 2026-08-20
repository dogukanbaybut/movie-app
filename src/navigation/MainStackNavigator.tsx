import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import MyTabs from "./BottomMenu";
import colors from "../theme/colors";
import { s } from "react-native-size-matters";

// Stack navigator: sayfaları üst üste yığın (stack) gibi tutar,
// bir ekrandan diğerine geçince eskisi yığında kalır (geri tuşu ile dönülür).
const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // varsayılan olarak üst başlık (header) gizli
            }
            }>
            {/* "Tabs" aslında alt menülü (bottom tab) ekranların hepsini içeren bileşen */}
            <Stack.Screen name="Tabs" component={MyTabs} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
                options={
                    {
                        // Sadece bu ekranda header'ı açıp özelleştiriyoruz
                        headerShown: true,
                        headerStyle: { backgroundColor: colors.backgroundColor, },
                        headerTitleStyle: { color: colors.textColor, fontSize: s(20) },
                        headerTintColor: colors.textColor,
                        headerBackButtonDisplayMode: 'minimal', // geri okunun yanında önceki sayfa adı yazmasın
                        title: 'Details',
                    }
                }
                name="DetailsScreen"
                component={DetailsScreen} />
        </Stack.Navigator>
    );
}

export default MainStackNavigator;