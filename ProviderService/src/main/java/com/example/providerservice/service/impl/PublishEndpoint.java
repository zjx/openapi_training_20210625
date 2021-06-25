package com.example.providerservice.service.impl;

import com.example.providerservice.controller.UserController;
import com.example.providerservice.service.AutoPublish;
import org.apache.cxf.Bus;
import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

@Component
public class PublishEndpoint implements ApplicationRunner {
    Logger log = LoggerFactory.getLogger(PublishEndpoint.class);

    @Autowired
    private WebApplicationContext applicationConnect;

    @Autowired()
    @Qualifier(Bus.DEFAULT_BUS_ID)
    private SpringBus bus;

    @SuppressWarnings("resource")
    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        log.info("开始进行自动发布webService接口");

        String[] beanNames = applicationConnect.getBeanNamesForAnnotation(AutoPublish.class);

        if (beanNames == null ) return;
        for(String beanName : beanNames) {
            var temp = applicationConnect.getType(beanName);
            var temp1 = temp.getAnnotation(AutoPublish.class);
            if (temp1 == null) {
                var interfaces = temp.getInterfaces();
                for (var interface1 : interfaces)
                    temp1 = interface1.getAnnotation(AutoPublish.class);
            }

            String publishAddress = temp1.publishAddress();

            EndpointImpl endpoint = new EndpointImpl(bus, applicationConnect.getBean(beanName));
            endpoint.publish(publishAddress);

            log.info(String.format("发布接口地址：[%s]", publishAddress));
        }

        log.info("weBservice接口自动发布结束");
    }

}

