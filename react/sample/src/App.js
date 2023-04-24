import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Videotest from "./components/Videotest";
import Texttest from "./components/Texttest";
import Sqltest from "./components/Sqltest";

import CategoriesScreen from "./components/CategoriesScreen";
import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";

import Videotest2 from "./components/Videotest2";
import Videotest3 from "./components/Videotest3";
import Tabs from "./components/Navigation/Tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Stack=createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
    return(
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
           headerStyle: {
             backgroundColor: '#ffffff',
           },
           headerTintColor: '#FF2D00',
           headerTitleStyle: {
             fontWeight: 'bold',
           },
         }}>
           <Stack.Screen name="Main" component={Sqltest}/>
           <Stack.Screen name="Detail" component={Videotest}/>
           <Stack.Screen name="Detail2" component={Videotest2}/>
           <Stack.Screen name="Detail3" component={Videotest3}/>
       </Stack.Navigator>
    )
}

const App = () =>{
    return (
        <NavigationContainer >
            <Tab.Navigator>  
            <Tab.Screen name ="HanFlix" component={HomeStack} />
            <Tab.Screen name="Search" component={HomeScreen}/>
            <Tab.Screen name="Categories" component={SearchScreen}/>
            <Tab.Screen name="Options" component={CategoriesScreen}/>
             </Tab.Navigator>
       
        </NavigationContainer>
    );
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