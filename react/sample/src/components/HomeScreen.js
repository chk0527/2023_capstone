import { Button, View, Alert, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from 'axios';
import { Table, TableWrapper, Row, Col,Cell } from "react-native-table-component";


import Videotest from "./Videotest";
import Videotest2 from "./Videotest2";
import Videotest3 from "./Videotest3";
import { SearchBar } from "react-native-screens";

const HomeScreen = ({route, navigation}) => {
  const [dataList, setDataList] = useState([]);
  const cancelSource = axios.CancelToken.source();
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

  const tableHead = ['ID', 'VideoName', 'Time stamp', 'Object', 'Action'];
  const flexArr = [0.5,3,1,1,1];

  const tableData = dataList.map(item => [item.id, item.name, item.timestamp, item.object, item.ava_label]);


  return (
    <View style={styles.main}>
      <SearchBar><Text style={styles.search}>검색기능</Text></SearchBar>
      <ScrollView>
      <Table borderStyle={{borderWidth: 1, borderColor: '#ffffff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={flexArr}/>
        {
         tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
          <Cell key={0} data={rowData[0]} style={styles.cell_id} textStyle={styles.text} />
          <Cell key={1} 
            data={<Text style={styles.link} onPress={() => navigation.navigate("Detail")}>{rowData[1]}</Text>}
            style={styles.cell_name} 
            textStyle={styles.text} 
            />
          <Cell key={2} data={rowData[2]}style={styles.cell} textStyle={styles.text} />
          <Cell key={3} data={rowData[3]} style={styles.cell} textStyle={styles.text} />
          <Cell key={4} data={rowData[4]} style={styles.cell} textStyle={styles.text} />
          </TableWrapper>
          ))    
        }
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
