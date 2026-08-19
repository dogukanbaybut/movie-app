import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import MyTabs from "./src/navigation/BottomMenu";
import colors from "./src/theme/colors";
import { StatusBar } from "react-native";


export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
      <StatusBar barStyle="light-content" backgroundColor={colors.backgroundColor} />
    </NavigationContainer>
  );
}

