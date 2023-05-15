import { Button, View, Alert, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from 'axios';
import { Table, TableWrapper, Row, Col,Cell } from "react-native-table-component";
import Videotest from "./Videotest";
import Videotest2 from "./Videotest2";
import Videotest3 from "./Videotest3";
import { SearchBar } from '@rneui/themed';
import { color } from "@rneui/base";

const HomeScreen = ({route, navigation}) => {
  const [dataList, setDataList] = useState([]);
  const [query, setQuery] = useState(''); 
  const [search, setSearch] = useState(dataList);
  

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
  

  const updateSearch = (text) => {
    const filtered = text && dataList.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) // 영상제목 검색
    );
    setQuery(text);
    setSearch(text === '' ? dataList : (filtered || dataList));
  };
  

  const flexArr = [1,1];

  const renderHeader = () =>(
    <Row
      data={['Title', 'Description']}
      style={styles.head}
      textStyle={styles.text}
      flexArr={flexArr}
    />
  );

  const renderRow = (rowData) => (
    
    <Row
      data={[rowData.title, rowData.description]}
      style={styles.cell} 
      textStyle={styles.text}
      flexArr={flexArr}
      borderColor='white'
      onPress={() => navigation.navigate("Detail")} // 여기서 화면전환 시켜야할거 같은데 잘 안됨
    />
  );

  return (
    <View style={styles.main}>
      <SearchBar
        placeholder="Search"
        value={query}
        onChange={(event) => updateSearch(event.nativeEvent.text)}
      />
      <ScrollView>
        <Table borderStyle={{borderWidth: 1, borderColor: "white" }}>
        {renderHeader()}
        {search.map((rowData, index) => (
          <React.Fragment key={index}>{renderRow(rowData)}</React.Fragment>
        ))}
      </Table>
      
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
      flex:1,
      backgroundColor:'black',
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
    color:'#ffffff',
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
  link:{
    color:'#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  search:{
    color:'#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 30,
    marginTop:10,
  }
});

export default HomeScreen