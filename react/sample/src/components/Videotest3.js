import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, StyleSheet, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { Table, TableWrapper, Row, Col,Cell } from "react-native-table-component";


const Videotest3 = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/video3');
      setDataList(response.data);
    } catch (error) {
      console.log(error);
    }
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

  const tableHead = ['ID', 'Name', 'Timestamp', 'Object', 'Action'];
  const flexArr = [0.3,3,1,1,1];

  const tableData = dataList.map(item => [item.id, item.name, item.timestamp, item.object, item.ava_label]);

  const playerRef = useRef(null);

  return (    
    <View style={styles.main}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={route.params.id3} //jgYC0r_lGRQ
        onChangeState={onStateChange}
        ref={playerRef}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      <ScrollView>
      <Table borderStyle={{borderWidth: 1, borderColor: '#ffffff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={flexArr}/>
        {
         tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
          <Cell key={0} data={rowData[0]} style={styles.cell_id} textStyle={styles.text} />
          <Cell key={1} data={rowData[1]} style={styles.cell_name} textStyle={styles.text} />
          <Cell 
            key={2} 
            data={<Text style={styles.link} onPress={() => seekTo(rowData[2])}>{rowData[2]}</Text>}
            style={styles.cell} 
            textStyle={styles.text} 
          />
          <Cell key={3} data={rowData[3]} style={styles.cell} textStyle={styles.text} />
          <Cell key={4} data={rowData[4]} style={styles.cell} textStyle={styles.text} />
          </TableWrapper>
          ))    
        }
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
    backgroundColor: '#333333'
    
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 50,
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

export default Videotest3;
