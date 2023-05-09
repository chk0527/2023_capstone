package com.example.springserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<Integer> getUsersByNameAndObject() {
        return userRepository.findTimeStampByNameAndObject();
    }

    public List<User> getTimestampByNameAndObject() {
        return userRepository.findByNameAndObject();
    }

    public List<User> getAllData() {
        return userRepository.findAllData();
    }

    public List<User> getVideo1() {
        return userRepository.findVideo1();
    }

    public List<User> getVideo2() {
        return userRepository.findVideo2();
    }

    public List<User> getVideo3() {
        return userRepository.findVideo2();
    }

    public List<User> getVideo4() {
        return userRepository.findVideo3();
    }
}