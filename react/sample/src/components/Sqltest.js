import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import axios from 'axios';

import casino from './../../images/casino.jpeg'
import lawyer from './../../images/lawyer.jpeg'
import cctva from './../../images/cctv.jpeg'
import inception from './../../images/inception.jpeg'
import japan from './../../images/japan.jpeg'
import taiwan from './../../images/taiwan.jpeg'
import parking from './../../images/주차장.png'

import nysm from './../../images/nysm.jpeg'
import race from './../../images/race.jpeg'
import marley from './../../images/marley.jpeg'
import dogcat from './../../images/dogcat.jpeg'
import homealone from './../../images/homealone.jpeg'
import perfectgame from './../../images/perfectgame.jpeg'
import saipan from './../../images/saipan.jpeg'
import spain from './../../images/spain.jpeg'


const Sqltest = ({navigation}) => {
  
  const [dataList, setDataList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // @화면 스크롤 위치 표시
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [activeIndex3, setActiveIndex3] = useState(0);
  const [activeIndex4, setActiveIndex4] = useState(0);

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
  const filteredLinks2 = dataList.filter((item) => item.id === 9450).map((item) => item.link); //주차장cctv
  const filteredLinks3 = dataList.filter((item) => item.id === 785).map((item) => item.link); //cctv
  const filteredLinks4 = dataList.filter((item) => item.id === 1326).map((item) => item.link); //japan
  const filteredLinks5 = dataList.filter((item) => item.id === 1481).map((item) => item.link); //lawyer
  const filteredLinks6 = dataList.filter((item) => item.id === 2880).map((item) => item.link); //tai
  const filteredLinks7 = dataList.filter((item) => item.id === 3256).map((item) => item.link); //inception
  const filteredLinks8 = dataList.filter((item) => item.id === 4604).map((item) => item.link); //nowyouseeme
  const filteredLinks9 = dataList.filter((item) => item.id === 5217).map((item) => item.link); //분노의질주
  const filteredLinks10 = dataList.filter((item) => item.id === 6704).map((item) => item.link); //동물의왕국
  const filteredLinks11 = dataList.filter((item) => item.id === 7388).map((item) => item.link); //말리와나-동물
  const filteredLinks12 = dataList.filter((item) => item.id === 8249).map((item) => item.link); //나홀로집에1
  const filteredLinks13 = dataList.filter((item) => item.id === 8647).map((item) => item.link); //퍼펙트게임
  const filteredLinks14 = dataList.filter((item) => item.id === 9081).map((item) => item.link); //saipan
  const filteredLinks15 = dataList.filter((item) => item.id === 9346).map((item) => item.link); //spain

  const handlePressVideo1 = () => { // 클릭 하였을 때의 네비게이션 이벤트 
    navigation.push('카지노', { id1: filteredLinks }); //@네비게이션이름 수정
  };

  const handlePressVideo2 = () => {
    navigation.push('주차장cctv', { id2: filteredLinks2 });
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

  const handlePressVideo8 = () => {
    navigation.push('나우유씨미', { id7: filteredLinks8 });
  };

  const handlePressVideo9 = () => {
    navigation.push('분노의질주', { id7: filteredLinks9 });
  };

  const handlePressVideo10 = () => {
    navigation.push('동물의왕국', { id7: filteredLinks10 });
  };

  const handlePressVideo11 = () => {
    navigation.push('말리와나', { id7: filteredLinks11 });
  };

  const handlePressVideo12 = () => {
    navigation.push('나홀로집에1', { id7: filteredLinks12 });
  };

  const handlePressVideo13 = () => {
    navigation.push('퍼펙트게임', { id7: filteredLinks13 });
  };

  const handlePressVideo14 = () => {
    navigation.push('saipan', { id7: filteredLinks14 });
  };

  const handlePressVideo15 = () => {
    navigation.push('spain', { id7: filteredLinks15 });
  };
  
  const renderItem = ({ item }) => ( // 클릭 가능한 이미지 생성
    <TouchableWithoutFeedback onPress={item.onPress}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image} />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderPage = () => ( // 스크롤 표시 @스크롤 갯수 변경 ,영화
    <View style={styles.pageIndicator}> 
      {[...Array(7)].map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex && styles.activeDot]} />
      ))}
    </View>
  );
  const renderPage2 = () => (//여행지
    <View style={styles.pageIndicator}>
      {[...Array(4)].map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex2 && styles.activeDot]} />
      ))}
    </View>
  );

  const renderPage3 = () => (//cctv
    <View style={styles.pageIndicator}>
      {[...Array(2)].map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex3 && styles.activeDot]} /> 
      ))}
    </View>
  );

  const renderPage4 = () => (//동물
    <View style={styles.pageIndicator}>
      {[...Array(2)].map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex4 && styles.activeDot]} /> 
      ))}
    </View>
  );
  //SafeAreaView는 상단바 색 체크

  return (    //@스크롤 뷰 체크, 엑티브인덱스 수정
    <ScrollView style={styles.top}>
    <View style={styles.main}>
    <SafeAreaView 
      edges={['top']}
      style={{flex:0,backgroundColor:'white'}}/> 
      <Text style={styles.fonttest}>Movie</Text>
      <Carousel // 캐러셀 사용, 스크롤 뷰 구현
        data={[
          { id: 1, image: casino, onPress: handlePressVideo1 },
          { id: 5, image: lawyer, onPress: handlePressVideo5 },
          { id: 7, image: inception, onPress:handlePressVideo7},
          { id: 8, image: nysm, onPress:handlePressVideo8},
          { id: 9, image: race, onPress:handlePressVideo9}, 
          { id: 12, image: homealone, onPress:handlePressVideo12},
          { id: 13, image: perfectgame, onPress:handlePressVideo13},
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
          { id: 4, image: japan, onPress: handlePressVideo4 },
          { id: 6, image: taiwan, onPress: handlePressVideo6 },
          { id: 14, image: saipan, onPress: handlePressVideo14 },
          { id: 15, image: spain, onPress: handlePressVideo15 },
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
      <Text style={styles.fonttest}>Animal</Text>
      <Carousel
        data={[
          { id: 10, image: dogcat, onPress: handlePressVideo10 },
          { id: 11, image: marley, onPress: handlePressVideo11 }
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
        onSnapToItem={(index) => setActiveIndex4(index)}
      />
      {renderPage4()}
      <Text style={styles.fonttest}>Accident&Incident</Text>
      <Carousel
        data={[
          { id: 2, image: parking, onPress: handlePressVideo2 },
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
        onSnapToItem={(index) => setActiveIndex3(index)}
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
    backgroundColor: '#000'
  },
  top:{
    backgroundColor:'#000'
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
  },
  safe:{
    backgroundColor:'#000'
  }
});

export default Sqltest

