import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import axios from 'axios';

import casino from './../../images/casino.jpeg'
import lawyer from './../../images/lawyer.jpeg'
import cctva from './../../images/cctv.jpeg'
import inception from './../../images/inception.jpeg'
import japan from './../../images/japan.jpeg'
import taiwan from './../../images/taiwan.jpeg'
import austria from './../../images/austria.jpeg'

const Sqltest = ({navigation}) => {
  
  const [dataList, setDataList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // 화면 스크롤 위치 표시
  const [activeIndex2, setActiveIndex2] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => { // DB불러오기
    try {
      const response = await axios.get('http://3.86.244.172:8080/alldata'); // localhost가 아닌 서버를 실행할 pc의 ip주소
      setDataList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLinks = dataList.filter((item) => item.id === 1).map((item) => item.link); // DB에 있는 데이터 중 각 영상의 1번 행을 가져옴 @id수정 //카지노
  const filteredLinks2 = dataList.filter((item) => item.id === 541).map((item) => item.link); //austria
  const filteredLinks3 = dataList.filter((item) => item.id === 785).map((item) => item.link); //cctv
  const filteredLinks4 = dataList.filter((item) => item.id === 1326).map((item) => item.link); //japan
  const filteredLinks5 = dataList.filter((item) => item.id === 1481).map((item) => item.link); //lawyer
  const filteredLinks6 = dataList.filter((item) => item.id === 2880).map((item) => item.link); //tai
  const filteredLinks7 = dataList.filter((item) => item.id === 3256).map((item) => item.link); //inception

  const handlePressVideo1 = () => { // 클릭 하였을 때의 네비게이션 이벤트 
    navigation.push('카지노', { id1: filteredLinks }); //@네비게이션이름 수정
  };

  const handlePressVideo2 = () => {
    navigation.push('austria', { id2: filteredLinks2 });
  };

  const handlePressVideo3 = () => {
    navigation.push('cctv', { id3: filteredLinks3 });
  };

  const handlePressVideo4 = () => {
    navigation.push('japan', { id4: filteredLinks4 });
  };

  const handlePressVideo5 = () => {
    navigation.push('천원짜리변호사', { id5: filteredLinks5 });
  };

  const handlePressVideo6 = () => {
    navigation.push('taiwan', { id6: filteredLinks6 });
  };
  const handlePressVideo7 = () => {
    navigation.push('인셉션', { id7: filteredLinks7 });
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
      {[...Array(3)].map((_, i) => (
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

  const renderPage3 = () => (
    <View style={styles.pageIndicator}>
      {[...Array(1)].map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex2 && styles.activeDot]} />
      ))}
    </View>
  );
  

  return (
    <ScrollView>
    <View style={styles.main}>
      <Text style={styles.fonttest}>Movie</Text>
      <Carousel // 캐러셀 사용, 스크롤 뷰 구현
        data={[
          { id: 1, image: casino, onPress: handlePressVideo1 },
          { id: 5, image: lawyer, onPress: handlePressVideo5 },
          { id: 7, image: inception, onPress:handlePressVideo7}
        ]}
        renderItem={renderItem}
        sliderWidth={600}
        itemWidth={150}
        
        loop={true}

        // autoplay={false}
        //autoplayDelay={500}
        //autoplayInterval={2000}
        gap={16}
        offset={36}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {renderPage()}
      <Text style={styles.fonttest}>Trip</Text>
      <Carousel
        data={[
          { id: 2, image: austria, onPress: handlePressVideo2 },
          { id: 4, image: japan, onPress: handlePressVideo4 },
          { id: 6, image: taiwan, onPress: handlePressVideo6 }
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
      <Text style={styles.fonttest}>Accident&Incident</Text>
      <Carousel
        data={[
          { id: 3, image: cctva, onPress: handlePressVideo3 }
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
      {renderPage3()}
    </View>
    </ScrollView>
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
    height: 200,
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

