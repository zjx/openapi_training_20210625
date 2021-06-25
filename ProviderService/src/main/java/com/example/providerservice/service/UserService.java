package com.example.providerservice.service;

import com.example.providerservice.model.User;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

@WebService(serviceName = "UserServiceImpl")
@AutoPublish(publishAddress = "userService")
public interface UserService {
    @WebMethod
    @WebResult(name = "User")
    User getUser(@WebParam(name = "ID") Long id);
}

