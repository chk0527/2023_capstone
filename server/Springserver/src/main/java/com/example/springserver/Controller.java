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

    @GetMapping("/data")
    public List<Integer> getData() {
        return userRepository.findTimeStampByNameAndObject();
    }

    @GetMapping("/dataall/")
    public List<User> getData2() {
        return userRepository.findByNameAndObject();
    }

    @GetMapping("/alldata")
    public List<User> getData3() {
        return userRepository.findAllData();
    }


}
