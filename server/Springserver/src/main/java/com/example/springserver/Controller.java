package com.example.springserver;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class Controller {

    @RequestMapping("/")
    public String index() {
        return "Test Message22222";
    }

    @Autowired
    final UserService userService;
    final UserRepository userRepository;

    @Autowired
    final VideoService videoService;
    final VideoRepository videoRepository;



    @GetMapping("/data")
    public List<Integer> getData() {
        return userRepository.findTimeStampByNameAndObject();
    }

    @GetMapping("/dataall/")
    public List<User> getData2() {
        return userRepository.findByNameAndObject();
    }

    @GetMapping("/video_info")
    public List<VideoInfo> getVideoData() { return videoRepository.findVideoInfoData(); }

    @GetMapping("/alldata")
    public List<User> getData3() {
        return userRepository.findAllData();
    }

    @GetMapping("/video1")
    public List<User> getData4() {
        return userRepository.findVideo1();
    }

    @GetMapping("/video2")
    public List<User> getData5() {
        return userRepository.findVideo2();
    }

    @GetMapping("/video3")
    public List<User> getData6() {
        return userRepository.findVideo3();
    }

    @GetMapping("/video4")
    public List<User> getData7() {
        return userRepository.findVideo4();
    }

    @GetMapping("/video5")
    public List<User> getData8() {
        return userRepository.findVideo5();
    }

    @GetMapping("/video6")
    public List<User> getData9() {
        return userRepository.findVideo6();
    }

    @GetMapping("/video7")
    public List<User> getData10() {
        return userRepository.findVideo7();
    }

}
