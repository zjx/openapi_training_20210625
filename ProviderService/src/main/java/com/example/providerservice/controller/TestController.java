package com.example.providerservice.controller;

import com.example.providerservice.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController()
@RequestMapping("/api/v2")
public class TestController {

    Logger log = LoggerFactory.getLogger(TestController.class);

    @GetMapping("/CountryInfo")
    public ResponseEntity<List<User>> getAll(){

        List<User> userList = new ArrayList<User>(){{
            add(new User("lijunkui1",18));
            add(new User("lijunkui2",18));
            add(new User("lijunkui3",18));
        }};

        return  ResponseEntity.ok(userList);
    }

}
