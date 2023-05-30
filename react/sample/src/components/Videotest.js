import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, FlatList, TouchableWithoutFeedback, Platform } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { Table, TableWrapper, Row, Col } from "react-native-table-component";
import { SearchBar } from '@rneui/themed';
import { RadioButton } from "react-native-paper";


const Videotest = ({ route, navigation }) => { //@1-const명 수정
  const [playing, setPlaying] = useState(false); // 비디오 재생 
  const [dataList, setDataList] = useState([]); // DB에서 받아온 데이터 리스트
  const [query, setQuery] = useState(''); // 검색창 쿼리문 
  const [search, setSearch] = useState(dataList); // 검색창 입력된 정보
  //const [modalVisible, setModalVisible] = useState(false);
  const [objects, setObjects] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 물체 분류
  const [actions, setActions] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 행동 분류
  const [searchOption, setSearchOption] = useState('both');//검색 분류
  const [sortOrder, setSortOrder] = useState('asc');//정렬 방식



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://3.86.244.172:8080/video1`); //서버get수정 @서버get수정, 서버 쿼리문 수정
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const playerRef = useRef();

  const [searchOptions, setSearchOptions] = useState([
    { label: ' 물체,행동 검색 ', value: 'both' },
    { label: ' 물체 검색 ', value: 'object' },
    { label: ' 행동 검색 ', value: 'action' },
  ]);
  const [selectedOption, setSelectedOption] = useState(searchOptions.length > 0 ? searchOptions[0].value : "both");

  const handleSort = (column) => {
    let sortedData = [...search]; // 검색된 결과에 대해서 정렬 수행
  
    if (column === 'id') {
      if (sortOrder === 'desc') {
        sortedData.sort((a, b) => a.id - b.id); // 검색된 결과를 오름차순으로 정렬
        setSortOrder('asc');
      } else {
        sortedData.sort((a, b) => b.id - a.id); // 검색된 결과를 내림차순으로 정렬
        setSortOrder('desc');
      }
    }
  
    setSearch(sortedData);
  };
  

  const updateSearch = (text) => {
  setQuery(text);

  let filtered = dataList;
  if (searchOption === 'object') {
    filtered = dataList.filter((item) =>
      item.object.toLowerCase().includes(text.toLowerCase())
    );
  } else if (searchOption === 'action') {
    filtered = dataList.filter((item) =>
      item.ava_label.toLowerCase().includes(text.toLowerCase())
    );
  } else {
    filtered = dataList.filter((item) =>
      item.object.toLowerCase().includes(text.toLowerCase()) ||
      item.ava_label.toLowerCase().includes(text.toLowerCase())
    );
  }

  let sortedData = filtered; // 정렬된 데이터를 검색된 결과에 적용
  if (sortOrder === 'asc') {
    sortedData.sort((a, b) => a.id - b.id); // 검색된 결과를 오름차순으로 정렬
  } else {
    sortedData.sort((a, b) => b.id - a.id); // 검색된 결과를 내림차순으로 정렬
  }

  setSearch(text === '' ? dataList : sortedData);
};

  const handleRadioButtonChange = (item, setSelectedOption) => {
    setSelectedOption(item.value);
    setSearchOption(item.value);
    let filtered = dataList;
    if (item.value === 'object') {
      filtered = dataList.filter((item) => item.object.toLowerCase().includes(query.toLowerCase()));
    } else if (item.value === 'action') {
      filtered = dataList.filter((item) => item.ava_label.toLowerCase().includes(query.toLowerCase()));
    } else {
      filtered = dataList.filter((item) =>
        item.object.toLowerCase().includes(query.toLowerCase()) ||
        item.ava_label.toLowerCase().includes(query.toLowerCase())
      );
    }
    setSearch(filtered);
  }


  const onStateChange = useCallback((state) => {
    if (state === 'playing') {
      setPlaying(true);
    } else if (state === 'paused' || state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleItemPress = (item) => {
    setPlaying(false)
  };


  const seekTo = useCallback((time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const timestamp = seconds + (minutes * 60) + (hours * 3600)
    playerRef.current?.seekTo(timestamp, true)
  }, []);

  const flexArr = [0.8, 2, 1.1, 1]; //영역 크기

  const renderHeader = () => (
    <Row
      data={['ID', 'Time stamp', 'Object', 'Action']}
      style={styles.head}
      textStyle={styles.text}
      flexArr={flexArr}
      onPress={() => handleSort('id')} // ID 열 클릭 시 데이터 정렬
    />
  );

  const renderRow = (rowData, index) => (
    <Row
      data={[rowData.id.toString(), rowData.timestamp, rowData.object.toString(), rowData.ava_label]} //@id순번 빼주기
      style={styles.cell}
      textStyle={styles.text}
      flexArr={flexArr}
      borderColor='white'
      onPress={() => {
        seekTo(rowData.timestamp);
        handleItemPress(rowData)
      }}
    />
  )



  const renderObjectItem = ({ item }) => (
    <Text style={styles.item}>{item}</Text>
  );

  const renderActionItem = ({ item }) => (
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
        videoId={"Aqkx40ifYWw"} //@id수정
        onChangeState={onStateChange}
        ref={playerRef}
      />
      <View style={styles.radioButtonContainer}>
        {searchOptions.map((option) => (
          <View key={option.value} style={styles.radioButtonItem}>
            <RadioButton
              value={option.value}
              status={selectedOption === option.value ? 'checked' : 'unchecked'}
              onPress={() => handleRadioButtonChange(option, setSelectedOption)}
              color="#fff"
              backgroundColor="#657"
              width={35}
              height={35}
            />
            <Text style={styles.radioButtonLabel}>{option.label}</Text>
          </View>
        ))}
      </View>
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
        <Text style={{ textAlign: "center", color: 'white', fontSize: 18, fontWeight: "bold" }}>물체, 행동 전체 리스트</Text>
      </TouchableOpacity>
      <FlatList
        data={search} // 렌더링할 데이터
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => renderRow(item)} // 렌더링할 아이템
        keyExtractor={(item, index) => index.toString()} // 각 아이템에 대한 고유한 키값을 설정
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
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
  radioButtonContainer: {
    backgroundColor: '#000',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonLabel: {
    color:'#fff',
    fontWeight:'bold',
    alignItems: 'center'
  },
});


export default Videotest; //@const명 수정