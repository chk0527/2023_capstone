import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, FlatList } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { Table, TableWrapper, Row, Col } from "react-native-table-component";
import { SearchBar } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from "react-native-paper";


const Videotest5 = ({ route }) => {
  const [playing, setPlaying] = useState(false); // 비디오 재생 
  const [dataList, setDataList] = useState([]); // DB에서 받아온 데이터 리스트
  const [query, setQuery] = useState(''); // 검색창 쿼리문 
  const [search, setSearch] = useState(dataList); // 검색창 입력된 정보
  //const [modalVisible, setModalVisible] = useState(false);
  const [objects, setObjects] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 물체 분류
  const [actions, setActions] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 행동 분류
  const [searchOption, setSearchOption] = useState('both');//검색 분류
  const [selectedOption, setSelectedOption] = useState(searchOption);

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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [searchOptions, setSearchOptions] = useState([
    { label: 'Both', value: 'both' },
    { label: 'Object', value: 'object' },
    { label: 'Action', value: 'action' },
  ]);

  const updateSearch = (text) => {
    console.log(searchOption)
    setQuery(text);
    let filtered = dataList;
    if (searchOption === 'object') {
      filtered = dataList.filter((item) => item.object.toLowerCase().includes(text.toLowerCase()));
    } else if (searchOption === 'action') {
      filtered = dataList.filter((item) => item.ava_label.toLowerCase().includes(text.toLowerCase()));
    } else {
      filtered = dataList.filter((item) =>
        item.object.toLowerCase().includes(text.toLowerCase()) ||
        item.ava_label.toLowerCase().includes(text.toLowerCase())
      );
    }
    setSearch(text === '' ? dataList : filtered);
  };
  const handleDropdownChange = (item) => {
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
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("영상 재생이 끝났습니다.");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const seekTo = useCallback((time) => {
    playerRef.current?.seekTo(time, true);
  }, []);

  const flexArr = [0.8, 2.9, 1, 1.1, 1]; //영역 크기

  const renderHeader = () => (
    <Row
      data={['ID', 'Name', 'Time stamp', 'Object', 'Action']}
      style={styles.head}
      textStyle={styles.text}
      flexArr={flexArr}
    />
  );

  const renderRow = (rowData) => (
    <Row
      data={[rowData.id.toString() - 203, rowData.name, rowData.timestamp, rowData.object.toString(), rowData.ava_label]}
      style={styles.cell}
      textStyle={styles.text}
      flexArr={flexArr}
      borderColor='white'
      onPress={() => seekTo(rowData.timestamp)}
    />
  );

  const playerRef = useRef(null);

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
        videoId={"Aqkx40ifYWw"} //
        onChangeState={onStateChange}
        ref={playerRef}
      />
      <SearchBar
        placeholder="검색할 물체나 행동 입력"
        value={query}
        onChange={(event) => updateSearch(event.nativeEvent.text)}
      />

      <DropDownPicker
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="검색할 영역 선택"
        items={searchOptions}
        defaultValue={searchOption}
        onSelectItem={handleDropdownChange}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        labelStyle={styles.dropdownLabel}
        dropDownStyle={styles.dropdownMenu}
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
  dropdownContainer: {
    height: 40,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#657',
    borderWidth: 1,
    borderRadius: 4,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#657',
  },
  dropdownMenu: {
    backgroundColor: '#fafafa',
    borderColor: '#657',
    borderWidth: 1,
  },
});


export default Videotest5;





