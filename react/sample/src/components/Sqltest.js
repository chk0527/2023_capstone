import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Button, ImageBackground, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import axios from 'axios';
import Videotest from './Videotest';
import image1 from './../../images/testimage.jpeg'
import image2 from './../../images/testimage2.jpeg'
import image3 from './../../images/testimage3.jpeg'


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

  const filteredLinks = dataList.filter((item) => item.id === 1).map((item) => item.link);
  const filteredLinks2 = dataList.filter((item) => item.id === 41).map((item) => item.link);
  const filteredLinks3 = dataList.filter((item) => item.id === 105).map((item) => item.link);

  const handlePressVideo1 = () => {
    navigation.push('Detail', { id1: filteredLinks });
  };

  const handlePressVideo2 = () => {
    navigation.push('Detail2', { id2: filteredLinks2 });
  };

  const handlePressVideo3 = () => {
    navigation.push('Detail3', { id3: filteredLinks3 });
  };

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
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={true}>
        <TouchableWithoutFeedback onPress={handlePressVideo1}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image1} />
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handlePressVideo2}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image2} />
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handlePressVideo3}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image3} />
        </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {/* <FlatList style={styles.text}
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer:{
    padding: 10, // 여백 추가
  },
  image:{
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageback:{
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
