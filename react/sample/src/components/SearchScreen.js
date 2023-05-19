import { Button, View, Alert, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from 'axios';
import { Table, TableWrapper, Row, Col, Cell } from "react-native-table-component";
import { SearchBar } from '@rneui/themed';
import { RadioButton } from "react-native-paper";
import { color } from "@rneui/base";

const HomeScreen = ({ route, navigation }) => {
  const [dataList, setDataList] = useState([]);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(dataList);
  const [objects, setObjects] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 물체 분류
  const [actions, setActions] = useState([]); // 전체 리스트 표시를 위한 DB에서 받아온 행동 분류
  const [searchOption, setSearchOption] = useState('both');//검색 분류


  const cancelSource = axios.CancelToken.source();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/video_info`);
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

  const [searchOptions,setSearchOptions] = useState([
    { label: '← 물체,행동 검색', value: 'both' },
    { label: '← 물체 검색', value: 'object' },
    { label: '← 행동 검색', value: 'action' },
  ]);

  const [selectedOption, setSelectedOption] = useState(searchOptions.length > 0 ? searchOptions[0].value : "both");

  const updateSearch = (text) => {
    const filtered = text && dataList.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()) // 영상제목 검색
    );
    setQuery(text);
    setSearch(text === '' ? dataList : (filtered || dataList));
  };


  const flexArr = [0.7, 1, 1];

  const renderHeader = () => (
    <Row
      data={['Image', 'Title', 'Description']}
      style={styles.head}
      textStyle={styles.text}
      flexArr={flexArr}
    />
  );

  function navigateVideo(id) {
    switch (id) {
      case 1:
        return 'Detail'
      case 4:
        return 'Detail2'
      case 41:
        return 'Detail3'
      case 105:
        return 'Casino'
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
        rowData.description]}
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
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  head: {
    height: 50,
    backgroundColor: '#333333'

  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 50
  },
  text: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#c8e1ff',
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
  }
});

export default HomeScreen