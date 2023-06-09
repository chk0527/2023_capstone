import { Button, View, Alert, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from 'axios';
import { Table, TableWrapper, Row, Col, Cell } from "react-native-table-component";
import { SearchBar } from '@rneui/themed';
import { RadioButton } from "react-native-paper";
import { color } from "@rneui/base";
//dddd
const SearchScreen = ({ route, navigation }) => {
  const [dataList, setDataList] = useState([]);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(dataList);
  const [objects, setObjects] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 물체 분류
  const [actions, setActions] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 행동 분류
  const [titles, setTitless] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 행동 분류
  const [searchOption, setSearchOption] = useState('title');//검색 분류


  const cancelSource = axios.CancelToken.source();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://3.86.244.172:8080/video_info`);
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

  const [searchOptions, setSearchOptions] = useState([
    { label: ' 이름 검색 ', value: 'title' },
    { label: ' 물체 검색 ', value: 'object' },
    { label: ' 행동 검색 ', value: 'action' },
  ]);
  const [selectedOption, setSelectedOption] = useState(searchOptions.length > 0 ? searchOptions[0].value : "title");

  const handleRadioButtonChange = (item, setSelectedOption) => {
    setSelectedOption(item.value);
    setSearchOption(item.value);
    let filtered = dataList;
    if (item.value === 'object') {
      filtered = dataList.filter((item) => item.object && item.object.toLowerCase().includes(query.toLowerCase()));
    } else if (item.value === 'action') {
      filtered = dataList.filter((item) => item.ava_label && item.ava_label.toLowerCase().includes(query.toLowerCase()));
    } else {
      filtered = dataList.filter((item) => item.title && item.title.toLowerCase().includes(query.toLowerCase()));
    }
  }

  const updateSearch = (text) => {
    setQuery(text);
    let filtered = dataList;
    if (searchOption === 'title') {
      filtered = dataList.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    } else if (searchOption === 'object') {
      filtered = dataList.filter((item) => item.object.toLowerCase().includes(text.toLowerCase()));
    } else {
      filtered = dataList.filter((item) => item.ava_label.toLowerCase().includes(text.toLowerCase()));
    }
    setSearch(text === '' ? dataList : filtered);
  };

  const flexArr = [0.7, 0.8, 1.4];

  const renderHeader = () => (
    <Row
      data={['Image', 'Title', 'Description']}
      style={styles.head}
      textStyle={styles.text}
      flexArr={flexArr}
    />
  );

  function navigateVideo(id) { //@id추가
    switch (id) {
      case 1:
        return '카지노'
      case 3:
        return 'cctv'
      case 4:
        return 'japan'
      case 5:
        return '천원짜리변호사'
      case 6:
        return 'taiwan'
      case 7:
        return '인셉션'
      case 8:
        return '나우유씨미'
      case 9:
        return '분노의질주'
      case 10:
        return '동물의왕국'
      case 11:
        return '말리와나'
      case 12:
        return '나홀로집에1'
      case 13:
        return '퍼펙트게임'
      case 14:
        return 'saipan'
      case 15:
        return 'spain'
      case 16:
        return '주차장cctv'
      case 19:
        return '킹스맨'
    }
  }

  const imagePress = (rowData) => {
    //console.log('Image Pressed:', rowData.id);
    navigation.navigate(navigateVideo(rowData.id))
  }

  const renderRow = (rowData) => (
    <Row
      data={[
        <TouchableWithoutFeedback onPress={() => imagePress(rowData)}>
          <Image source={{ uri: rowData.image }} style={{ width: 100, height: 150 }} />
        </TouchableWithoutFeedback>,
        rowData.title,
        <Text style={styles.textdes}>{rowData.description}</Text>,
      ]}
      style={styles.cell}
      textStyle={styles.text}
      flexArr={flexArr}
      borderColor='white'
      onPress={() => navigation.navigate(navigateVideo(rowData.id))}
    />
  );

  return (
    <View style={styles.main}>
      <SearchBar
        placeholder="Search"
        value={query}
        onChange={(event) => updateSearch(event.nativeEvent.text)}
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
      <FlatList
        style={styles.flat}
        data={search} // 렌더링할 데이터
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => renderRow(item)} // 렌더링할 아이템
        keyExtractor={(item, index) => index.toString()} // 각 아이템에 대한 고유한 키값을 설정
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  head: {
    height: 50,
    backgroundColor: '#444'

  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 50
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textdes: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center'
  },
  cell: {
    flex: 1,
    borderColor: '#555',
  },
  flat: {
    backgroundColor: '#555',
  },
  cell_id: {
    flex: 0.5,
    borderWidth: 0.5,
    borderColor: '#c8e1ff',
  },
  cell_name: {
    flex: 3,
    borderWidth: 0.5,
    borderColor: '#c8e1ff',
  },
  link: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  search: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 30,
    marginTop: 10,
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
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center'
  },
  separator: { //flatlist구분선
    height: 2,
    backgroundColor: '#ccc',
  },
});

export default SearchScreen