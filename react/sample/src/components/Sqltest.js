import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Button } from 'react-native';
import axios from 'axios';
import Videotest from './Videotest';


const Sqltest = ({navigation}) => {
  
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/alldata');
      setDataList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLinks = dataList.filter((item) => item.id === 19).map((item) => item.link);
  const filteredLinks2 = dataList.filter((item) => item.id === 1).map((item) => item.link);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style = {styles.text}>ID: {item.id}</Text>
      <Text style = {styles.text}>Name: {item.name}</Text>
      <Text style = {styles.text}>Timestamp: {item.timestamp}</Text>
      <Text style = {styles.text}>Object: {item.object}</Text>
      <Text style = {styles.text}>Ava Label: {item.ava_label}</Text>
      <Text style = {styles.text}>Link: {item.link}</Text>
    </View>
  );

  return (
    <View style={styles.main}>
        <Button
        title='Watch Video1'
        onPress={() => navigation.push('Detail',{id1: filteredLinks})}
        />
        <Button
        title='Watch Video2'
        onPress={() => navigation.push('Detail2',{id2: filteredLinks2})}
        />
      <FlatList style={styles.text}
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'black',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Sqltest;