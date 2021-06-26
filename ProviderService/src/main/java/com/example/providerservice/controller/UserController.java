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
    @RequestMapping("/user")
public class UserController {
    @Value("${MyPort}")
    private String myPort;

    Logger log = LoggerFactory.getLogger(UserController.class);

    /**
     * 根据用户id 查询用户
     * @return
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable(name = "id") Long id){
        User user = new User("lijunkui",18);
        log.info("查询用户成功："+"id:{}",id);
        return ResponseEntity.ok(user);
    }
    /**
     * 查询所有的用户
     * @return
     */
    @GetMapping("/")
    public ResponseEntity<List<User>> getAll(){

        List<User> userList = new ArrayList<User>(){{
            add(new User("lijunkui1",18));
            add(new User("lijunkui2",18));
            add(new User("lijunkui3",18));
        }};

        log.info("MyPort is :"+myPort);

        return  ResponseEntity.ok(userList);
    }
    /**
     * 添加用户
     */
    @PostMapping("/")
    public ResponseEntity<User> add(@RequestBody User user){
        log.info("添加用户成功："+"name:{},age:{}",user.getName(),user.getAge());
        return  ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    /**
     * 更新用户
     * @param user
     * @return
     */
    @PutMapping("/")
    public  ResponseEntity<Void> updatePut(@RequestBody User user){
        log.info("修改用户成功："+"name:{},age:{}",user.getName(),user.getAge());
        return ResponseEntity.ok().build();
    }
    /**
     * 局部更新
     * @return
     */
    @PatchMapping("/{name}")
    public ResponseEntity<Void> updatePatch(@PathVariable("name") String name){
        log.info("修改用户成功："+"name:{}",name);
        return ResponseEntity.ok().build();
    }
    /**
     * 删除用户
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){
        log.info("删除用户成功："+"id:{}",id);
        return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
