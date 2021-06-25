package com.example.providerservice.service.impl;

import com.example.providerservice.model.User;
import com.example.providerservice.service.UserService;
import org.springframework.stereotype.Component;


@Component
public class UserServiceImpl implements UserService {

    @Override
    public User getUser(Long id) {
        User user = new User("lijunkui", 18);
        return user;
    }
}
