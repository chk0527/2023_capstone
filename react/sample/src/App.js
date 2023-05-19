import React from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Sqltest from "./components/Sqltest";
import SearchScreen from "./components/SearchScreen";

import Videotest from "./components/Videotest";
import Videotest2 from "./components/Videotest2";
import Videotest3 from "./components/Videotest3";
import Videotest4 from "./components/Videotest4";
import Videotest5 from "./components/Videotest5";

import Tabs from "./components/Navigation/Tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

const Stack=createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
    return(
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
           headerStyle: {
             backgroundColor: '#000000',
           },
           headerTintColor: '#ff0000', //<이전화면 글씨 설정
           headerTitleStyle: {//현재화면 소제목 글씨 설정
             fontWeight: 'bold',
             fontSize: 40,
             color:'#ff0000'
           },
         }}>
           <Stack.Screen name="Main" component={Sqltest} options={{ title:'HanFlix'}}/> 
           <Stack.Screen name="Detail" component={Videotest} options={{headerTitleStyle: {fontSize:20}}}/>
           <Stack.Screen name="Detail2" component={Videotest2}/>
           <Stack.Screen name="Detail3" component={Videotest3}/>
           <Stack.Screen name="Casino" component={Videotest5} options={{headerTintColor: '#fff',headerTitleStyle:{fontSize:30, color:'#fff'}}}/>
       </Stack.Navigator>
    )
}

const App = () =>{
    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: { backgroundColor: '#000' },
                tabBarActiveTintColor: '#fff',
              tabBarLabelStyle:{fontSize: 10},
            }}
                >  
            <Tab.Screen name ="Home" component={HomeStack} 
            options={{headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => ( <MaterialIcons name="home" color={color} size={size}/>),
  }} />
            <Tab.Screen name="Search" component={SearchScreen}
            options={{tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => ( <MaterialIcons name="search" color={color} size={size} />),//탭바 아이콘
  }}/>

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
    main:{
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
    
  });

export default App;