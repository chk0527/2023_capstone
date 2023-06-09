import React from "react";
import { View, Text, StatusBar, StyleSheet, Image, Button, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Sqltest from "./components/Sqltest";
import SearchScreen from "./components/SearchScreen";

import Videotest from "./components/Videotest";
import Videotest2 from "./components/Videotest2";
import Videotest3 from "./components/Videotest3";
import Videotest4 from "./components/Videotest4";
import Videotest5 from "./components/Videotest5";
import Videotest6 from "./components/Videotest6";
import Videotest7 from "./components/Videotest7";
import Videotest8 from "./components/Videotest8";
import Videotest9 from "./components/Videotest9";
import Videotest10 from "./components/Videotest10";
import Videotest11 from "./components/Videotest11";
import Videotest12 from "./components/Videotest12";
import Videotest13 from "./components/Videotest13";
import Videotest14 from "./components/Videotest14";
import Videotest15 from "./components/Videotest15";
import Videotest16 from "./components/Videotest16";


import Tabs from "./components/Navigation/Tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#ff0000', //<이전화면 글씨 설정
        headerTitleStyle: {//현재화면 소제목 글씨 설정
          fontWeight: 'bold',
          fontSize: 40,
          color: '#ff0000',
        },
        headerTitleAlign: 'center'
      }}>
      <Stack.Screen name="Main" component={Sqltest} options={{ title: 'HanFlix' }} />
      <Stack.Screen name="카지노" component={Videotest} options={{ title: "카지노", headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="주차장cctv" component={Videotest2} options={{ title: "주차장 cctv", headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="cctv" component={Videotest3} options={{ title: '그것이 알고싶다 cctv', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="japan" component={Videotest4} options={{ title: 'Japan', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="천원짜리변호사" component={Videotest5} options={{ title: '천원짜리변호사', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="taiwan" component={Videotest6} options={{ title: 'Taiwan', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="인셉션" component={Videotest7} options={{ title: '인셉션', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="나우유씨미" component={Videotest8} options={{ title: '나우 유 씨미', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="분노의질주" component={Videotest9} options={{ title: '분노의 질주', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="동물의왕국" component={Videotest10} options={{ title: '동물의 왕국-개&고양이편', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="말리와나" component={Videotest11} options={{ title: '말리와 나', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="나홀로집에1" component={Videotest12} options={{ title: '나 홀로 집에1', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="퍼펙트게임" component={Videotest13} options={{ title: '퍼펙트게임', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="saipan" component={Videotest14} options={{ title: 'saipan', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="spain" component={Videotest15} options={{ title: 'spain', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="킹스맨" component={Videotest16} options={{ title: '킹스맨', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
    </Stack.Navigator>
  )
}

function SearchScreen2({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Search"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#ff0000', //<이전화면 글씨 설정
        headerTitleStyle: {//현재화면 소제목 글씨 설정
          fontWeight: 'bold',
          fontSize: 40,
          color: '#fff'
        },
        headerTitleAlign: 'center'
      }}>
      <Stack.Screen name="Search2" component={SearchScreen} options={{ title: "Search" }} />
      <Stack.Screen name="카지노" component={Videotest} options={{ title: "카지노", headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="주차장cctv" component={Videotest2} options={{ title: "주차장 cctv", headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="cctv" component={Videotest3} options={{ title: '그것이 알고싶다 cctv', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="japan" component={Videotest4} options={{ title: 'Japan', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="천원짜리변호사" component={Videotest5} options={{ title: '천원짜리변호사', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="taiwan" component={Videotest6} options={{ title: 'Taiwan', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="인셉션" component={Videotest7} options={{ title: '인셉션', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="나우유씨미" component={Videotest8} options={{ title: '나우 유 씨미', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="분노의질주" component={Videotest9} options={{ title: '분노의 질주', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="동물의왕국" component={Videotest10} options={{ title: '동물의 왕국-개&고양이편', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="말리와나" component={Videotest11} options={{ title: '말리와 나', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="나홀로집에1" component={Videotest12} options={{ title: '나 홀로 집에1', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="퍼펙트게임" component={Videotest13} options={{ title: '퍼펙트게임', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="saipan" component={Videotest14} options={{ title: 'saipan', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="spain" component={Videotest15} options={{ title: 'spain', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
      <Stack.Screen name="킹스맨" component={Videotest16} options={{ title: '킹스맨', headerTitleStyle: { fontSize: 30, fontWeight: 'bold', backgroundColor: '#000' } }} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#000' },
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: { fontSize: 10 },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack}
          options={{
            headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<MaterialIcons name="home" color={color} size={size} />),
          }} />
        <Tab.Screen name="Search" component={SearchScreen2}
          options={{
            headerShown: false, tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (<MaterialIcons name="search" color={color} size={size} />),//탭바 아이콘
          }} />

      </Tab.Navigator>

    </NavigationContainer>
  );
};

const MyTheme = {
  dark: true,
  colors: {
    background: '#000',
    primary: '#FF2D00',
    text: '#fff',
  },
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  headername: {

  }

});

export default App;