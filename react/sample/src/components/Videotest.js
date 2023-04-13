import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
//위 모듈 설치해서 사용 하기! - 추후 다른 모듈 실행해볼것

import { NavigationContainer } from "@react-navigation/native";
import { NavigationAction } from "@react-navigation/native";
import Sqltest from "./Sqltest";
const Videotest = ({route}) => {
  const [playing, setPlaying] = useState(false);

  
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  

  return (    
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={route.params.id1} //jgYC0r_lGRQ
        
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>
  );
};

export default Videotest;