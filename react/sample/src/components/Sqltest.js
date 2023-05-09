import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'deprecated-react-native-prop-types';

import axios from 'axios';
import image1 from './../../images/testimage.jpeg'
import image2 from './../../images/testimage2.jpeg'
import image3 from './../../images/testimage3.jpeg'
import image4 from './../../assets/icon.png'

const Sqltest = ({navigation}) => {
  
  const [dataList, setDataList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // 화면 스크롤 위치 표시
  const [activeIndex2, setActiveIndex2] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => { // DB불러오기
    try {
      const response = await axios.get('http://localhost:8080/alldata'); // localhost가 아닌 서버를 실행할 pc의 ip주소
      setDataList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLinks = dataList.filter((item) => item.id === 1).map((item) => item.link); // DB에 있는 데이터 중 각 영상의 1번 행을 가져옴
  const filteredLinks2 = dataList.filter((item) => item.id === 41).map((item) => item.link);
  const filteredLinks3 = dataList.filter((item) => item.id === 105).map((item) => item.link);
  const filteredLinks4 = dataList.filter((item) => item.id === 170).map((item) => item.link);

  const handlePressVideo1 = () => { // 클릭 하였을 때의 네비게이션 이벤트 
    navigation.push('Detail', { id1: filteredLinks });
  };

  const handlePressVideo2 = () => {
    navigation.push('Detail2', { id2: filteredLinks2 });
  };

  const handlePressVideo3 = () => {
    navigation.push('Detail3', { id3: filteredLinks3 });
  };

  const handlePressVideo4 = () => {
    navigation.push('Detail4', { id4: filteredLinks4 });
  };

  const renderItem = ({ item }) => ( // 클릭 가능한 이미지 생성
    <TouchableWithoutFeedback onPress={item.onPress}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image} />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderPage = () => ( // 스크롤 표시
    <View style={styles.pageIndicator}>
      {[...Array(4)].map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex && styles.activeDot]} />
      ))}
    </View>
  );
  const renderPage2 = () => (
    <View style={styles.pageIndicator}>
      {[...Array(3)].map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex2 && styles.activeDot]} />
      ))}
    </View>
  );
  

  return (
    <View style={styles.main}>
      <Text style={styles.fonttest}>Sports</Text>
      <Carousel // 캐러셀 사용, 스크롤 뷰 구현
        data={[
          { id: 1, image: image1, onPress: handlePressVideo1 },
          { id: 2, image: image2, onPress: handlePressVideo2 },
          { id: 3, image: image3, onPress: handlePressVideo3 },
          { id: 4, image: image4, onPress: handlePressVideo4 }
        ]}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={200}
        loop={true}

        // autoplay={false}
        //autoplayDelay={500}
        //autoplayInterval={2000}
        gap={16}
        offset={36}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {renderPage()}
      <Text style={styles.fonttest}>Movie</Text>
      <Carousel
        data={[
          { id: 1, image: image1, onPress: handlePressVideo1 },
          { id: 2, image: image2, onPress: handlePressVideo2 },
          { id: 3, image: image3, onPress: handlePressVideo3 }
        ]}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={200}
        loop={true}

        // autoplay={false}
        //autoplayDelay={500}
        //autoplayInterval={2000}
        gap={16}
        offset={36}
        onSnapToItem={(index) => setActiveIndex2(index)}
      />
      {renderPage2()}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#BDBDBD',
  },
  activeDot: {
    backgroundColor: '#0D47A1',
  },
  fonttest:{
    fontSize: 35,
    color: 'white',
    textAlign: 'left',
    alignSelf: 'flex-start',
  }
});

export default Sqltest

