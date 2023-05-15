import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, FlatList } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { Table, TableWrapper, Row, Col } from "react-native-table-component";
import { SearchBar } from '@rneui/themed';

const Videotest = ({route}) => {
  const [playing, setPlaying] = useState(false); // 비디오 재생 
  const [dataList, setDataList] = useState([]); // DB에서 받아온 데이터 리스트
  const [query, setQuery] = useState(''); // 검색창 쿼리문 
  const [search, setSearch] = useState(dataList); // 검색창 입력된 정보
  //const [modalVisible, setModalVisible] = useState(false);
  const [objects, setObjects] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 물체 분류
  const [actions, setActions] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 행동 분류

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/video5`);
      setDataList(response.data);
      setSearch(response.data);
      const uniqueObjects = Array.from(new Set(response.data.map(item => item.object)));
      setObjects(uniqueObjects);
      const uniqueActions = Array.from(new Set(response.data.map(item => item.ava_label)));
      setActions(uniqueActions);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSearch = (text) => {
    const filtered = dataList.filter((item) =>
      item.object.toLowerCase().includes(text.toLowerCase()) ||
      item.ava_label.toLowerCase().includes(text.toLowerCase()) // Action 열에 해당하는 데이터도 검색 대상에 포함
    );
    setQuery(text);
    setSearch(text === '' ? dataList : filtered);
  };
  
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const seekTo = useCallback((time) => {
    playerRef.current?.seekTo(time, true);  
  }, []);

  const flexArr = [0.8,2.9,1,1.1,1]; //영역 크기

  const renderHeader = () =>(
    <Row
      data={['ID', 'Name', 'Time stamp', 'Object', 'Action']}
      style={styles.head}
      textStyle={styles.text}
      flexArr={flexArr}
    />
  );

  const renderRow = (rowData) => (
    <Row
      data={[rowData.id.toString()-203, rowData.name, rowData.timestamp, rowData.object.toString(), rowData.ava_label]}
      style={styles.cell} 
      textStyle={styles.text}
      flexArr={flexArr}
      borderColor='white'
      onPress={() => seekTo(rowData.timestamp)}
    />
  );

  const playerRef = useRef(null);

  const renderObjectItem = ({item}) => (
    <Text style={styles.item}>{item}</Text>
  );

  const renderActionItem = ({item}) => (
    <Text style={styles.item}>{item}</Text>
  );

  //물체, 행동 Alert창
  const objects2 = dataList.map((item) => item.object);
  const objectStr = objects2.filter((v, i, a) => a.indexOf(v) === i && v !== '').join('\n');

  const actions2 = dataList.map((item) => item.ava_label);
  const actionStr = actions2.filter((v, i, a) => a.indexOf(v) === i && v !== '').join('\n');

  const message = `${objectStr}\n=======================\n${actionStr}`;
  //물체, 행동 Alert창

  

  return (    
    <View style={styles.main}>
      <YoutubePlayer
        height={222}
        play={playing}
        videoId={route.params.id5} //
        onChangeState={onStateChange}
        ref={playerRef}
      />
      <SearchBar
        placeholder="검색할 물체나 행동 입력"
        value={query}
        onChange={(event) => updateSearch(event.nativeEvent.text)}
      />
      <TouchableOpacity
            style={{ 
            backgroundColor: '#657',
            padding: 16,
            margin: 10,
            borderRadius: 100,
            }}
            
            onPress={() => {
            Alert.alert('물체, 행동 전체 리스트', message);
            }}
        >
<Text style={{textAlign:"center", color: 'white', fontSize: 18, fontWeight:"bold"}}>물체, 행동 전체 리스트</Text>
        </TouchableOpacity>
      
        <FlatList
  data={search} // 렌더링할 데이터
  ListHeaderComponent={renderHeader}
  renderItem={({item}) => renderRow(item)} // 렌더링할 아이템
  keyExtractor={(item, index) => index.toString()} // 각 아이템에 대한 고유한 키값을 설정
  ItemSeparatorComponent={()=>(
  <View style={styles.separator}/>
    )}
/>

   
  </View>
);

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#000", // 테이블의 배경색을 검정색으로 변경
  },
  head: {
    height: 50,
    backgroundColor: "#444", // 테이블 헤더의 배경색을 어두운 회색으로 변경
  },
  cell: {
    height: 50,
    backgroundColor: "#555", // 테이블 셀의 배경색을 어두운 회색으로 변경
  },
  text: {
    margin: 6,
    textAlign: "center",
    fontWeight: 'bold',
    color: '#fff', // 글씨 색상을 흰색으로 변경
  },
  separator: { //flatlist구분선
    height: 1,
    
    backgroundColor: '#ccc',
  },
});


export default Videotest;





