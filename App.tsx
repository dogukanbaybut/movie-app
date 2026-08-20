import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import MyTabs from "./src/navigation/BottomMenu";
import colors from "./src/theme/colors";
import { StatusBar } from "react-native";

// Uygulamanın en tepesindeki bileşen (root). RN burayı ilk render eder.
export default function App() {
  return (
    // NavigationContainer, tüm navigasyon (sayfa geçişi) sistemini sarmalar.
    // Tüm ekranlar bunun içinde tanımlı olmalı.
    <NavigationContainer>
      {/* Sayfalar arası geçişleri (Stack) yöneten navigator burada başlıyor */}
      <MainStackNavigator />
      <StatusBar barStyle="light-content" backgroundColor={colors.backgroundColor} />
    </NavigationContainer>
  );
}

