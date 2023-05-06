import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, StyleSheet, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { Table, TableWrapper, Row, Col,Cell } from "react-native-table-component";
import { SearchBar } from '@rneui/themed';

const Videotest = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/video1`);
      setDataList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] = useState(dataList);
  const updateSearch = (text) => {
    const filtered = dataList.filter((item) =>
      item.object.toLowerCase().includes(text.toLowerCase())
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

  const flexArr = [0.5,3,1,1,1];

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
      data={[rowData.id.toString(), rowData.name, rowData.timestamp, rowData.object.toString(), rowData.ava_label]}
      style={styles.cell} 
      textStyle={styles.text}
      flexArr={flexArr}
      borderColor='white'
      onPress={() => seekTo(rowData.timestamp)}
    />
  );

  const playerRef = useRef(null);
  
  return (    
    <View style={styles.main}>
      <YoutubePlayer
        height={222}
        play={playing}
        videoId={route.params.id1} //jgYC0r_lGRQ
        onChangeState={onStateChange}
        ref={playerRef}
      />
      <SearchBar
        placeholder="Search"
        value={query}
        onChange={(event) => updateSearch(event.nativeEvent.text)}
      />
      <ScrollView>
        <Table borderStyle={{borderWidth: 1, borderColor: 'white'}}>
          {renderHeader()}
          {search.map((rowData, index) => (
            <React.Fragment key={index}>{renderRow(rowData)}</React.Fragment>
          ))}
        </Table>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main:{
      flex:1,
      backgroundColor:'black',
  },
  head: {
    height: 50,
    backgroundColor: '#333333',
    borderBottomColor : 'white',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 50
  },
  text: {
    color:'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
   cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  cell_id: {
    flex: 0.3,
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
  }
});

export default Videotest;
