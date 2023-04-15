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
}