import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchScreen from '../SearchScreen'

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SearchScreen" component={SearchScreen}/>
      <Tab.Screen name="CategoriesScreen" component={CategoriesScreen}/>
    </Tab.Navigator>
  );
}

export default Tabs;

const styles = StyleSheet.create({})